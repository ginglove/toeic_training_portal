import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

/**
 * POST /api/v1/journeys/{journeyId}/exit-exam/attempts
 * Launches the Exit Milestone Exam (S-30) for milestone graduation and Stage 4 Ascension.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { journeyId: string } }
) {
  try {
    const { journeyId } = params;
    const auth = extractAuthUser(req);
    const userId = auth?.userId;

    if (!userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', `/api/v1/journeys/${journeyId}/exit-exam/attempts`);
    }

    // Check for existing in-progress exit exam attempt
    let attempt = await prisma.attempt.findFirst({
      where: {
        userId,
        mode: 'EXIT_EXAM',
        status: 'IN_PROGRESS',
      },
    });

    if (!attempt) {
      // Find an exam to link to (or first available)
      const exam = await prisma.exam.findFirst({
        where: { isPublished: true },
      });

      attempt = await prisma.attempt.create({
        data: {
          userId,
          examId: exam?.id || null,
          mode: 'EXIT_EXAM',
          status: 'IN_PROGRESS',
          startedAt: new Date(),
        },
      });
    }

    // Fetch questions for exit milestone (20 questions covering Parts 1-7)
    let questions = await prisma.question.findMany({
      take: 20,
      include: {
        options: {
          select: { id: true, label: true, text: true },
        },
      },
      orderBy: { questionNumber: 'asc' },
    });

    // Fallback if question bank is empty in development
    if (questions.length === 0) {
      questions = [
        {
          id: 'exit-q1',
          partNumber: 5,
          questionText: 'Ms. Vance requested that the final audit report be submitted _____ Friday afternoon.',
          passageText: null,
          audioUrl: null,
          explanation: null,
          difficulty: 0.1,
          orderIndex: 1,
          examId: 'fallback',
          options: [
            { id: 'opt-1', label: 'A', text: 'by' },
            { id: 'opt-2', label: 'B', text: 'until' },
            { id: 'opt-3', label: 'C', text: 'during' },
            { id: 'opt-4', label: 'D', text: 'between' },
          ],
        } as any,
        {
          id: 'exit-q2',
          partNumber: 5,
          questionText: 'The new aerodynamic design has significantly _____ fuel consumption on long-haul routes.',
          passageText: null,
          audioUrl: null,
          explanation: null,
          difficulty: 0.4,
          orderIndex: 2,
          examId: 'fallback',
          options: [
            { id: 'opt-5', label: 'A', text: 'reduced' },
            { id: 'opt-6', label: 'B', text: 'reducing' },
            { id: 'opt-7', label: 'C', text: 'reduction' },
            { id: 'opt-8', label: 'D', text: 'reducible' },
          ],
        } as any,
      ];
    }

    return apiSuccess({
      attemptId: attempt.id,
      journeyId,
      mode: 'EXIT_EXAM',
      durationMinutes: 30,
      totalQuestions: questions.length,
      startedAt: attempt.startedAt.toISOString(),
      questions: questions.map((q) => ({
        id: q.id,
        part: q.partNumber,
        prompt: q.questionText,
        options: q.options,
      })),
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/journeys/${params.journeyId}/exit-exam/attempts`);
  }
}
