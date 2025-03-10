import { NextRequest } from "next/server";
import { middleware } from "../index";
import { createRequest, createResponse } from "node-mocks-http";

test("redirects user to correct market", () => {
  const mockReq = createRequest({
    method: "GET",
    url: "/en/casino",
    cookies: { market: "ca" }, // Simulating a user from CA trying to access EN
  });
  const mockRes = createResponse();

  const response = middleware(mockReq);
  
  expect(response?.status).toBe(307);
  expect(response?.headers.get("location")).toBe("/ca/casino");
});
