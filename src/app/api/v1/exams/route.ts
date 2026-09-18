import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function GET(req: NextRequest) {
  try {
    const exams = await prisma.exam.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        code: true,
        title: true,
        description: true,
        totalQuestions: true,
        timeLimitMinutes: true,
        createdAt: true,
      },
    });

    return apiSuccess(exams);
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/exams');
  }
}
