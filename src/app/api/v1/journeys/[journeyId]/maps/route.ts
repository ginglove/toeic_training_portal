import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { journeyId: string } }
) {
  try {
    const { journeyId } = params;

    const journey = await prisma.userJourney.findUnique({
      where: { id: journeyId },
      include: {
        guardian: true,
        nodes: {
          orderBy: { nodeIndex: 'asc' },
          include: { progress: true },
        },
      },
    });

    if (!journey) {
      return apiProblem(404, 'Not Found', 'Journey not found.', `/api/v1/journeys/${journeyId}/maps`);
    }

    return apiSuccess({
      journeyId: journey.id,
      targetScore: journey.targetScore,
      currentDay: journey.currentDay,
      durationDays: journey.durationDays,
      status: journey.status,
      mode: journey.mode,
      guardian: journey.guardian,
      nodes: journey.nodes.map((node) => ({
        id: node.id,
        nodeIndex: node.nodeIndex,
        dayIndex: node.dayIndex,
        nodeType: node.nodeType,
        title: node.title,
        coordXPercent: node.coordXPercent,
        coordYIndex: node.coordYIndex,
        biomeTheme: node.biomeTheme,
        targetPart: node.targetPart,
        questionCount: node.questionCount,
        minStarsRequired: node.minStarsRequired,
        status: node.status,
        starsEarned: node.progress?.starsEarned || 0,
        isCompleted: node.progress?.isCompleted || false,
      })),
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/journeys/${params.journeyId}/maps`);
  }
}
