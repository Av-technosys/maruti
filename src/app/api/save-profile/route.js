import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { userData } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const data = await request.json();

  if (!data.id || data.id === "") {
    return NextResponse.json({ message: "ID not found" });
  }
  const dbResponse = await db
    .update(userData)
    .set(data)
    .where(eq(userData.id, data.id))
    .returning();

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/admin/user");
  return NextResponse.json({ message: "Success" });
}
