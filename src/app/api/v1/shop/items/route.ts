import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const items = await prisma.shopItem.findMany({
      where: { isAvailable: true },
      orderBy: { gemsPrice: 'asc' },
    });

    return apiSuccess(items);
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/shop/items');
  }
}
