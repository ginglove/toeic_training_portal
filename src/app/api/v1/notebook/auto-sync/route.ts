import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    let userId = auth?.userId;

    if (!userId) {
      if (process.env.NODE_ENV !== 'production') {
        const demoUser = await prisma.user.findFirst();
        if (demoUser) {
          userId = demoUser.id;
        }
      }
    }

    if (!userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/notebook/auto-sync');
    }

    const body = await req.json();
    const { questionIds } = body;

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return apiSuccess({ syncedCount: 0, message: 'No questions to sync.' });
    }

    // Set nextReviewDate to tomorrow (+24h) for Spaced Repetition Level 1
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const upsertPromises = questionIds.map(async (qId: string) => {
      return prisma.mistakeNotebook.upsert({
        where: {
          userId_questionId: {
            userId,
            questionId: qId,
          },
        },
        create: {
          userId,
          questionId: qId,
          easinessFactor: 2.5,
          repetitionNumber: 0,
          intervalDays: 1,
          nextReviewDate: tomorrow,
        },
        update: {
          intervalDays: 1,
          nextReviewDate: tomorrow,
        },
      });
    });

    const results = await Promise.all(upsertPromises);

    return apiSuccess({
      syncedCount: results.length,
      nextReviewDate: tomorrow,
      message: `Đã tự động đồng bộ ${results.length} câu sai vào Sổ tay lặp lại ngắt quãng SM-2.`,
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/notebook/auto-sync');
  }
}
