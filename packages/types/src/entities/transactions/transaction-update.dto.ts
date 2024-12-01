import type { z } from "zod"
import { TransactionCreateDtoSchema } from "./transaction-create.dto"

export const TransactionUpdateDtoSchema = TransactionCreateDtoSchema.omit({
  userId: true,
}).partial()
export type TransactionUpdateDto = z.infer<typeof TransactionUpdateDtoSchema>
