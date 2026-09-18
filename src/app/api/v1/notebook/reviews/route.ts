import { NextRequest } from 'next/server';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';
import { SpacedRepetitionService } from '@/services/spaced-repetition.service';

export async function POST(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/notebook/reviews');
    }

    const body = await req.json();
    const { notebookId, quality, timeSpentMs } = body; // quality 1..5

    if (typeof quality !== 'number' || quality < 1 || quality > 5) {
      return apiProblem(400, 'Invalid Input', 'Quality score must be an integer between 1 and 5.', '/api/v1/notebook/reviews');
    }

    const result = await SpacedRepetitionService.recordReview(
      auth.userId,
      notebookId,
      quality,
      timeSpentMs
    );

    return apiSuccess(result);
  } catch (error: any) {
    if (error.message === 'INVALID_QUALITY') {
      return apiProblem(400, 'Invalid Input', 'Quality score must be an integer between 1 and 5.', '/api/v1/notebook/reviews');
    }
    if (error.message === 'NOTEBOOK_ITEM_NOT_FOUND') {
      return apiProblem(404, 'Not Found', 'Mistake item not found.', '/api/v1/notebook/reviews');
    }
    if (error.message === 'FORBIDDEN') {
      return apiProblem(403, 'Forbidden', 'You do not own this mistake notebook item.', '/api/v1/notebook/reviews');
    }
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/notebook/reviews');
  }
}
