import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // Get market from cookie
    const userMarket = req.cookies.get("market")?.value;
    const url = req.nextUrl;

    // Ensure users stay within their market
    if (userMarket && !url.pathname.startsWith(`/${userMarket}`)) {
        return NextResponse.redirect(new URL(`/${userMarket}${url.pathname}`, req.url));
    }

    return NextResponse.next();
}

// Apply middleware only to market-related routes
export const config = {
    matcher: ["/en/:path*", "/ca/:path*"]
};
