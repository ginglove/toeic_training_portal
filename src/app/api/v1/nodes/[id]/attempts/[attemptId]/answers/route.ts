import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

/**
 * POST /api/v1/nodes/{id}/attempts/{attemptId}/answers
 * Records answer telemetry for each question in a Saga Node challenge (SRS § 5.28)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; attemptId: string } }
) {
  try {
    const { id: nodeId, attemptId } = params;
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', `/api/v1/nodes/${nodeId}/attempts/${attemptId}/answers`);
    }

    const body = await req.json();
    const { questionId, selectedOption, timeSpentMs = 0 } = body;

    if (!questionId || !selectedOption) {
      return apiProblem(400, 'Bad Request', 'questionId and selectedOption are required.', `/api/v1/nodes/${nodeId}/attempts/${attemptId}/answers`);
    }

    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt || attempt.userId !== auth.userId) {
      return apiProblem(404, 'Not Found', 'Node attempt not found or unauthorized.', `/api/v1/nodes/${nodeId}/attempts/${attemptId}/answers`);
    }

    // Verify option correctness
    const correctOption = await prisma.option.findFirst({
      where: { questionId, isCorrect: true },
    });

    const isCorrect = correctOption ? correctOption.label === selectedOption : true;

    await prisma.attemptDetail.upsert({
      where: {
        attemptId_questionId: {
          attemptId,
          questionId,
        },
      },
      update: {
        selectedOption,
        isCorrect,
        timeSpentMs,
        answeredAt: new Date(),
      },
      create: {
        attemptId,
        questionId,
        selectedOption,
        isCorrect,
        timeSpentMs,
      },
    });

    return apiSuccess({
      nodeId,
      attemptId,
      questionId,
      selectedOption,
      isCorrect,
      timeSpentMs,
      savedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/nodes/${params.id}/attempts/${params.attemptId}/answers`);
  }
}
