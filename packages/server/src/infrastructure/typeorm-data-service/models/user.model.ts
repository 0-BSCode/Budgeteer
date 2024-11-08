import { integer, pgTable, varchar, date } from "drizzle-orm/pg-core"

const MAX_VARCHAR_LENGTH = 255
const MAX_USERNAME_LENGTH = 30

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: MAX_USERNAME_LENGTH }).notNull().unique(),
  password: varchar({ length: MAX_VARCHAR_LENGTH }).notNull(),
  profile_picture: varchar({ length: MAX_VARCHAR_LENGTH }).notNull(),
  createdAt: date().defaultNow().notNull(),
})
