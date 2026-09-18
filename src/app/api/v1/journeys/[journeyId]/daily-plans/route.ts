import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

/**
 * GET /api/v1/journeys/{journeyId}/daily-plans?day=5
 * Computes adaptive 4-part daily study plan based on SM-2 due cards and current Saga node (SRS § 5.11)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { journeyId: string } }
) {
  try {
    const { journeyId } = params;
    const auth = extractAuthUser(req);
    const userId = auth?.userId;

    const url = new URL(req.url);
    const day = parseInt(url.searchParams.get('day') || '1', 10);

    // Count SM-2 items due for this user
    let dueCount = 5;
    if (userId) {
      dueCount = await prisma.mistakeNotebook.count({
        where: {
          userId,
          nextReviewDate: { lte: new Date() },
        },
      });
      if (dueCount === 0) dueCount = 3;
    }

    // Determine current active node on Saga Map
    let activeNodeLabel = 'Trạm 2 trên Bản đồ Saga';
    if (userId) {
      const journey = await prisma.userJourney.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      if (journey?.activeNodeId) {
        const node = await prisma.mapNode.findUnique({
          where: { id: journey.activeNodeId },
        });
        if (node) activeNodeLabel = `Trạm ${node.nodeIndex}: ${node.title}`;
      }
    }

    const tasks = [
      {
        id: 1,
        title: `Ôn ${dueCount} từ vựng SM-2 đến hạn`,
        tag: '35% Giãn Cách',
        part: 'Part 5/6',
        targetCount: dueCount,
        completed: false,
        xp: 40,
        href: '/notebook',
      },
      {
        id: 2,
        title: 'Luyện 10 câu tốc độ bẫy Part 5 (<8s)',
        tag: '40% Kỹ Năng Yếu',
        part: 'Part 5',
        targetCount: 10,
        completed: false,
        xp: 60,
        href: '/drills',
      },
      {
        id: 3,
        title: 'Luyện nghe phản xạ gián tiếp Part 2',
        tag: '10% Củng Cố',
        part: 'Part 2',
        targetCount: 5,
        completed: false,
        xp: 30,
        href: '/practice',
      },
      {
        id: 4,
        title: `Vượt ${activeNodeLabel}`,
        tag: '15% Nhiệm Vụ Chính',
        part: 'Saga Node',
        targetCount: 1,
        completed: false,
        xp: 100,
        href: '/saga-map',
      },
    ];

    return apiSuccess({
      journeyId,
      day,
      commitMinutes: 45,
      totalExpAvailable: tasks.reduce((sum, t) => sum + t.xp, 0),
      tasks,
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/journeys/${params.journeyId}/daily-plans`);
  }
}
