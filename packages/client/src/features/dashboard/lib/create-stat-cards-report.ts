import { TransactionDto } from "@budgeteer/types"
import { StatCardsReport } from "../types/StatCardsReport"
import { TimeRangeEnumSchema, TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import { formatValueWithPeso } from "~/features/transaction/lib/format-value-with-peso"

interface Args {
  transactions: TransactionDto[]
  timeRange: TimeRangeEnum
}

function calculatePercentDifference(current: number, previous: number): number {
  if (previous === 0) {
    return current === 0 ? 0 : current > 0 ? 100 : -100
  }
  return ((current - previous) / previous) * 100
}

function filterTransactionsByDate(transactions: TransactionDto[], startDate: Date, endDate: Date): TransactionDto[] {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date)
    return transactionDate >= startDate && transactionDate < endDate
  })
}

function calculateNetIncomeReport(transactions: TransactionDto[], start: Date, previousStart: Date) {
  const currentTransactions = filterTransactionsByDate(transactions, start, new Date())
  const previousTransactions = filterTransactionsByDate(transactions, previousStart, start)

  const netIncomeCurrent =
    currentTransactions.filter(t => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0) -
    currentTransactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0)

  const netIncomePrevious =
    previousTransactions.filter(t => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0) -
    previousTransactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0)

  return {
    title: "Net income",
    value: formatValueWithPeso(netIncomeCurrent),
    percentDifference: calculatePercentDifference(netIncomeCurrent, netIncomePrevious),
  }
}

function calculateIncomeReport(transactions: TransactionDto[], start: Date, previousStart: Date) {
  const currentTransactions = filterTransactionsByDate(transactions, start, new Date())
  const previousTransactions = filterTransactionsByDate(transactions, previousStart, start)

  const totalIncomeCurrent = currentTransactions.filter(t => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0)

  const totalIncomePrevious = previousTransactions
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    title: "Income",
    value: formatValueWithPeso(totalIncomeCurrent),
    percentDifference: calculatePercentDifference(totalIncomeCurrent, totalIncomePrevious),
  }
}

function calculateExpensesReport(transactions: TransactionDto[], start: Date, previousStart: Date) {
  const currentTransactions = filterTransactionsByDate(transactions, start, new Date())
  const previousTransactions = filterTransactionsByDate(transactions, previousStart, start)

  const totalExpenseCurrent = currentTransactions
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpensePrevious = previousTransactions
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    title: "Expenses",
    value: formatValueWithPeso(totalExpenseCurrent),
    percentDifference: calculatePercentDifference(totalExpenseCurrent, totalExpensePrevious),
  }
}

export function createStatCardsReport({ transactions, timeRange }: Args): StatCardsReport {
  const now = new Date()

  let startDate: Date
  let previousStartDate: Date

  switch (timeRange) {
    case TimeRangeEnumSchema.Values.daily:
      startDate = new Date(now)
      startDate.setDate(now.getDate() - 1) // yesterday
      previousStartDate = new Date(now)
      previousStartDate.setDate(now.getDate() - 2) // day before yesterday
      break
    case TimeRangeEnumSchema.Values.weekly:
      startDate = new Date(now)
      startDate.setDate(now.getDate() - 7) // last week
      previousStartDate = new Date(now)
      previousStartDate.setDate(now.getDate() - 14) // two weeks ago
      break
    case TimeRangeEnumSchema.Values.monthly:
      startDate = new Date(now)
      startDate.setMonth(now.getMonth() - 1) // last month
      previousStartDate = new Date(now)
      previousStartDate.setMonth(now.getMonth() - 2) // two months ago
      break
    default:
      throw new Error("Invalid time range.")
  }

  const netIncomeReport = calculateNetIncomeReport(transactions, startDate, previousStartDate)
  const incomeReport = calculateIncomeReport(transactions, startDate, previousStartDate)
  const expensesReport = calculateExpensesReport(transactions, startDate, previousStartDate)

  return [netIncomeReport, incomeReport, expensesReport]
}
