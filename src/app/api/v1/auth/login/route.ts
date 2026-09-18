import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateTokens } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return apiProblem(400, 'Invalid Request', 'Email and password are required.', '/api/v1/auth/login');
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { gamification: true },
    });

    if (!user || user.deletedAt) {
      return apiProblem(401, 'Unauthorized', 'Invalid credentials.', '/api/v1/auth/login');
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return apiProblem(401, 'Unauthorized', 'Invalid credentials.', '/api/v1/auth/login');
    }

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = apiSuccess({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        level: user.level,
        totalExp: user.totalExp,
      },
      tokens,
    });

    // Set cookie for browser session
    response.cookies.set('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7200,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return apiProblem(500, 'Internal Server Error', error.message || 'An unexpected error occurred.', '/api/v1/auth/login');
  }
}
