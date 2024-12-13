import { TransactionDto } from "@budgeteer/types"
import { TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"
dayjs.extend(isoWeek)

export function groupTransactionsByTimeRange(
  transactions: TransactionDto[],
  timeRange: TimeRangeEnum,
): { day: string; "Net Income": number }[] {
  if (!transactions || transactions.length === 0) return []

  const groupedData: Record<string, number> = {}

  transactions.forEach(transaction => {
    const date = dayjs(transaction.date)

    let key: string
    if (timeRange === "daily") {
      key = date.format("YYYY-MM-DD") // YYYY-MM-DD
    } else if (timeRange === "weekly") {
      key = date.startOf("isoWeek").format("YYYY-MM-DD") // Start of the ISO week
    } else if (timeRange === "monthly") {
      key = date.format("YYYY-MM") // YYYY-MM
    } else {
      throw new Error("Invalid time range")
    }

    groupedData[key] =
      (groupedData[key] || 0) + (transaction.type === "INCOME" ? transaction.amount : -transaction.amount)
  })

  return Object.entries(groupedData).map(([key, value]) => ({
    day: key,
    "Net Income": value,
  }))
}
