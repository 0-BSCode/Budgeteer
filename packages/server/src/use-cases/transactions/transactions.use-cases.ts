import {
  type ITransactionUseCases,
  type ResponseDto,
  type TransactionDto,
  type TransactionCreateDto,
  type TransactionQueryDto,
  HttpStatusEnum,
  type TransactionUpdateDto,
} from "@budgeteer/types"
import { HTTPException } from "hono/http-exception"
import { DataService } from "~/services/data-service"
import { isCategoryValid } from "./utils/isCategoryValid"
import { UsersUseCases } from "../users/users.use-cases"

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
  async findByUserId(userId: number): Promise<ResponseDto<TransactionDto[]>> {
    await UsersUseCases.findById(userId)

    try {
      const transactions = await DataService.transactions.findByUserId(userId)

      const response: ResponseDto<TransactionDto[]> = {
        status: HttpStatusEnum.OK,
        data: transactions,
      }

      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to fetch transactions" })
    }
  },
  async query(dto: TransactionQueryDto): Promise<ResponseDto<TransactionDto[]>> {
    await UsersUseCases.findById(dto.userId)

    if (dto.minAmount && dto.maxAmount && dto.minAmount > dto.maxAmount) {
      throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: "Min amount cannot be greater than max amount" })
    }

    if (dto.startDate && dto.endDate && dto.startDate > dto.endDate) {
      throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: "Start date cannot be greater than end date" })
    }

    try {
      const transactions = await DataService.transactions.query(dto)

      const response: ResponseDto<TransactionDto[]> = {
        status: HttpStatusEnum.OK,
        data: transactions,
      }

      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to fetch transactions" })
    }
  },
  async create(dto: TransactionCreateDto): Promise<ResponseDto<TransactionDto>> {
    try {
      // Check if category is valid for transaction type
      if (dto.type && !isCategoryValid(dto.type, dto.category)) {
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
  async update(id: number, dto: TransactionUpdateDto): Promise<ResponseDto<TransactionDto>> {
    const { data } = await this.findById(id)

    // Check if category is valid for transaction type
    if (dto.type) {
      data.type = dto.type
    }

    if (dto.category) {
      data.category = dto.category
    }
    if (!isCategoryValid(data.type, data.category)) {
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
