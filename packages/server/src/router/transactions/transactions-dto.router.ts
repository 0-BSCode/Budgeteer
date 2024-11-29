import { TransactionDtoSchema, TransactionQueryDtoSchema } from "@budgeteer/types"
import { z } from "zod"

export const transactionIdSchema = z.object({ id: z.coerce.number() })

export const createTransactionSchema = TransactionDtoSchema.pick({
  description: true,
  type: true,
  category: true,
  amount: true,
  date: true,
})

export const updateTransactionSchema = createTransactionSchema.partial()

export const transactionQuerySchema = TransactionQueryDtoSchema.omit({ userId: true })
