import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./config";
import { MARKET_TO_CASINO } from "@repo/constants";

export function middleware(req: NextRequest) {
  const userSession = req.cookies.get("user")?.value;
  const userMarket = req.cookies.get("market")?.value;
  const url = req.nextUrl;

  console.log(`🔍 Middleware triggered for: ${url.pathname}`);

  // Ignore Next.js static files
  if (url.pathname.startsWith("/_next/static/")) {
    console.log("⚡ Middleware ignoring static files");
    return NextResponse.next();
  }

  // Ignore API requests
  if (url.pathname.startsWith("/api/")) {
    console.log("🛑 Skipping middleware for API request.");
    return NextResponse.next();
  }

  // Determine market from URL (assuming URLs are /en/casino or /ca/casino)
  const marketFromURL = url.pathname.split("/")[1]; // Get the first part after "/"

  if (!MARKET_TO_CASINO[marketFromURL]) {
    console.log(
      `🚨 Invalid market in URL: ${marketFromURL}. Skipping casino check.`
    );
    return NextResponse.next();
  }

  const expectedCasino = MARKET_TO_CASINO[marketFromURL];

  console.log(
    `🎰 User is in market: ${marketFromURL}. Expected casino: ${expectedCasino}`
  );

  // Ensure user is in the correct market
  if (userMarket && userMarket !== marketFromURL) {
    console.log(`🚨 User market mismatch! Redirecting to /${userMarket}`);
    return NextResponse.redirect(
      new URL(`/${userMarket}${url.pathname}`, req.url)
    );
  }

  // Protect sensitive routes for logged-in users only
  if (
    !userSession &&
    PROTECTED_ROUTES.some((route) => url.pathname.includes(route))
  ) {
    console.log("🔒 Protected route accessed. Redirecting to login.");
    return NextResponse.redirect(new URL(`/${marketFromURL}/login`, req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to market-based routes
export const config = {
  matcher: ["/en/:path*", "/ca/:path*"],
};
