import { integer, pgTable, varchar, date, pgEnum, real } from "drizzle-orm/pg-core"
import { enumsToPgEnum } from "../utils/enumsToPgEnum"
import {
  ExpenseCategoryEnum,
  IncomeCategoryEnum,
  MAX_TRANSACTION_DESCRIPTION_LENGTH,
  TransactionTypeEnum,
} from "@budgeteer/types"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { usersTable } from "./user.model"

export const transactionTypeEnum = pgEnum("transaction_type", enumsToPgEnum(TransactionTypeEnum))
// TODO: Fix type error (converts fine, but it gets recognized as an array of 'OTHER')
export const transactionCategoryEnum = pgEnum(
  "transaction_category",
  enumsToPgEnum(ExpenseCategoryEnum, IncomeCategoryEnum),
)

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
  description: varchar({ length: MAX_TRANSACTION_DESCRIPTION_LENGTH }).notNull(),
  type: transactionTypeEnum().notNull().default(TransactionTypeEnum.EXPENSE),
  category: transactionCategoryEnum().notNull(),
  amount: real().notNull().default(0),
  createdAt: date().defaultNow().notNull(),
  updatedAt: date().defaultNow().notNull(),
})

export type SelectTransaction = InferSelectModel<typeof transactionsTable>
export type InsertTransaction = InferInsertModel<typeof transactionsTable>
