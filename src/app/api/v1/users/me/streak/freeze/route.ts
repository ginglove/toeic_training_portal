import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    let userId = auth?.userId;

    if (!userId) {
      if (process.env.NODE_ENV !== 'production') {
        const demoUser = await prisma.user.findFirst();
        if (demoUser) {
          userId = demoUser.id;
        }
      }
    }

    if (!userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/users/me/streak/freeze');
    }

    // Get or initialize GamificationState
    let state = await prisma.gamificationState.findUnique({
      where: { userId },
    });

    if (!state) {
      state = await prisma.gamificationState.create({
        data: {
          userId,
          gems: 50,
          energy: 5,
          currentStreak: 1,
          maxStreak: 1,
          activeShieldCount: 1,
        },
      });
    }

    // Check if user already has a shield
    if (state.activeShieldCount > 0) {
      return apiSuccess({
        message: 'Lá chắn bảo vệ chuỗi (Streak Freeze) đang hoạt động.',
        activeShieldCount: state.activeShieldCount,
        currentStreak: state.currentStreak,
        gems: state.gems,
      });
    }

    // Shield cost: 30 gems (in-game earned gems, 100% Free)
    const FREEZE_COST = 30;
    if (state.gems < FREEZE_COST) {
      return apiProblem(
        400,
        'Insufficient Gems',
        `Bạn cần ${FREEZE_COST} Đá Năng Lượng (Gems) tích lũy để kích hoạt Băng Đóng Băng Streak. Hiện có: ${state.gems}.`,
        '/api/v1/users/me/streak/freeze'
      );
    }

    const updated = await prisma.gamificationState.update({
      where: { userId },
      data: {
        gems: state.gems - FREEZE_COST,
        activeShieldCount: 1,
      },
    });

    return apiSuccess({
      message: 'Kích hoạt Băng Đóng Băng Streak thành công! Chuỗi ngày của bạn được bảo toàn.',
      activeShieldCount: updated.activeShieldCount,
      currentStreak: updated.currentStreak,
      gems: updated.gems,
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/users/me/streak/freeze');
  }
}
