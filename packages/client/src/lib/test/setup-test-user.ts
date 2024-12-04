import { ExpenseCategoryEnumValues, TransactionDto, TransactionTypeEnumValues } from "@budgeteer/types"
import authService from "~/features/auth/services/auth-service"
import transactionService from "~/features/transaction/services/transaction-service"

export function createRandomString(): string {
  return Math.random().toString().slice(2, 10)
}

export const sharedUserTestState = {
  token: "",
  username: "",
  password: "",
}

export const sharedTransactionTestState: TransactionDto = {
  id: 0,
  amount: 0,
  description: "",
  date: new Date(),
  category: ExpenseCategoryEnumValues.OTHER,
  type: TransactionTypeEnumValues.EXPENSE,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 0,
}

export async function setupTestUser() {
  if (!sharedUserTestState.token) {
    const username = `test${Math.random().toString().slice(2, 10)}`
    const password = "12345678"
    const token = await authService.register(username, password)

    sharedUserTestState.token = token
    sharedUserTestState.username = username
    sharedUserTestState.password = password

    const transaction = await transactionService.create(sharedUserTestState.token, {
      amount: sharedTransactionTestState.amount,
      description: sharedTransactionTestState.description,
      date: sharedTransactionTestState.date,
      category: sharedTransactionTestState.category,
      type: sharedTransactionTestState.type,
    })

    sharedTransactionTestState.id = transaction.id
    sharedTransactionTestState.userId = transaction.userId
    sharedTransactionTestState.createdAt = transaction.createdAt
    sharedTransactionTestState.updatedAt = transaction.updatedAt

    return
  }
}

// TODO: Add function to delete generated test data from db
