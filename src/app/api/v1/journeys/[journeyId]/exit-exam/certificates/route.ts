import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

/**
 * GET /api/v1/journeys/{journeyId}/exit-exam/certificates
 * Returns official digital certificate for completed graduation milestone
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { journeyId: string } }
) {
  try {
    const { journeyId } = params;
    const auth = extractAuthUser(req);
    const userId = auth?.userId;

    if (!userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', `/api/v1/journeys/${journeyId}/exit-exam/certificates`);
    }

    const certificate = await prisma.certificate.findFirst({
      where: { userId },
      orderBy: { issuedAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    if (!certificate) {
      return apiSuccess({
        hasCertificate: false,
        certificate: null,
      });
    }

    return apiSuccess({
      hasCertificate: true,
      certificate: {
        code: certificate.certificateCode,
        title: certificate.title,
        studentName: certificate.user.name,
        scoreAchieved: certificate.scoreAchieved,
        issuedAt: certificate.issuedAt.toISOString(),
        pdfUrl: certificate.pdfUrl,
      },
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, `/api/v1/journeys/${params.journeyId}/exit-exam/certificates`);
  }
}
