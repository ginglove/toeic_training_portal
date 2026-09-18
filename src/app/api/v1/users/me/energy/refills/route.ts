import { NextRequest } from 'next/server';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';
import { GamificationService } from '@/services/gamification.service';

export async function POST(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/users/me/energy/refills');
    }

    const body = await req.json();
    const { method } = body; // 'PRACTICE_RECHARGE' or 'GEMS_PURCHASE'

    if (!['PRACTICE_RECHARGE', 'GEMS_PURCHASE'].includes(method)) {
      return apiProblem(400, 'Invalid Method', 'Method must be PRACTICE_RECHARGE or GEMS_PURCHASE.', '/api/v1/users/me/energy/refills');
    }

    const result = await GamificationService.atomicRefillEnergy(auth.userId, method);
    return apiSuccess(result);
  } catch (error: any) {
    if (error.message === 'GAMIFICATION_NOT_FOUND') {
      return apiProblem(404, 'Not Found', 'Gamification state not found.', '/api/v1/users/me/energy/refills');
    }
    if (error.message === 'ENERGY_FULL') {
      return apiProblem(400, 'Energy Full', 'Năng lượng hiện tại đã đạt mức tối đa (5/5).', '/api/v1/users/me/energy/refills');
    }
    if (error.message === 'INSUFFICIENT_GEMS') {
      return apiProblem(400, 'Insufficient Gems', 'Bạn cần tối thiểu 50 Gems để nạp đầy năng lượng.', '/api/v1/users/me/energy/refills');
    }
    if (error.message === 'PRACTICE_REQUIRED') {
      return apiProblem(400, 'Practice Required', 'Bạn cần hoàn thành ít nhất 1 bài luyện tập gần đây để nhận tim miễn phí.', '/api/v1/users/me/energy/refills');
    }
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/users/me/energy/refills');
  }
}
