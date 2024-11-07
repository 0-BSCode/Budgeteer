import { integer, pgTable, varchar, date, pgEnum, real } from "drizzle-orm/pg-core"
import { enumToPgEnum } from "../utils/enumToPgEnum"
import { TransactionTypeEnum } from "@budgeteer/types"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"

const DESCRIPTION_LENGTH = 255
export const transactionTypeEnum = pgEnum("transaction_type", enumToPgEnum(TransactionTypeEnum))

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: varchar({ length: DESCRIPTION_LENGTH }).notNull(),
  type: transactionTypeEnum().notNull().default(TransactionTypeEnum.EXPENSE),
  amount: real().notNull().default(0),
  createdAt: date().defaultNow().notNull(),
  updatedAt: date().defaultNow().notNull(),
})

export type SelectTransaction = InferSelectModel<typeof transactionsTable>
export type InsertTransaction = InferInsertModel<typeof transactionsTable>
