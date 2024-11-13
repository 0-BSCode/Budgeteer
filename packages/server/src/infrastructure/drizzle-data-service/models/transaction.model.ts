import { integer, pgTable, varchar, date, pgEnum, real } from "drizzle-orm/pg-core"
import { enumsToPgEnum, enumToPgEnum } from "../utils/enumToPgEnum"
import {
  ExpenseCategoryEnum,
  IncomeCategoryEnum,
  MAX_TRANSACTION_DESCRIPTION_LENGTH,
  TransactionTypeEnum,
} from "@budgeteer/types"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { usersTable } from "./user.model"

export const transactionTypeEnum = pgEnum("transaction_type", enumToPgEnum(TransactionTypeEnum))
export const transactionCategoryEnum = pgEnum(
  "transaction_category",
  enumsToPgEnum([IncomeCategoryEnum, ExpenseCategoryEnum]),
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
