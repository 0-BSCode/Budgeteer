import { z } from "zod"
import { TransactionTypeEnum } from "@budgeteer/types"
import { IncomeCategoryEnum, ExpenseCategoryEnum } from "@budgeteer/types"
import { MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_DESCRIPTION_LENGTH } from "@budgeteer/types"

export const TransactionDtoSchema = z.object({
  id: z.string().regex(/^[0-9]+$/, "Must be a number"),
  userId: z.number(),
  description: z.string().max(MAX_TRANSACTION_DESCRIPTION_LENGTH),
  type: z.nativeEnum(TransactionTypeEnum),
  category: z.union([z.nativeEnum(IncomeCategoryEnum), z.nativeEnum(ExpenseCategoryEnum)]),
  amount: z.number().min(MIN_TRANSACTION_AMOUNT),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type TransactionDto = z.infer<typeof TransactionDtoSchema>
