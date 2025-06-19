"use server";

import { cookies } from "next/headers";

export async function signout(data) {
  (await cookies()).set("token", "");
}
