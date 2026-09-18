import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === 'production'
    ? (() => { throw new Error('CRITICAL: JWT_SECRET environment variable is required in production!'); })()
    : 'toeic-pro-super-secret-jwt-key-2026-v10');

const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  (process.env.NODE_ENV === 'production'
    ? (() => { throw new Error('CRITICAL: JWT_REFRESH_SECRET environment variable is required in production!'); })()
    : 'toeic-pro-super-secret-jwt-refresh-key-2026-v10');

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateTokens(payload: TokenPayload) {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export function extractAuthUser(req: NextRequest): TokenPayload | null {
  // Check Authorization: Bearer <token>
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    return verifyAccessToken(token);
  }

  // Check cookie: accessToken
  const cookie = req.cookies.get('accessToken')?.value;
  if (cookie) {
    return verifyAccessToken(cookie);
  }

  return null;
}
