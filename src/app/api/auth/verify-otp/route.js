import { signToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const requestData = await request.json();
  const phoneNumber = requestData.phoneNumber;
  const token = await signToken({ phone: phoneNumber });

  // put the token to the cookies
  const response = NextResponse.json({ token });
  response.cookies.set("token", token, { httpOnly: true });
  return response;
}
