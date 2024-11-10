import type { TransactionDto } from "./transaction.dto"

type OmittedFields = Pick<TransactionDto, "id" | "createdAt" | "updatedAt">
export type TransactionCreateDto = Omit<TransactionDto, keyof OmittedFields>
