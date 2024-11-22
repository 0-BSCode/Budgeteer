import { z } from "zod"

export const TransactionTypeEnum = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
} as const
export const TransactionTypeEnumSchema = z.enum([TransactionTypeEnum.INCOME, TransactionTypeEnum.EXPENSE])
