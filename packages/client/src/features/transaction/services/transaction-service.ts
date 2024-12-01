import { z } from "zod"
import { ResponseDto, TransactionDto, TransactionDtoSchema } from "@budgeteer/types"
import axios from "axios"
import config from "~/lib/config"
import { RawTransactionCreateDto } from "~/types/entities/raw-transaction-create.dto"

const BASE_URL = `${config.NEXT_PUBLIC_API_BASE_URL}/transactions`

const transactionService = {
  getAll: async (token: string): Promise<TransactionDto[]> => {
    const { data: response } = await axios.get<ResponseDto<TransactionDto>>(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data: transactions, success } = z.array(TransactionDtoSchema).safeParse(response.data)

    if (!success) {
      throw new Error("The server sent malformatted data. Please contact the website admin.")
    }

    return transactions
  },
  create: async (token: string, dto: RawTransactionCreateDto): Promise<TransactionDto> => {
    const { data: response } = await axios.post<ResponseDto<TransactionDto>>(`${BASE_URL}`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const { data: transaction, success } = TransactionDtoSchema.safeParse(response.data)

    if (!success) {
      throw new Error("The server sent malformatted data. Please contact the website admin.")
    }

    return transaction
  },
}

export default transactionService
