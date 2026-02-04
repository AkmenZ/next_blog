import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// simple in-memory rate limiting (resets on edge function cold start)
const rateLimitMap = new Map<string, number[]>();

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";

  // bot detection
  const botPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /scrape/i,
    /curl/i,
    /wget/i,
    /python-requests/i,
    /java/i,
    /selenium/i,
    /phantom/i,
    /headless/i,
    /postman/i,
    /ahrefsbot/i,
    /semrushbot/i,
    /dotbot/i,
    /rogerbot/i,
    /mj12bot/i,
    /petalbot/i,
    /seznambot/i,
    /bingpreview/i,
    /yandex/i,
    /baiduspider/i,
    /megaindex/i,
    /blexbot/i,
  ];

  if (botPatterns.some((pattern) => pattern.test(userAgent))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // allow only legitimate browsers
  const legitimateBrowsers = /mozilla|chrome|safari|edge|opera|firefox/i;
  if (!legitimateBrowsers.test(userAgent) && userAgent !== "") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // rate limiting
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 60;

  const requestLog = rateLimitMap.get(ip) || [];
  const recentRequests = requestLog.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  // clean up old entries
  if (rateLimitMap.size > 10000) {
    const firstKey = rateLimitMap.keys().next().value;
    if (firstKey) {
      rateLimitMap.delete(firstKey);
    }
  }

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

// match to all routes except for static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any file with an extension (e.g. .svg, .png, .jpg, .robot)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
