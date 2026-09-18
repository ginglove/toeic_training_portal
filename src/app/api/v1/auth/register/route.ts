import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateTokens } from '@/lib/auth';
import { apiSuccess, apiProblem } from '@/lib/response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return apiProblem(400, 'Validation Error', 'Email, password, and name are required.', '/api/v1/auth/register');
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return apiProblem(409, 'Conflict', 'An account with this email already exists.', '/api/v1/auth/register');
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        gamification: {
          create: {
            gems: 50,
            energy: 5,
            currentStreak: 0,
            maxStreak: 0,
          },
        },
        settings: {
          create: {
            theme: 'SYSTEM',
          },
        },
      },
    });

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
      },
      tokens,
    }, undefined, 201);

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
    return apiProblem(500, 'Internal Server Error', error.message, '/api/v1/auth/register');
  }
}
