import { z } from "zod"

export const TransactionTypeEnum = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
}
export const TransactionTypeEnumSchema = z.enum([TransactionTypeEnum.INCOME, TransactionTypeEnum.EXPENSE])
