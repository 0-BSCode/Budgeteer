import { MAX_USERNAME_LENGTH, MAX_PROFILE_PIC_LENGTH, MAX_PASSWORD_LENGTH } from "@budgeteer/types"
import type { InferSelectModel } from "drizzle-orm"
import { integer, pgTable, varchar, date } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: MAX_USERNAME_LENGTH }).notNull().unique(),
  password: varchar({ length: MAX_PASSWORD_LENGTH }).notNull(),
  profile_picture: varchar({ length: MAX_PROFILE_PIC_LENGTH }).notNull().default(""),
  createdAt: date().defaultNow().notNull(),
})

export type SelectUser = InferSelectModel<typeof usersTable>
