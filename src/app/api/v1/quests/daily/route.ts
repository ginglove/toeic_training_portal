import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/quests/daily');
    }
    const userId = auth.userId;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const quests = await prisma.userDailyQuest.findMany({
      where: { userId, assignedDate: today },
      include: { quest: true },
    });

    return apiSuccess(
      quests.map((q) => ({
        id: q.id,
        questId: q.questId,
        title: q.quest.title,
        description: q.quest.description,
        currentCount: q.currentCount,
        targetCount: q.quest.targetCount,
        rewardGems: q.quest.rewardGems,
        rewardExp: q.quest.rewardExp,
        isCompleted: q.isCompleted,
        isClaimed: q.isClaimed,
      }))
    );
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/quests/daily');
  }
}
