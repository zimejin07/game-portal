import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./config";
import { CASINO_MARKET_RULES } from "@repo/constants";

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

  // Ignore API requests (so they don’t get redirected)
  if (url.pathname.startsWith("/api/")) {
    console.log("🛑 Skipping middleware for API request.");
    return NextResponse.next();
  }

  // Enforce casino-market restrictions
  const casino = url.pathname.includes("/casino-a") ? "casino-a" : url.pathname.includes("/casino-b") ? "casino-b" : null;
  if (casino && userMarket !== CASINO_MARKET_RULES[casino]) {
    console.log(`🚨 Unauthorized market access: ${casino} does not allow ${userMarket}`);
    return NextResponse.redirect(new URL(`/${CASINO_MARKET_RULES[casino]}/login`, req.url));
  }

  // Ensure users stay in their assigned market
  if (userMarket && !url.pathname.startsWith(`/${userMarket}`)) {
    console.log(`🔄 Redirecting user to assigned market: ${userMarket}`);
    return NextResponse.redirect(new URL(`/${userMarket}${url.pathname}`, req.url));
  }

  // Protect sensitive routes for logged-in users only
  if (!userSession && PROTECTED_ROUTES.some(route => url.pathname.includes(route))) {
    console.log("🔒 Protected route accessed. Redirecting to login.");
    return NextResponse.redirect(new URL(`/${userMarket || "en"}/login`, req.url));
  }

  return NextResponse.next();
}

// ✅ Update config to exclude API routes
export const config = {
  matcher: ["/en/:path*", "/ca/:path*"], // No longer applies to `/api/`
};
