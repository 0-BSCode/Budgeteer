import { MAX_USERNAME_LENGTH, MAX_VARCHAR_LENGTH } from "@budgeteer/types"
import type { InferSelectModel } from "drizzle-orm"
import { integer, pgTable, varchar, date } from "drizzle-orm/pg-core"

const EMPTY_PROFILE_PICTURE = ""

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: MAX_USERNAME_LENGTH }).notNull().unique(),
  password: varchar({ length: MAX_VARCHAR_LENGTH }).notNull(),
  profile_picture: varchar({ length: MAX_VARCHAR_LENGTH }).notNull().default(EMPTY_PROFILE_PICTURE),
  createdAt: date().defaultNow().notNull(),
})

export type SelectUser = InferSelectModel<typeof usersTable>
