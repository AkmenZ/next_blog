import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const devSessionToken = request.cookies.get('next-auth.session-token'); // development
  const prodSessionToken = request.cookies.get('__Secure-next-auth.session-token'); // production

  const sessionToken = prodSessionToken || devSessionToken;

  const url = request.nextUrl.clone();

  if (!sessionToken && url.searchParams.has('login')) {
    return NextResponse.next();
  }

  if (sessionToken && url.searchParams.has('login')) {
    url.searchParams.delete('login');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// match to all routes except for static files
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
