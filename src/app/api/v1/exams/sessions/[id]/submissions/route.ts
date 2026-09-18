import { NextRequest } from 'next/server';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';
import { AssessmentService } from '@/services/assessment.service';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: sessionId } = params;
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', `/api/v1/exams/sessions/${sessionId}/submissions`);
    }

    const body = await req.json().catch(() => ({}));
    const { durationSeconds } = body;

    const result = await AssessmentService.finalizeExamSession(
      sessionId,
      auth.userId,
      durationSeconds
    );

    return apiSuccess(result);
  } catch (error: any) {
    if (error.message === 'SESSION_NOT_FOUND') {
      return apiProblem(404, 'Not Found', 'Session not found.', `/api/v1/exams/sessions/${sessionId}/submissions`);
    }
    if (error.message === 'FORBIDDEN') {
      return apiProblem(403, 'Forbidden', 'You do not own this exam session.', `/api/v1/exams/sessions/${sessionId}/submissions`);
    }
    if (error.message === 'ALREADY_SUBMITTED') {
      return apiProblem(400, 'Bad Request', 'Exam session has already been submitted.', `/api/v1/exams/sessions/${sessionId}/submissions`);
    }
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/exams/sessions/${sessionId}/submissions`);
  }
}
