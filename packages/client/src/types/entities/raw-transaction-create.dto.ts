import { TransactionCreateDtoSchema } from "@budgeteer/types"
import { z } from "zod"

export const RawTransactionCreateDtoSchema = TransactionCreateDtoSchema.omit({
  userId: true,
})
export type RawTransactionCreateDto = z.infer<typeof RawTransactionCreateDtoSchema>
