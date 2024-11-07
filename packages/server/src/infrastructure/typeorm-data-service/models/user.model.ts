import { integer, pgTable, varchar, date, pgEnum } from "drizzle-orm/pg-core"
import { enumToPgEnum } from "../utils/enumToPgEnum"
import { TransactionTypeEnum } from "@budgeteer/types"

const MAX_VARCHAR_LENGTH = 255
export const transactionTypeEnum = pgEnum("transaction_type", enumToPgEnum(TransactionTypeEnum))

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  password: varchar({ length: MAX_VARCHAR_LENGTH }).notNull(),
  profile_picture: varchar({ length: MAX_VARCHAR_LENGTH }).notNull(),
  createdAt: date().defaultNow().notNull(),
})
