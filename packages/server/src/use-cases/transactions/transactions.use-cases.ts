import {
  type ITransactionUseCases,
  type ResponseDto,
  type TransactionDto,
  type TransactionCreateDto,
  HttpStatusEnum,
  type TransactionUpdateDto,
} from "@budgeteer/types"
import { DataService } from "~/services/data-service"

export const TransactionUseCases: ITransactionUseCases = {
  async findById(id: number): Promise<ResponseDto<TransactionDto | null>> {
    const transaction = await DataService.transactions.findById(id)

    const response: ResponseDto<TransactionDto | null> = {
      status: HttpStatusEnum.NOT_FOUND,
      data: null,
    }
    if (!transaction) {
      response.message = "Transaction not found"
      return response
    }

    response.status = HttpStatusEnum.OK
    response.data = transaction
    return response
  },
  // TODO: Error handling
  async create(dto: TransactionCreateDto): Promise<ResponseDto<TransactionDto | null>> {
    try {
      const transaction = await DataService.transactions.create(dto)

      const response: ResponseDto<TransactionDto> = {
        status: HttpStatusEnum.CREATED,
        data: transaction,
      }
      return response
    } catch (e) {
      const response: ResponseDto<null> = {
        status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
        data: null,
      }
      if (e instanceof Error) {
        response.message = e.message
        return response
      }

      response.message = "Unknown error"
      return response
    }
  },
  async update(id: number, dto: TransactionUpdateDto): Promise<ResponseDto<TransactionDto | null>> {
    await this.findById(id)

    try {
      const transaction = await DataService.transactions.update(id, dto)

      const response: ResponseDto<TransactionDto> = {
        status: HttpStatusEnum.OK,
        data: transaction,
      }

      return response
    } catch (e) {
      const response: ResponseDto<null> = {
        status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
        data: null,
      }

      if (e instanceof Error) {
        response.message = e.message
        return response
      }

      response.message = "Unknown error"
      return response
    }
  },
  async delete(id: number): Promise<ResponseDto<null>> {
    await this.findById(id)

    try {
      await DataService.transactions.delete(id)

      const response: ResponseDto<null> = {
        status: HttpStatusEnum.OK,
        data: null,
      }

      return response
    } catch (e) {
      const response: ResponseDto<null> = {
        status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
        data: null,
      }

      if (e instanceof Error) {
        response.message = e.message
        return response
      }

      response.message = "Unknown error"
      return response
    }
  },
}
