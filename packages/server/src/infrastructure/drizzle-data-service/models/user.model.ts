import { MAX_USERNAME_LENGTH, MAX_PROFILE_PIC_LENGTH, MAX_PASSWORD_LENGTH } from "@budgeteer/types"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: MAX_USERNAME_LENGTH }).notNull().unique(),
  password: varchar({ length: MAX_PASSWORD_LENGTH }).notNull(),
  profile_picture: varchar({ length: MAX_PROFILE_PIC_LENGTH }).notNull().default(""),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
})

export type SelectUser = InferSelectModel<typeof usersTable>
export type InsertUser = InferInsertModel<typeof usersTable>
