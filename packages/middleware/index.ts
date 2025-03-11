import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./config";
import { MARKET_TO_CASINO } from "@repo/constants";

export function middleware(req: NextRequest) {
  const userSession = req.cookies.get("user")?.value;
  const userMarket = req.cookies.get("market")?.value;
  const url = req.nextUrl;

  // Ignore Next.js static files
  if (url.pathname.startsWith("/_next/static/")) {
    return NextResponse.next();
  }

  // Ignore API requests
  if (url.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const segments = url.pathname.split("/");
  const marketFromURL = segments[1];


  // Validate market from URL
  if (!MARKET_TO_CASINO[marketFromURL]) {
    console.warn(`🚨 Invalid market in URL: ${marketFromURL}. Skipping casino check.`);
    return NextResponse.next();
  }

  // Ensure user is in the correct market
  if (userMarket && userMarket !== marketFromURL) {
    console.warn(`🚨 User market mismatch! Redirecting to /${userMarket}`);
    return NextResponse.redirect(
        new URL(`/${userMarket}${url.pathname.replace(`/${marketFromURL}`, '')}`, req.url)
    );
  }

  // Protect sensitive routes for logged-in users only
  if (
    !userSession &&
    PROTECTED_ROUTES.some((route) => url.pathname.includes(route))
  ) {
    console.warn("🔒 Protected route accessed. Redirecting to login.");
    return NextResponse.redirect(new URL(`/${marketFromURL}/login`, req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to market-based routes
export const config = {
  matcher: ["/en/:path*", "/ca/:path*"],
};
