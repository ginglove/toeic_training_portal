import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; attemptId: string } }
) {
  try {
    const { id: nodeId, attemptId } = params;
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', `/api/v1/nodes/${nodeId}`);
    }

    const body = await req.json();
    const { answers, durationSeconds } = body; // answers: [{ questionId, selectedOption }]

    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt || attempt.userId !== auth.userId) {
      return apiProblem(403, 'Forbidden', 'Attempt not found or unauthorized.', `/api/v1/nodes/${nodeId}`);
    }

    if (attempt.status !== 'IN_PROGRESS') {
      return apiProblem(400, 'Bad Request', 'Attempt has already been completed.', `/api/v1/nodes/${nodeId}`);
    }

    const node = await prisma.mapNode.findUnique({
      where: { id: nodeId },
      include: {
        journey: true,
        progress: true,
      },
    });

    if (!node || node.journey.userId !== auth.userId) {
      return apiProblem(404, 'Not Found', 'Map node not found or unauthorized.', `/api/v1/nodes/${nodeId}`);
    }

    // Batch fetch correct options to eliminate N+1 queries
    const questionIds = (answers || []).map((a: any) => a.questionId);
    const correctOptions = await prisma.option.findMany({
      where: {
        questionId: { in: questionIds },
        isCorrect: true,
      },
    });
    const correctMap = new Map(correctOptions.map((o) => [o.questionId, o.label]));

    // Score answers
    let correctCount = 0;
    const details: Array<{
      attemptId: string;
      questionId: string;
      selectedOption: string;
      isCorrect: boolean;
    }> = [];
    const incorrectQuestions: string[] = [];

    for (const ans of (answers || [])) {
      const correctLabel = correctMap.get(ans.questionId);
      const isCorrect = correctLabel === ans.selectedOption;
      if (isCorrect) {
        correctCount++;
      } else {
        incorrectQuestions.push(ans.questionId);
      }

      details.push({
        attemptId,
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect,
      });
    }

    const total = answers?.length || 1;
    const accuracy = (correctCount / total) * 100;
    let stars = 1;
    if (accuracy >= 80) stars = 2;
    if (accuracy >= 95) stars = 3;

    // Preserve highest stars achieved
    const previousStars = node.progress?.starsEarned || 0;
    const finalStars = Math.max(previousStars, stars);

    // Rewards
    const expEarned = 50 * stars;
    const gemsEarned = 5 * stars;

    // Check if we should advance the journey
    const isAdvancing = node.id === node.journey.activeNodeId || node.status !== 'COMPLETED';

    const completionResult = await prisma.$transaction(async (tx) => {
      // 1. Spaced Repetition (SM-2) for mistakes
      for (const qId of incorrectQuestions) {
        await tx.mistakeNotebook.upsert({
          where: {
            userId_questionId: {
              userId: auth.userId,
              questionId: qId,
            },
          },
          update: {
            nextReviewDate: new Date(),
          },
          create: {
            userId: auth.userId,
            questionId: qId,
            easinessFactor: 2.5,
            repetitionNumber: 0,
            intervalDays: 1,
            nextReviewDate: new Date(),
          },
        });
      }

      // 2. Record Attempt Details
      if (details.length > 0) {
        await tx.attemptDetail.createMany({
          data: details,
          skipDuplicates: true,
        });
      }

      // 3. Update Node Progress
      await tx.userNodeProgress.upsert({
        where: { nodeId },
        update: {
          starsEarned: finalStars,
          bestAccuracy: Math.max(node.progress?.bestAccuracy || 0, accuracy),
          totalAttempts: { increment: 1 },
          isCompleted: true,
          lastCompletedAt: new Date(),
        },
        create: {
          nodeId,
          starsEarned: stars,
          bestAccuracy: accuracy,
          totalAttempts: 1,
          isCompleted: true,
          lastCompletedAt: new Date(),
        },
      });

      // 4. Update current node status
      await tx.mapNode.update({
        where: { id: nodeId },
        data: { status: 'COMPLETED' },
      });

      // 5. Unlock next node only if this is the active forward node
      let nextNodeId: string | null = null;
      if (isAdvancing) {
        const nextNode = await tx.mapNode.findFirst({
          where: {
            journeyId: node.journeyId,
            nodeIndex: node.nodeIndex + 1,
          },
        });

        if (nextNode) {
          nextNodeId = nextNode.id;
          await tx.mapNode.update({
            where: { id: nextNode.id },
            data: { status: 'CURRENT' },
          });

          await tx.userJourney.update({
            where: { id: node.journeyId },
            data: { activeNodeId: nextNode.id },
          });
        }
      }

      // 6. Update Gamification
      await tx.gamificationState.update({
        where: { userId: auth.userId },
        data: {
          gems: { increment: gemsEarned },
          weeklyExp: { increment: expEarned },
        },
      });

      // 7. Update User Total EXP
      await tx.user.update({
        where: { id: auth.userId },
        data: { totalExp: { increment: expEarned } },
      });

      // 8. Progress Daily Quests
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const activeQuests = await tx.userDailyQuest.findMany({
        where: {
          userId: auth.userId,
          assignedDate: today,
          isCompleted: false,
        },
        include: { quest: true },
      });

      for (const uq of activeQuests) {
        const newCount = uq.currentCount + 1;
        const isDone = newCount >= uq.quest.targetCount;
        await tx.userDailyQuest.update({
          where: { id: uq.id },
          data: {
            currentCount: newCount,
            isCompleted: isDone,
          },
        });
      }

      // 9. Complete Attempt
      await tx.attempt.update({
        where: { id: attemptId },
        data: {
          status: 'SUBMITTED',
          totalDurationSeconds: durationSeconds || 0,
          completedAt: new Date(),
        },
      });

      return { nextNodeId };
    });

    return apiSuccess({
      nodeId,
      attemptId,
      starsEarned: stars,
      bestStars: finalStars,
      accuracy,
      correctCount,
      totalQuestions: total,
      expEarned,
      gemsEarned,
      nextUnlockedNodeId: completionResult.nextNodeId,
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/nodes/${params.id}`);
  }
}
