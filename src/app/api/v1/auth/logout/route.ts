import { NextRequest, NextResponse } from 'next/server';
import { apiSuccess } from '@/lib/response';

export async function POST(req: NextRequest) {
  const response = apiSuccess({ message: 'Logged out successfully' });
  response.cookies.delete('accessToken');
  return response;
}
