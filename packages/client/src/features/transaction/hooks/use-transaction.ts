import { TransactionDto } from "@budgeteer/types"
import transactionService from "../services/transaction-service"
import { useLocalStorage } from "usehooks-ts"
import { RawTransactionCreateDto } from "~/types/entities/raw-transaction-create.dto"

const AUTH_TOKEN_KEY = "auth-token"

export default function useTransaction() {
  const [authToken] = useLocalStorage<string | null>(AUTH_TOKEN_KEY, null)

  const create = async (dto: RawTransactionCreateDto): Promise<TransactionDto> => {
    if (!authToken) {
      throw new Error("You cannot create a transaction while authenticated! Please log in first.")
    }
    const transaction = await transactionService.create(authToken, dto)
    return transaction
  }

  return {
    create,
  }
}
