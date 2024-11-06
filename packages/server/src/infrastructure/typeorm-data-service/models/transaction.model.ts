import { integer, pgTable, varchar, numeric, date, pgEnum } from "drizzle-orm/pg-core"
import { enumToPgEnum } from "../utils/enumToPgEnum"
import { TransactionTypeEnum } from "@budgeteer/types"

const DESCRIPTION_LENGTH = 255
const transactionTypeEnum = pgEnum("transaction_type", enumToPgEnum(TransactionTypeEnum))

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: varchar({ length: DESCRIPTION_LENGTH }).notNull(),
  type: transactionTypeEnum().notNull().default(TransactionTypeEnum.EXPENSE),
  amount: numeric().notNull().default("0"),
  createdAt: date().defaultNow().notNull(),
  updatedAt: date().defaultNow().notNull(),
})
