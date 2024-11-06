import { TransactionTypeEnum } from "~/enums/transaction-type.enum"

export type TransactionDto = {
  id: number
  description: string
  type: TransactionTypeEnum
  amount: number
  createdAt: Date
  updatedAt: Date
}
