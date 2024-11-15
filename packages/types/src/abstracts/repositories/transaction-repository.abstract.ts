import type { TransactionCreateDto } from "~/entities/transactions/transaction-create.dto"
import type { TransactionUpdateDto } from "~/entities/transactions/transaction-update.dto"
import type { TransactionDto } from "~/entities/transactions/transaction.dto"

export type ITransactionRepository = {
  findByUserId: (userId: number) => Promise<TransactionDto[]>
  findById: (id: number) => Promise<TransactionDto | null>
  create: (dto: TransactionCreateDto) => Promise<TransactionDto>
  update: (id: number, dto: TransactionUpdateDto) => Promise<TransactionDto>
  delete: (id: number) => Promise<void>
  convertToDto: (data: unknown) => TransactionDto
}
