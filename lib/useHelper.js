"use server";
const { userData } = require("../db/schema");
const { db } = require("./db");

export async function insertUserMeta(data) {
  const response = await db.insert(userData).values(data).returning();
  return response;
}
