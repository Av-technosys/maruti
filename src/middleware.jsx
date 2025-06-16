import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(request) {
  const allCookies = request.cookies.getAll();
  const jwt_token = allCookies.find((cookie) => cookie.name === "token");

  const userData = await verifyToken(jwt_token?.value);
  console.log("user data", userData);

  if (!userData || !jwt_token || userData.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();
  console.log(userData);
  response.headers.set("x-user-id", userData?.id || "");
  response.headers.set("x-user-phone", userData?.phone || "");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/"],
};
