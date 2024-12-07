import { z } from "zod"
import {
  HttpStatusEnum,
  ResponseDto,
  TransactionDto,
  TransactionDtoSchema,
  TransactionUpdateDto,
} from "@budgeteer/types"
import axios, { AxiosError } from "axios"
import config from "~/lib/config"
import { RawTransactionCreateDto } from "~/types/entities/raw-transaction-create.dto"

const BASE_URL = `${config.NEXT_PUBLIC_API_BASE_URL}/transactions`

const transactionService = {
  getByUserId: async (token: string): Promise<TransactionDto[]> => {
    let data: TransactionDto[] | null
    try {
      const { data: response } = await axios.get<ResponseDto<TransactionDto[] | null>>(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status !== HttpStatusEnum.OK) {
        throw new Error(response.message)
      }

      data = response.data
    } catch (e) {
      if (e instanceof Error && (e as Error).name === "AxiosError") {
        if ((e as AxiosError).status) {
          throw new Error((e as AxiosError).message)
        }
      }

      throw new Error("Unable to fetch transactions.")
    }

    const { data: transactions, success } = z.array(TransactionDtoSchema).safeParse(data)

    if (!success) {
      throw new Error("The server sent malformatted data. Please contact the website admin.")
    }

    return transactions
  },
  getById: async (token: string, id: string): Promise<TransactionDto> => {
    let data: TransactionDto | null
    try {
      const { data: response } = await axios.get<ResponseDto<TransactionDto | null>>(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status !== HttpStatusEnum.OK) {
        throw new Error(response.message)
      }

      data = response.data
    } catch (e) {
      if (e instanceof Error && (e as Error).name === "AxiosError") {
        if ((e as AxiosError).status) {
          throw new Error((e as AxiosError).message)
        }
      }

      throw new Error("Unable to fetch transaction.")
    }

    return validateResponseData(data)
  },
  create: async (token: string, dto: RawTransactionCreateDto): Promise<TransactionDto> => {
    let data: TransactionDto | null
    try {
      const { data: response } = await axios.post<ResponseDto<TransactionDto | null>>(`${BASE_URL}`, dto, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.status !== HttpStatusEnum.CREATED) {
        throw new Error(response.message)
      }

      data = response.data
    } catch (e) {
      if (e instanceof Error && (e as Error).name === "AxiosError") {
        if ((e as AxiosError).status) {
          throw new Error("AxiosError:" + (e as AxiosError).message)
        }
      }

      throw new Error("Unable to create transaction: " + (e as Error).message)
    }

    return validateResponseData(data)
  },
  update: async (token: string, id: string, dto: TransactionUpdateDto): Promise<TransactionDto> => {
    let data: TransactionDto | null
    try {
      const { data: response } = await axios.patch<ResponseDto<TransactionDto | null>>(`${BASE_URL}/${id}`, dto, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.status !== HttpStatusEnum.OK) {
        throw new Error(response.message)
      }

      data = response.data
    } catch (e) {
      if (e instanceof Error && (e as Error).name === "AxiosError") {
        if ((e as AxiosError).status) {
          throw new Error("AxiosError: " + (e as AxiosError).message)
        }
      }

      throw new Error("Unable to update transaction.")
    }

    return validateResponseData(data)
  },
  delete: async (token: string, id: string): Promise<void> => {
    try {
      const { data: response } = await axios.delete<ResponseDto<null>>(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status !== HttpStatusEnum.OK) {
        throw new Error(response.message)
      }
    } catch (e) {
      if (e instanceof Error && (e as Error).name === "AxiosError") {
        if ((e as AxiosError).status) {
          throw new Error((e as AxiosError).message)
        }
      }

      throw new Error("Unable to delete transaction.")
    }
  },
}

const validateResponseData = (data: TransactionDto | null): TransactionDto => {
  const { data: transaction, success } = TransactionDtoSchema.safeParse(data)

  if (!success) {
    throw new Error("The server sent malformatted data. Please contact the website admin.")
  }

  return transaction
}

export default transactionService
