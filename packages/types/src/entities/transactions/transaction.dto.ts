import { z } from "zod"
import { TransactionTypeEnum } from "~/enums/transaction-type.enum"
import { IncomeCategoryEnum, ExpenseCategoryEnum } from "~/enums/transaction-category.enum"

export const TransactionDtoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  description: z.string(),
  type: z.nativeEnum(TransactionTypeEnum),
  category: z.union([z.nativeEnum(IncomeCategoryEnum), z.nativeEnum(ExpenseCategoryEnum)]),
  amount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type TransactionDto = z.infer<typeof TransactionDtoSchema>
