import { integer, pgTable, varchar, date, real } from "drizzle-orm/pg-core"
import { MAX_TRANSACTION_DESCRIPTION_LENGTH } from "@budgeteer/types"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { usersTable } from "./user.model"

export const goalsTable = pgTable("goals", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
  description: varchar({ length: MAX_TRANSACTION_DESCRIPTION_LENGTH }).notNull(),
  amount: real().notNull().default(0),
  createdAt: date().defaultNow().notNull(),
  deadline: date().defaultNow().notNull(),
})

export type SelectTransaction = InferSelectModel<typeof goalsTable>
export type InsertTransaction = InferInsertModel<typeof goalsTable>
