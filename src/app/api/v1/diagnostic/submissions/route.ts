import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { estimateTheta, thetaToTOEICScore } from '@/lib/irt';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/diagnostic/submissions');
    }

    const body = await req.json();
    const { answers, durationSeconds } = body; // answers: Array<{ questionId: string; selectedOption: string; isCorrect?: boolean; partNumber?: number }>

    if (!Array.isArray(answers) || answers.length === 0) {
      return apiProblem(400, 'Bad Request', 'Answers array is required.', '/api/v1/diagnostic/submissions');
    }

    // Batch fetch questions to eliminate N+1 queries
    const questionIds = answers.map((a: any) => String(a.questionId));
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: { options: true },
    });
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    const listeningResponses: Array<{ isCorrect: boolean; a: number; b: number }> = [];
    const readingResponses: Array<{ isCorrect: boolean; a: number; b: number }> = [];

    for (const ans of answers) {
      const q = questionMap.get(String(ans.questionId));

      let isCorrect = false;
      let partNumber = ans.partNumber || 5;
      let a = 1.0;
      let b = 0.0;

      if (q) {
        partNumber = q.partNumber;
        a = q.irtDiscrimination || 1.0;
        b = q.irtDifficulty || 0.0;
        const correctOpt = q.options.find((o) => o.isCorrect);
        isCorrect = correctOpt?.label === ans.selectedOption;
      } else {
        // If questionId was client-generated sample index (e.g. 1..4), evaluate from client's answer
        isCorrect = ans.isCorrect !== undefined ? Boolean(ans.isCorrect) : true;
        if (ans.partNumber) partNumber = ans.partNumber;
      }

      if (partNumber <= 4) {
        listeningResponses.push({ isCorrect, a, b });
      } else {
        readingResponses.push({ isCorrect, a, b });
      }
    }

    // IRT 2PL Estimations
    const thetaListening = estimateTheta(listeningResponses, 0.0);
    const thetaReading = estimateTheta(readingResponses, 0.0);

    const listeningScore = thetaToTOEICScore(thetaListening);
    const readingScore = thetaToTOEICScore(thetaReading);
    const overallScore = listeningScore + readingScore;

    // Persist Diagnostic Profile & Gamification
    const diagnosticProfile = await prisma.$transaction(async (tx) => {
      // Save diagnostic profile
      const profile = await tx.diagnosticProfile.upsert({
        where: { userId: auth.userId },
        update: {
          overallScore,
          listeningScore,
          readingScore,
          thetaListening,
          thetaReading,
          skillMasteryJson: {
            listeningAccuracy: listeningResponses.length > 0 ? (listeningResponses.filter((r) => r.isCorrect).length / listeningResponses.length) : 0.5,
            readingAccuracy: readingResponses.length > 0 ? (readingResponses.filter((r) => r.isCorrect).length / readingResponses.length) : 0.5,
          },
          testedAt: new Date(),
        },
        create: {
          userId: auth.userId,
          overallScore,
          listeningScore,
          readingScore,
          thetaListening,
          thetaReading,
          skillMasteryJson: {
            listeningAccuracy: listeningResponses.length > 0 ? (listeningResponses.filter((r) => r.isCorrect).length / listeningResponses.length) : 0.5,
            readingAccuracy: readingResponses.length > 0 ? (readingResponses.filter((r) => r.isCorrect).length / readingResponses.length) : 0.5,
          },
        },
      });

      // Update active journey initial & predicted scores
      await tx.userJourney.updateMany({
        where: { userId: auth.userId, status: 'ACTIVE' },
        data: {
          initialScore: overallScore,
          predictedScore: Math.min(990, overallScore + 50),
        },
      });

      // Record Attempt
      await tx.attempt.create({
        data: {
          userId: auth.userId,
          mode: 'DIAGNOSTIC',
          status: 'SUBMITTED',
          totalScore: overallScore,
          listeningScore,
          readingScore,
          totalDurationSeconds: durationSeconds || 1200,
          completedAt: new Date(),
        },
      });

      return profile;
    });

    return apiSuccess({
      diagnosticProfileId: diagnosticProfile.id,
      overallScore,
      listeningScore,
      readingScore,
      thetaListening,
      thetaReading,
      sem: 15,
      scoreRange: `${Math.max(10, overallScore - 30)} – ${Math.min(990, overallScore + 30)}`,
      testedAt: diagnosticProfile.testedAt,
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/diagnostic/submissions');
  }
}
