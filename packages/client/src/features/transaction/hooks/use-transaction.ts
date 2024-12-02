import { TransactionDto, TransactionUpdateDto } from "@budgeteer/types"
import transactionService from "../services/transaction-service"
import { RawTransactionCreateDto } from "~/types/entities/raw-transaction-create.dto"
import useAuth from "~/features/auth/hooks/use-auth"
import { useCallback } from "react"

export default function useTransaction() {
  const { authToken } = useAuth()

  const create = async (dto: RawTransactionCreateDto): Promise<TransactionDto> => {
    if (!authToken) {
      throw new Error("You cannot create a transaction while unauthenticated! Please log in first.")
    }

    const transaction = await transactionService.create(authToken, dto)
    return transaction
  }

  const getTransaction = async (id: string): Promise<TransactionDto> => {
    if (!authToken) {
      throw new Error("You cannot fetch transactions while unauthenticated! Please log in first.")
    }

    const transaction = await transactionService.getById(authToken, id)
    return transaction
  }

  const getAllTransactions = useCallback(async (): Promise<TransactionDto[]> => {
    if (!authToken) {
      throw new Error("You cannot fetch transactions while unauthenticated! Please log in first.")
    }

    const transactions = await transactionService.getAll(authToken)

    return transactions
  }, [authToken])

  const update = async (id: string, dto: TransactionUpdateDto): Promise<TransactionDto> => {
    if (!authToken) {
      throw new Error("You cannot update a transaction while unauthenticated! Please log in first.")
    }

    const transaction = await transactionService.update(authToken, id, dto)
    return transaction
  }

  const remove = async (id: string): Promise<void> => {
    if (!authToken) {
      throw new Error("You cannot delete a transaction while unauthenticated! Please log in first.")
    }

    await transactionService.delete(authToken, id)
  }

  return {
    create,
    getAllTransactions,
    getTransaction,
    update,
    remove,
  }
}
