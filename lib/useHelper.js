"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const { userData } = require("../db/schema");
const { db } = require("./db");

export async function insertUser(data) {
  const { id, ...newUserData } = data;
  try {
    const response = await db.insert(userData).values(newUserData).returning();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(id) {
  try {
    const [response] = await db
      .select()
      .from(userData)
      .where(eq(userData.id, id));
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserByID(id, data) {
  try {
    const response = await db
      .update(userData)
      .set(data)
      .where(eq(userData.id, id))
      .returning();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByPhoneNumber(phoneNumber) {
  try {
    const [result] = await db.execute(
      sql`SELECT * FROM ${userData} WHERE ${sql.raw(
        `'${phoneNumber}' = ANY(mobile_number_of_unit_holder)`
      )}` // phone is an array column
    );

    if (!result) {
      return null;
    }

    const id = result.id;
    const [data] = await db.select().from(userData).where(eq(userData.id, id));
    return data;
  } catch (error) {
    console.error("Error fetching user by phone number:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const response = await db.delete(userData).where(eq(userData.id, id));
    revalidatePath("/admin");
    return response;
  } catch (error) {
    console.log(error);
  }
}
