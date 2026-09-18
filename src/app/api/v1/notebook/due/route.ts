import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/notebook/due');
    }
    const userId = auth.userId;

    const items = await prisma.mistakeNotebook.findMany({
      where: {
        userId,
        nextReviewDate: { lte: new Date() },
      },
      include: {
        question: {
          include: {
            options: {
              select: { id: true, label: true, text: true, isCorrect: true },
            },
          },
        },
      },
      orderBy: { nextReviewDate: 'asc' },
      take: 20, // max 20 cards per session for cognitive ease
    });

    return apiSuccess(
      items.map((item) => ({
        id: item.id,
        questionId: item.questionId,
        easinessFactor: item.easinessFactor,
        repetitionNumber: item.repetitionNumber,
        intervalDays: item.intervalDays,
        nextReviewDate: item.nextReviewDate,
        question: {
          partNumber: item.question.partNumber,
          questionNumber: item.question.questionNumber,
          questionText: item.question.questionText,
          explanation: item.question.explanation,
          trapNote: item.question.trapNote,
          options: item.question.options,
        },
      }))
    );
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/notebook/due');
  }
}
