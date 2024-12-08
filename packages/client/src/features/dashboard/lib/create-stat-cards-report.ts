import { TransactionDto } from "@budgeteer/types"
import { StatCardsReport } from "../types/StatCardsReport"
import { TimeRangeEnumSchema, TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import { formatValueWithPeso } from "~/features/transaction/lib/format-value-with-peso"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import filterTransactionsByDate from "./filter-transactions-by-date"
dayjs.extend(isBetween)

interface Args {
  transactions: TransactionDto[]
  timeRange: TimeRangeEnum
}

interface ReportArgs {
  transactions: TransactionDto[]
  previousStart: Date
  previousEnd: Date
  currentStart: Date
  currentEnd: Date
}

function calculatePercentDifference(current: number, previous: number): number {
  if (previous === 0) {
    return current === 0 ? 0 : current > 0 ? 100 : -100
  }
  return ((current - previous) / previous) * 100
}

function calculateNetIncomeReport({ transactions, previousStart, previousEnd, currentStart, currentEnd }: ReportArgs) {
  const previousTransactions = filterTransactionsByDate(transactions, previousStart, previousEnd)
  const currentTransactions = filterTransactionsByDate(transactions, currentStart, currentEnd)

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

function calculateIncomeReport({ transactions, previousStart, previousEnd, currentStart, currentEnd }: ReportArgs) {
  const previousTransactions = filterTransactionsByDate(transactions, previousStart, previousEnd)
  const currentTransactions = filterTransactionsByDate(transactions, currentStart, currentEnd)

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

function calculateExpensesReport({ transactions, previousStart, previousEnd, currentStart, currentEnd }: ReportArgs) {
  const previousTransactions = filterTransactionsByDate(transactions, previousStart, previousEnd)
  const currentTransactions = filterTransactionsByDate(transactions, currentStart, currentEnd)

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
  const now = dayjs() // Get current date using Day.js

  let previousStart: dayjs.Dayjs
  let previousEnd: dayjs.Dayjs
  let currentStart: dayjs.Dayjs
  let currentEnd: dayjs.Dayjs

  switch (timeRange) {
    case TimeRangeEnumSchema.Values.daily:
      currentStart = now.startOf("day") // Set to the beginning of today (00:00:00)
      currentEnd = now.endOf("day") // Set to the end of today (23:59:59)

      previousStart = now.subtract(1, "day").startOf("day") // Start of yesterday (00:00:00)
      previousEnd = now.subtract(1, "day").endOf("day") // End of yesterday (23:59:59)
      break

    case TimeRangeEnumSchema.Values.weekly:
      currentStart = now.subtract(7, "days") // Last week
      currentEnd = now

      previousStart = now.subtract(14, "days") // Two weeks ago
      previousEnd = now.subtract(8, "days") // One week before last week
      break

    case TimeRangeEnumSchema.Values.monthly:
      currentStart = now.subtract(1, "month") // Last month
      currentEnd = now

      previousStart = now.subtract(2, "months") // Two months ago
      previousEnd = now.subtract(1, "month") // One month before last month
      break

    default:
      throw new Error("Invalid time range.")
  }

  const netIncomeReport = calculateNetIncomeReport({
    transactions,
    previousStart: previousStart.toDate(),
    previousEnd: previousEnd.toDate(),
    currentStart: currentStart.toDate(),
    currentEnd: currentEnd.toDate(),
  })

  const incomeReport = calculateIncomeReport({
    transactions,
    previousStart: previousStart.toDate(),
    previousEnd: previousEnd.toDate(),
    currentStart: currentStart.toDate(),
    currentEnd: currentEnd.toDate(),
  })

  const expensesReport = calculateExpensesReport({
    transactions,
    previousStart: previousStart.toDate(),
    previousEnd: previousEnd.toDate(),
    currentStart: currentStart.toDate(),
    currentEnd: currentEnd.toDate(),
  })

  return [netIncomeReport, incomeReport, expensesReport]
}
