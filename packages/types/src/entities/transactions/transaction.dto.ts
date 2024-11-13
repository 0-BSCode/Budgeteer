import { z } from "zod"
import { TransactionTypeEnum } from "~/enums/transaction-type.enum"
import { IncomeCategoryEnum, ExpenseCategoryEnum } from "~/enums/transaction-category.enum"
import { MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_DESCRIPTION_LENGTH } from "~/constants/db.constants"

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
