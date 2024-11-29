import { integer, pgTable, varchar, date, pgEnum, real } from "drizzle-orm/pg-core"
import { enumsToPgEnum } from "../utils/enumsToPgEnum"
import {
  ExpenseCategoryEnumValues,
  IncomeCategoryEnumValues,
  MAX_TRANSACTION_DESCRIPTION_LENGTH,
  TransactionTypeEnumValues,
} from "@budgeteer/types"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { usersTable } from "./user.model"

export const transactionTypeEnum = pgEnum("transaction_type", enumsToPgEnum(TransactionTypeEnumValues))
export const transactionCategoryEnum = pgEnum(
  "transaction_category",
  enumsToPgEnum(ExpenseCategoryEnumValues, IncomeCategoryEnumValues),
)

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
  description: varchar({ length: MAX_TRANSACTION_DESCRIPTION_LENGTH }).notNull(),
  type: transactionTypeEnum().notNull().default(TransactionTypeEnumValues.EXPENSE),
  category: transactionCategoryEnum().notNull(),
  amount: real().notNull().default(0),
  date: date().notNull(),
  createdAt: date().defaultNow().notNull(),
  updatedAt: date().defaultNow().notNull(),
})

export type SelectTransaction = InferSelectModel<typeof transactionsTable>
export type InsertTransaction = InferInsertModel<typeof transactionsTable>
