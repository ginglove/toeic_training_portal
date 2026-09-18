import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: nodeId } = params;
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', `/api/v1/nodes/${nodeId}/attempts`);
    }
    const userId = auth.userId;

    const node = await prisma.mapNode.findUnique({
      where: { id: nodeId },
    });

    if (!node) {
      return apiProblem(404, 'Not Found', 'Map node not found.', `/api/v1/nodes/${nodeId}/attempts`);
    }

    // Check Energy
    const gamification = await prisma.gamificationState.findUnique({ where: { userId } });
    if (gamification && gamification.energy <= 0) {
      return apiProblem(403, 'Energy Depleted', 'You have 0 energy hearts. Practice to recharge or refill with Gems.', `/api/v1/nodes/${nodeId}/attempts`);
    }

    // Deduct 1 energy
    if (gamification) {
      await prisma.gamificationState.update({
        where: { userId },
        data: { energy: { decrement: 1 } },
      });
    }

    // Fetch questions for this node's target part
    const questions = await prisma.question.findMany({
      where: { partNumber: node.targetPart },
      include: { options: true },
      take: node.questionCount,
    });

    // Create an Attempt record
    const attempt = await prisma.attempt.create({
      data: {
        userId,
        mode: 'PRACTICE_PART',
        status: 'IN_PROGRESS',
      },
    });

    return apiSuccess({
      attemptId: attempt.id,
      nodeId: node.id,
      title: node.title,
      nodeType: node.nodeType,
      targetPart: node.targetPart,
      questions: questions.map((q) => ({
        id: q.id,
        partNumber: q.partNumber,
        questionNumber: q.questionNumber,
        questionText: q.questionText,
        options: q.options.map((o) => ({ label: o.label, text: o.text })),
      })),
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/nodes/${params.id}/attempts`);
  }
}
