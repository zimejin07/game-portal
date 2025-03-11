import { middleware } from "../index";
import { NextRequest, NextResponse } from "next/server";
import { MARKET_TO_CASINO } from "@repo/constants";

jest.mock("next/server", () => ({
  NextResponse: {
    next: jest.fn(() => ({ status: 200 })),
    redirect: jest.fn(),
  },
}));

describe("Middleware Tests", () => {
  const createMockRequest = (url: string, cookies: Record<string, string>) => {
    return {
      nextUrl: new URL(url, "http://localhost"),
      cookies: {
        get: (name: string) => ({ value: cookies[name] }),
      },
    } as unknown as NextRequest;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("ignores static files", () => {
    const req = createMockRequest("/_next/static/file.js", {});
    const response = middleware(req);
    expect(response).toEqual(NextResponse.next());
  });

  test("ignores API requests", () => {
    const req = createMockRequest("/api/data", {});
    const response = middleware(req);
    expect(response).toEqual(NextResponse.next());
  });

  test("handles valid market and no user market mismatch", () => {
    const req = createMockRequest("/en/casino", { market: "en" });
    const response = middleware(req);
    expect(response).toEqual(NextResponse.next());
  });

  test("redirects when user market does not match", () => {
    const req = createMockRequest("/en/casino", { market: "ca" });
    const response = middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/ca/casino", req.nextUrl.origin)
    );
  });

  test("redirects to login for protected route without user session", () => {
    const req = createMockRequest("/en/my-profile", {});
    const response = middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/en/login", req.nextUrl.origin)
    );
  });

  test("does not redirect for protected route with user session", () => {
    const req = createMockRequest("/en/my-profile", { user: "session" });
    const response = middleware(req);
    expect(response).toEqual(NextResponse.next());
  });

  test("handles invalid market gracefully", () => {
    const req = createMockRequest("/en/invalid-market", {});
    const response = middleware(req);
    expect(response).toEqual(NextResponse.next());
  });
});
