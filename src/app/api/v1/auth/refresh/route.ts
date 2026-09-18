import { NextRequest } from 'next/server';
import { verifyRefreshToken, generateTokens } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return apiProblem(400, 'Bad Request', 'Refresh token is required.', '/api/v1/auth/refresh');
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return apiProblem(401, 'Unauthorized', 'Invalid or expired refresh token.', '/api/v1/auth/refresh');
    }

    const tokens = generateTokens({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    return apiSuccess(tokens);
  } catch (error: any) {
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/auth/refresh');
  }
}
