import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const userSession = req.cookies.get("user")?.value; // Check if user is logged in
    const userMarket = req.cookies.get("market")?.value;
    const url = req.nextUrl;

    // Ensure users stay in their assigned market
    if (userMarket && !url.pathname.startsWith(`/${userMarket}`)) {
        return NextResponse.redirect(new URL(`/${userMarket}${url.pathname}`, req.url));
    }

    // Protect `/casino` and `/my-profile` routes
    if (!userSession && (url.pathname.includes("/casino") || url.pathname.includes("/my-profile"))) {
        return NextResponse.redirect(new URL(`/${userMarket}/login`, req.url));
    }

    return NextResponse.next();
}

// Apply middleware to market routes
export const config = {
    matcher: ["/en/:path*", "/ca/:path*"]
};
