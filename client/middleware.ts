import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = ['/books', '/wishlist', '/genres', '/stats', '/profile'];
const GUEST_ONLY = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtected = PROTECTED.some(p => pathname.startsWith(p));
  const isGuestOnly = GUEST_ONLY.some(p => pathname.startsWith(p));

  if (isProtected && !token)
    return NextResponse.redirect(new URL('/login', request.url), { status: 401 });

  if (isGuestOnly && token)
    return NextResponse.redirect(new URL('/books', request.url), { status: 302 });

  return NextResponse.next();
}

export const config = {
  matcher: ['/books/:path*', '/wishlist/:path*', '/genres/:path*',
            '/stats/:path*', '/profile/:path*', '/login', '/register']
};
