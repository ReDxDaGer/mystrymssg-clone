import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token) {
    if (url.pathname === '/sign-in' || url.pathname === '/sign-up' || url.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/verify')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Allow the request to continue for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify/:path*'],
}