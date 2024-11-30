import type { ResponseDto } from "../../entities/response/response.dto"
import type { TransactionCreateDto } from "../../entities/transactions/transaction-create.dto"
import type { TransactionUpdateDto } from "../../entities/transactions/transaction-update.dto"
import type { TransactionDto, TransactionQueryDto } from "../../entities/transactions/transaction.dto"

export type ITransactionUseCases = {
  create: (dto: TransactionCreateDto) => Promise<ResponseDto<TransactionDto>>
  query: (dto: TransactionQueryDto) => Promise<ResponseDto<TransactionDto[]>>
  findById: (id: number, userId: number) => Promise<ResponseDto<TransactionDto>>
  findByUserId: (userId: number) => Promise<ResponseDto<TransactionDto[]>>
  update: (id: number, userId: number, dto: TransactionUpdateDto) => Promise<ResponseDto<TransactionDto>>
  delete: (id: number, userId: number) => Promise<ResponseDto<null>>
}
