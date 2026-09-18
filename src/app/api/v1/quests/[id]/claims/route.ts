import { NextRequest } from 'next/server';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';
import { GamificationService } from '@/services/gamification.service';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const questClaimId = params.id;
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', `/api/v1/quests/${questClaimId}/claims`);
    }

    const result = await GamificationService.atomicClaimQuest(auth.userId, questClaimId);
    return apiSuccess(result);
  } catch (error: any) {
    if (error.message === 'QUEST_NOT_FOUND') {
      return apiProblem(404, 'Not Found', 'Daily quest not found.', `/api/v1/quests/${questClaimId}/claims`);
    }
    if (error.message === 'FORBIDDEN') {
      return apiProblem(403, 'Forbidden', 'You do not own this quest.', `/api/v1/quests/${questClaimId}/claims`);
    }
    if (error.message === 'NOT_COMPLETED') {
      return apiProblem(400, 'Bad Request', 'Nhiệm vụ này chưa hoàn thành chỉ tiêu.', `/api/v1/quests/${questClaimId}/claims`);
    }
    if (error.message === 'ALREADY_CLAIMED') {
      return apiProblem(400, 'Already Claimed', 'Phần thưởng nhiệm vụ này đã được nhận trước đó.', `/api/v1/quests/${questClaimId}/claims`);
    }
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/quests/${questClaimId}/claims`);
  }
}
