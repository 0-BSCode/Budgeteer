import { z } from "zod"

// Values for enum
export const TransactionSortColumnEnum = {
  DATE: "DATE",
  AMOUNT: "AMOUNT",
} as const

// Zod schema
export const TransactionSortColumnEnumSchema = z.enum([
  TransactionSortColumnEnum.DATE,
  TransactionSortColumnEnum.AMOUNT,
])
