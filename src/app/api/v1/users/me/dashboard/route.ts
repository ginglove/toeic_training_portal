import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/users/me/dashboard');
    }
    const userId = auth.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        gamification: true,
        journeys: {
          where: { status: 'ACTIVE' },
          include: {
            guardian: true,
            nodes: {
              where: { status: 'CURRENT' },
              take: 1,
            },
          },
          take: 1,
        },
        diagnosticProfile: true,
      },
    });

    if (!user) {
      return apiProblem(404, 'Not Found', 'User not found.', '/api/v1/users/me/dashboard');
    }

    // Due cards count
    const dueMistakesCount = await prisma.mistakeNotebook.count({
      where: {
        userId: user.id,
        nextReviewDate: { lte: new Date() },
      },
    });

    // Daily quests today
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const dailyQuests = await prisma.userDailyQuest.findMany({
      where: {
        userId: user.id,
        assignedDate: today,
      },
      include: { quest: true },
    });

    const activeJourney = user.journeys[0] || null;
    const currentNode = activeJourney?.nodes[0] || null;

    return apiSuccess({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        level: user.level,
        totalExp: user.totalExp,
      },
      gamification: user.gamification,
      journey: activeJourney ? {
        id: activeJourney.id,
        targetScore: activeJourney.targetScore,
        currentScore: activeJourney.initialScore,
        predictedScore: activeJourney.predictedScore,
        currentDay: activeJourney.currentDay,
        durationDays: activeJourney.durationDays,
        guardian: activeJourney.guardian,
        currentNode,
      } : null,
      dueMistakesCount,
      dailyQuests: dailyQuests.map((q) => ({
        id: q.id,
        questId: q.questId,
        title: q.quest.title,
        description: q.quest.description,
        currentCount: q.currentCount,
        targetCount: q.quest.targetCount,
        rewardGems: q.quest.rewardGems,
        rewardExp: q.quest.rewardExp,
        isCompleted: q.isCompleted,
        isClaimed: q.isClaimed,
      })),
      diagnostic: user.diagnosticProfile,
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/users/me/dashboard');
  }
}
