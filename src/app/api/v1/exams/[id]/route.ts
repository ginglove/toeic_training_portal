import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: params.id },
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
      return apiProblem(404, 'Not Found', 'Exam not found.', `/api/v1/exams/${params.id}`);
    }

    return apiSuccess(exam);
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/exams/${params.id}`);
  }
}
