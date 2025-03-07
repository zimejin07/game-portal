import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_MARKET, PROTECTED_ROUTES } from "./config";

export function middleware(req: NextRequest) {
  const userSession = req.cookies.get("user")?.value;
  const userMarket = req.cookies.get("market")?.value;
  const url = req.nextUrl;

  console.log(`🔍 Middleware triggered for: ${url.pathname}`);

  // Fix infinite loop by only redirecting from `/`, not from `/en`
  if (url.pathname === "/") {
    console.log("🌍 Redirecting root to default market");
    return NextResponse.redirect(new URL(`/${DEFAULT_MARKET}`, req.url));
  }

  // Fix infinite loop by checking if pathname ALREADY starts with a market
  if (!userMarket && !url.pathname.startsWith("/en") && !url.pathname.startsWith("/ca")) {
    console.log("🚨 No market found, using default.");
    return NextResponse.redirect(new URL(`/${DEFAULT_MARKET}${url.pathname}`, req.url));
  }

  // Ensure users stay in their assigned market
  if (userMarket && !url.pathname.startsWith(`/${userMarket}`)) {
    console.log(`🔄 Redirecting user to assigned market: ${userMarket}`);
    return NextResponse.redirect(new URL(`/${userMarket}${url.pathname}`, req.url));
  }

  // Protect sensitive routes (casino, profile) for logged-in users only
  if (!userSession && PROTECTED_ROUTES.some(route => url.pathname.includes(route))) {
    console.log("🔒 Protected route accessed. Redirecting to login.");
    return NextResponse.redirect(new URL(`/${userMarket}/login`, req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to market routes
export const config = {
  matcher: ["/", "/en/:path*", "/ca/:path*"]
};
