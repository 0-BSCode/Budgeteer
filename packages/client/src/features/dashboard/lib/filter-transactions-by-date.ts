import { TransactionDto } from "@budgeteer/types"
import dayjs from "dayjs"

export default function filterTransactionsByDate(
  transactions: TransactionDto[],
  startDate: Date,
  endDate: Date,
): TransactionDto[] {
  return transactions.filter(transaction => {
    const transactionDate = dayjs(transaction.date)
    return transactionDate.isBetween(startDate, endDate, null, "[]") // Include startDate and endDate
  })
}
