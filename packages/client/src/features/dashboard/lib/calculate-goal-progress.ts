import { TransactionDto } from "@budgeteer/types"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
dayjs.extend(isBetween)

export function calculateIncomeBeforeDeadline(transactions: TransactionDto[], startDate: Date, endDate: Date): number {
  const netIncome =
    transactions.filter(t => t.type === "INCOME" && new Date(t.date) <= endDate).reduce((sum, t) => sum + t.amount, 0) -
    transactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0)

  return netIncome
}
