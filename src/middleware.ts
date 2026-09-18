import { NextRequest, NextResponse } from 'next/server';

function decodeJwtPayload(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payloadJson = Buffer.from(parts[1], 'base64').toString('utf-8');
    return JSON.parse(payloadJson);
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('accessToken')?.value;
  const payload = token ? decodeJwtPayload(token) : null;

  // Check Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Check Protected Learner Pages
  const protectedPrefixes = [
    '/dashboard',
    '/saga-map',
    '/notebook',
    '/node',
    '/drills',
    '/practice',
    '/plan',
    '/progress',
    '/settings',
    '/profile',
    '/colosseum',
    '/shop',
    '/exit-exam',
  ];
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isProtected) {
    if (!payload || !payload.userId) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/saga-map/:path*',
    '/notebook/:path*',
    '/node/:path*',
    '/drills/:path*',
    '/practice/:path*',
    '/plan/:path*',
    '/progress/:path*',
    '/settings/:path*',
    '/profile/:path*',
    '/colosseum/:path*',
    '/shop/:path*',
    '/exit-exam/:path*',
  ],
};
