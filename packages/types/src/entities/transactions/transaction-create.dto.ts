import type { z } from "zod"
import { TransactionDtoSchema } from "./transaction.dto"

export const TransactionCreateDtoSchema = TransactionDtoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export type TransactionCreateDto = z.infer<typeof TransactionCreateDtoSchema>
