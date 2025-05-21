"use server";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { userData } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function POST(request) {
  const cookiesStore = await cookies();
  const { email } = await request.json();
  const data = await db
    .select()
    .from(userData)
    .where(eq(userData.email, email));
  if (data && data.length > 0) {
    cookiesStore.set("data", JSON.stringify(data[0]));
    return NextResponse.json({ found: true });
  }
  return NextResponse.json({ found: false });
}
