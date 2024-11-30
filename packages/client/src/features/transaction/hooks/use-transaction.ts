import { TransactionDto } from "@budgeteer/types"
import transactionService from "../services/transaction-service"
import { RawTransactionCreateDto } from "~/types/entities/raw-transaction-create.dto"
import useAuth from "~/features/auth/hooks/use-auth"

export default function useTransaction() {
  const { authToken } = useAuth()

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
