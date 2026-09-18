import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractAuthUser } from '@/lib/auth';
import { apiProblem } from '@/lib/response';

/**
 * GET /api/v1/users/me/export
 * PDPD / GDPR Personal Data Portability export endpoint (SRS § 5.23)
 * Returns a comprehensive JSON dump of all user learning history and personal records.
 */
export async function GET(req: NextRequest) {
  try {
    const auth = extractAuthUser(req);
    const userId = auth?.userId;

    if (!userId) {
      return apiProblem(401, 'Unauthorized', 'Authentication required.', '/api/v1/users/me/export');
    }

    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        level: true,
        totalExp: true,
        timezone: true,
        createdAt: true,
        journeys: {
          select: {
            id: true,
            targetScore: true,
            initialScore: true,
            predictedScore: true,
            currentDay: true,
            status: true,
            createdAt: true,
          },
        },
        attempts: {
          select: {
            id: true,
            mode: true,
            status: true,
            totalScore: true,
            listeningScore: true,
            readingScore: true,
            totalDurationSeconds: true,
            startedAt: true,
            completedAt: true,
          },
        },
        mistakes: {
          select: {
            id: true,
            questionId: true,
            repetitionNumber: true,
            intervalDays: true,
            easinessFactor: true,
            nextReviewDate: true,
          },
        },
        gamification: {
          select: {
            gems: true,
            energy: true,
            currentStreak: true,
            maxStreak: true,
            activeShieldCount: true,
            leagueTier: true,
            weeklyExp: true,
          },
        },
        certificates: {
          select: {
            certificateCode: true,
            title: true,
            scoreAchieved: true,
            issuedAt: true,
          },
        },
      },
    });

    if (!userData) {
      return apiProblem(404, 'Not Found', 'User records not found.', '/api/v1/users/me/export');
    }

    const exportPayload = {
      exportMetadata: {
        standard: 'PDPD Decree 13/2023/ND-CP & GDPR Article 20',
        exportedAt: new Date().toISOString(),
        service: 'TOEIC PRO v10.1',
      },
      userProfile: userData,
    };

    return new NextResponse(JSON.stringify(exportPayload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="toeic-pro-data-${userId.slice(0, 8)}.json"`,
      },
    });
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/users/me/export');
  }
}
