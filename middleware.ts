import { NextResponse, type NextRequest } from "next/server";

/**
 * Success story URLs are lowercase. Send any capitalised variant, such as
 * /success-stories/Jp-fitness, to the canonical URL with a permanent redirect.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const lower = pathname.toLowerCase();
  if (pathname === lower) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/success-stories/:path*"],
};
