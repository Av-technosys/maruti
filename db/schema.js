import { jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const userData = pgTable("userData", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name"),
  email: varchar("email"),
  roomNumber: varchar("roomNumber"),
  adharImage: varchar("adharImage"),
  panImage: varchar("registoryPDF"),
  bankLoanDetails: jsonb("bankLoanDetails"),
  role: varchar("role"),
});
