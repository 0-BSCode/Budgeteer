import type { TransactionCategoryEnum } from "~/enums/transaction-category.enum"
import { TransactionTypeEnum } from "~/enums/transaction-type.enum"

export type TransactionDto = {
  id: number
  description: string
  type: TransactionTypeEnum
  category: TransactionCategoryEnum
  amount: number
  createdAt: Date
  updatedAt: Date
}
