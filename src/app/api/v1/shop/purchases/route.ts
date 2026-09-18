import { NextRequest } from 'next/server';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';
import { GamificationService } from '@/services/gamification.service';

export async function POST(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/shop/purchases');
    }

    const body = await req.json();
    const { itemId } = body;

    if (!itemId) {
      return apiProblem(400, 'Bad Request', 'Item ID is required.', '/api/v1/shop/purchases');
    }

    const result = await GamificationService.atomicPurchaseItem(auth.userId, itemId);
    return apiSuccess(result);
  } catch (error: any) {
    if (error.message === 'ITEM_NOT_FOUND') {
      return apiProblem(404, 'Not Found', 'Shop item not found.', '/api/v1/shop/purchases');
    }
    if (error.message === 'INSUFFICIENT_GEMS') {
      return apiProblem(400, 'Insufficient Gems', 'Số dư Gems của bạn không đủ để đổi vật phẩm này.', '/api/v1/shop/purchases');
    }
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/shop/purchases');
  }
}
