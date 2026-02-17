import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const devSessionToken = request.cookies.get("next-auth.session-token");
  const prodSessionToken = request.cookies.get(
    "__Secure-next-auth.session-token",
  );
  const sessionToken = prodSessionToken || devSessionToken;
  const url = request.nextUrl.clone();

  if (!sessionToken && url.searchParams.has("login")) {
    return NextResponse.next();
  }

  if (sessionToken && url.searchParams.has("login")) {
    url.searchParams.delete("login");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// CRITICAL: Only match routes that actually use the ?login parameter.
// Every matched route = 1 edge invocation, even from bots.
// The fewer routes matched, the fewer invocations consumed.
export const config = {
  matcher: [
    "/",
    "/contact",
    "/posts/:path*",
  ],
};