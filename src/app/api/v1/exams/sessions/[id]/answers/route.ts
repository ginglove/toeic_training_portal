import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: sessionId } = params;
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', `/api/v1/exams/sessions/${sessionId}/answers`);
    }

    const body = await req.json();
    const { questionId, selectedOption, isFlagged, clientSequence, timeSpentMs } = body;

    const attempt = await prisma.attempt.findUnique({ where: { id: sessionId } });
    if (!attempt || attempt.status !== 'IN_PROGRESS') {
      return apiProblem(400, 'Bad Request', 'Exam session is closed or invalid.', `/api/v1/exams/sessions/${sessionId}/answers`);
    }

    if (attempt.userId !== auth.userId) {
      return apiProblem(403, 'Forbidden', 'You do not own this exam session.', `/api/v1/exams/sessions/${sessionId}/answers`);
    }

    const correctOption = await prisma.option.findFirst({
      where: { questionId, isCorrect: true },
    });

    const isCorrect = correctOption?.label === selectedOption;

    await prisma.attemptDetail.upsert({
      where: {
        attemptId_questionId: {
          attemptId: sessionId,
          questionId,
        },
      },
      update: {
        selectedOption,
        isFlagged: isFlagged || false,
        isCorrect,
        clientSequence: clientSequence || 0,
        timeSpentMs: timeSpentMs || 0,
      },
      create: {
        attemptId: sessionId,
        questionId,
        selectedOption,
        isFlagged: isFlagged || false,
        isCorrect,
        clientSequence: clientSequence || 0,
        timeSpentMs: timeSpentMs || 0,
      },
    });

    return apiSuccess({
      sessionId,
      questionId,
      saved: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/exams/sessions/${params.id}/answers`);
  }
}
