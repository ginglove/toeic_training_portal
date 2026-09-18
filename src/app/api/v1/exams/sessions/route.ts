import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    if (!auth?.userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/exams/sessions');
    }
    const userId = auth.userId;

    const body = await req.json();
    const { examId, mode } = body;

    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: {
          include: {
            options: {
              select: { id: true, label: true, text: true },
            },
          },
          orderBy: { questionNumber: 'asc' },
        },
      },
    });

    if (!exam) {
      return apiProblem(404, 'Not Found', 'Exam not found.', '/api/v1/exams/sessions');
    }

    const session = await prisma.attempt.create({
      data: {
        userId,
        examId,
        mode: mode || 'FULL_SIMULATION',
        status: 'IN_PROGRESS',
      },
    });

    return apiSuccess({
      sessionId: session.id,
      examId: exam.id,
      title: exam.title,
      timeLimitMinutes: exam.timeLimitMinutes,
      totalQuestions: exam.questions.length,
      startedAt: session.startedAt,
      questions: exam.questions.map((q) => ({
        id: q.id,
        partNumber: q.partNumber,
        questionNumber: q.questionNumber,
        questionText: q.questionText,
        options: q.options,
      })),
    }, undefined, 201);
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/exams/sessions');
  }
}
