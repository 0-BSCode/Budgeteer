import { z } from "zod"

export const TransactionTypeEnumValues = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
} as const
export const TransactionTypeEnumSchema = z.enum([TransactionTypeEnumValues.INCOME, TransactionTypeEnumValues.EXPENSE])
export type TransactionTypeEnum = z.infer<typeof TransactionTypeEnumSchema>
