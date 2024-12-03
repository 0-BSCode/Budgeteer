import { TransactionCreateDtoSchema } from "@budgeteer/types"
import { z } from "zod"

export const RawGoalCreateDtoSchema = TransactionCreateDtoSchema.omit({
  userId: true,
})
export type RawTransactionCreateDto = z.infer<typeof RawTransactionCreateDtoSchema>
