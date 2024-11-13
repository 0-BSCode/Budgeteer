import { TransactionDtoSchema } from "@budgeteer/types"

export const transactionIdSchema = TransactionDtoSchema.pick({ id: true })

export const createTransactionSchema = TransactionDtoSchema.pick({
  description: true,
  type: true,
  category: true,
  amount: true,
})

export const updateTransactionSchema = createTransactionSchema.partial()
