"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { TimeRangeEnum, TimeRangeEnumSchema } from "~/types/enums/TimeRangeEnum"
import { groupTransactionsByTimeRange } from "../../lib/group-transactions-by-time-range"
import dayjs from "dayjs"
import { cn } from "~/lib/utils"
import { formatValueWithPeso } from "~/features/transaction/lib/format-value-with-peso"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

interface Props {
  timeRange: TimeRangeEnum
}

function calculatePreviousRange(timeRange: TimeRangeEnum): { startDate: Date; endDate: Date } {
  const now = dayjs()
  switch (timeRange) {
    case TimeRangeEnumSchema.Values.daily:
      return { startDate: now.subtract(2, "day").toDate(), endDate: now.subtract(1, "day").toDate() }
    case TimeRangeEnumSchema.Values.weekly:
      return { startDate: now.subtract(2, "week").toDate(), endDate: now.subtract(1, "week").toDate() }
    case TimeRangeEnumSchema.Values.monthly:
      return {
        startDate: now.subtract(2, "month").startOf("month").toDate(),
        endDate: now.subtract(1, "month").endOf("month").toDate(),
      }
    default:
      throw new Error("Invalid time range")
  }
}

export function NetIncomeChart({ timeRange }: Props) {
  const { transactions } = useTransactionContext()

  const now = dayjs()
  let startDate: dayjs.Dayjs
  let endDate: dayjs.Dayjs
  let footerMessage: string

  switch (timeRange) {
    case TimeRangeEnumSchema.Values.daily:
      startDate = now.startOf("day")
      endDate = now.endOf("day")
      footerMessage = `Today, ${startDate.format("MMMM DD, YYYY")}`
      break
    case TimeRangeEnumSchema.Values.weekly:
      startDate = now.subtract(6, "days").startOf("day")
      endDate = now.endOf("day")
      footerMessage = "Last 7 days"
      break
    case TimeRangeEnumSchema.Values.monthly:
      startDate = now.startOf("month")
      endDate = now.endOf("month")
      footerMessage = startDate.format("MMMM YYYY")
      break
    default:
      throw new Error("Invalid time range")
  }

  // Filter transactions based on the current time range
  const filteredTransactions = transactions?.filter(t => dayjs(t.date).isBetween(startDate, endDate, "day", "[]")) ?? []

  // Group and sort the filtered transactions by day
  const dataPoints = groupTransactionsByTimeRange(filteredTransactions, timeRange).sort((a, b) =>
    dayjs(a.time).diff(dayjs(b.time)),
  )

  // Calculate the current total
  const currentTotal = dataPoints.reduce((acc, point) => acc + point["Net Income"], 0)

  // Calculate the previous time range and total
  const previousRange = calculatePreviousRange(timeRange)
  const previousTransactions =
    transactions?.filter(t => dayjs(t.date).isBetween(previousRange.startDate, previousRange.endDate, "day", "[]")) ??
    []
  const previousDataPoints = groupTransactionsByTimeRange(previousTransactions, timeRange)
  const previousTotal = previousDataPoints.reduce((acc, point) => acc + point["Net Income"], 0)

  // Calculate trend
  const trend = ((currentTotal - previousTotal) / (previousTotal || 1)) * 100
  const isTrendingUp = trend >= 0

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Net Income</CardTitle>
        <CardDescription>
          {currentTotal === previousTotal ? (
            <div className="ml-auto flex items-center gap-2 text-sm font-medium leading-none text-muted-foreground">
              Your net income over time
            </div>
          ) : (
            <div
              className={cn(
                "ml-auto flex items-center gap-2 text-sm font-medium leading-none",
                isTrendingUp ? "text-primary" : "text-destructive",
              )}
            >
              {isTrendingUp ? (
                <>
                  Trending up by {formatValueWithPeso(Number(trend.toFixed(1)))}% <TrendingUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Trending down by {formatValueWithPeso(Number(Math.abs(trend).toFixed(1)))}%{" "}
                  <TrendingDown className="h-4 w-4" />
                </>
              )}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[216px] w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={dataPoints}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value =>
                timeRange === TimeRangeEnumSchema.Values.daily
                  ? dayjs(value).format("HH:mm")
                  : timeRange === TimeRangeEnumSchema.Values.weekly
                    ? dayjs(value).format("MMM DD")
                    : dayjs(value).format("MMM DD")
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={label =>
                    timeRange === TimeRangeEnumSchema.Values.daily
                      ? dayjs(label).format("HH:mm")
                      : dayjs(label).format("MMM DD")
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Net Income"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        {dataPoints.length > 0 ? (
          <p className="ml-auto text-sm text-muted-foreground">{footerMessage}</p>
        ) : (
          <p className="ml-auto text-sm text-muted-foreground">No data available</p>
        )}
      </CardFooter>
    </Card>
  )
}
