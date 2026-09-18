import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

/**
 * POST /api/v1/exams/sessions/{id}/heartbeats
 * CBT Exam Simulation session keep-alive and timer synchronization (SRS § 4.3 & § 4.4)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: sessionId } = params;
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', `/api/v1/exams/sessions/${sessionId}/heartbeats`);
    }

    const body = await req.json().catch(() => ({}));
    const { clientTimeRemainingSec, clientSequence = 0 } = body;

    const attempt = await prisma.attempt.findUnique({
      where: { id: sessionId },
      include: { exam: true },
    });

    if (!attempt || attempt.status !== 'IN_PROGRESS') {
      return apiProblem(400, 'Bad Request', 'Exam session is closed or invalid.', `/api/v1/exams/sessions/${sessionId}/heartbeats`);
    }

    if (attempt.userId !== auth.userId) {
      return apiProblem(403, 'Forbidden', 'You do not own this exam session.', `/api/v1/exams/sessions/${sessionId}/heartbeats`);
    }

    // Calculate official elapsed time on server
    const now = new Date();
    const elapsedSeconds = Math.floor((now.getTime() - new Date(attempt.startedAt).getTime()) / 1000);
    const totalExamDuration = (attempt.exam?.timeLimitMinutes || 120) * 60;
    const serverTimeRemainingSec = Math.max(0, totalExamDuration - elapsedSeconds);

    // Update heartbeat telemetry on the attempt
    await prisma.attempt.update({
      where: { id: sessionId },
      data: {
        lastSequence: clientSequence,
        totalDurationSeconds: elapsedSeconds,
      },
    });

    return apiSuccess({
      sessionId,
      isAlive: true,
      clientSequence,
      serverTimeRemainingSec,
      serverTimestamp: now.toISOString(),
      timeSkewSec: typeof clientTimeRemainingSec === 'number' ? Math.abs(clientTimeRemainingSec - serverTimeRemainingSec) : 0,
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/exams/sessions/${params.id}/heartbeats`);
  }
}
