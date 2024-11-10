import { TransactionTypeEnum, IncomeCategoryEnum, ExpenseCategoryEnum } from "@budgeteer/types"
import { z } from "zod"

const transactionCategoryEnum = z.union([z.nativeEnum(IncomeCategoryEnum), z.nativeEnum(ExpenseCategoryEnum)])

export const transactionIdSchema = z.object({
  id: z.string().regex(/^[0-9]+$/, "Must be a number"),
})

export const createTransactionSchema = z.object({
  description: z.string(),
  type: z.nativeEnum(TransactionTypeEnum),
  category: transactionCategoryEnum,
  amount: z.number().min(0),
})

export const updateTransactionSchema = z.object({
  description: z.string().optional(),
  type: z.nativeEnum(TransactionTypeEnum).optional(),
  category: transactionCategoryEnum.optional(),
  amount: z.number().min(0).optional(),
})
