import { z } from "zod"
import { TransactionTypeEnumSchema } from "../../enums/transaction-type.enum"
import { TransactionCategoryEnumSchema } from "../../enums/transaction-category.enum"
import {
  MIN_TRANSACTION_AMOUNT,
  MAX_TRANSACTION_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
} from "../../constants/db.constants"

export const TransactionDtoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  description: z.string().min(MIN_DESCRIPTION_LENGTH).max(MAX_TRANSACTION_DESCRIPTION_LENGTH),
  type: TransactionTypeEnumSchema,
  category: TransactionCategoryEnumSchema,
  amount: z.coerce.number().min(MIN_TRANSACTION_AMOUNT),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TransactionDto = z.infer<typeof TransactionDtoSchema>
