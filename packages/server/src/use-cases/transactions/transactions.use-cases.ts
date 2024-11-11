import {
  type ITransactionUseCases,
  type ResponseDto,
  type TransactionDto,
  type TransactionCreateDto,
  HttpStatusEnum,
  type TransactionUpdateDto,
} from "@budgeteer/types"
import { HTTPException } from "hono/http-exception"
import { DataService } from "~/services/data-service"
import { isCategoryValid } from "./utils/isCategoryValid"

export const TransactionUseCases: ITransactionUseCases = {
  async findById(id: number): Promise<ResponseDto<TransactionDto>> {
    const transaction = await DataService.transactions.findById(id)

    if (!transaction) {
      throw new HTTPException(HttpStatusEnum.NOT_FOUND, { message: "Transaction not found" })
    }

    const response: ResponseDto<TransactionDto> = {
      status: HttpStatusEnum.OK,
      data: transaction,
    }

    return response
  },
  async create(dto: TransactionCreateDto): Promise<ResponseDto<TransactionDto | null>> {
    try {
      if (!isCategoryValid(dto.type, dto.category)) {
        throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: `Invalid category for type ${dto.type}` })
      }

      const transaction = await DataService.transactions.create(dto)

      const response: ResponseDto<TransactionDto> = {
        status: HttpStatusEnum.CREATED,
        data: transaction,
      }
      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to create transaction" })
    }
  },
  async update(id: number, dto: TransactionUpdateDto): Promise<ResponseDto<TransactionDto | null>> {
    await this.findById(id)

    if (!isCategoryValid(dto.type, dto.category)) {
      throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: `Invalid category for type ${dto.type}` })
    }

    try {
      const transaction = await DataService.transactions.update(id, dto)

      const response: ResponseDto<TransactionDto> = {
        status: HttpStatusEnum.OK,
        data: transaction,
      }

      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to update transaction" })
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
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to delete transaction" })
    }
  },
}
