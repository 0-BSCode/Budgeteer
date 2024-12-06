import { TransactionDto } from "@budgeteer/types"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import filterTransactionsByDate from "./filter-transactions-by-date"
dayjs.extend(isBetween)

export function calculateIncomeInDateRange(transactions: TransactionDto[], startDate: Date, endDate: Date): number {
  return filterTransactionsByDate(transactions, startDate, endDate)
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0)
}
