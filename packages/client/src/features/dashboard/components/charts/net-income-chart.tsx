"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { TimeRangeEnum, TimeRangeEnumSchema } from "~/types/enums/TimeRangeEnum"
import { groupTransactionsByTimeRange } from "../../lib/group-transactions-by-time-range"
import dayjs from "dayjs"

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
    case TimeRangeEnumSchema.Values.daily:
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

  const dataPoints = groupTransactionsByTimeRange(transactions ?? [], timeRange).sort((a, b) =>
    dayjs(a.day).diff(dayjs(b.day)),
  )

  // Current time range total
  const currentTotal = dataPoints.reduce((acc, point) => acc + point["Net Income"], 0)

  // Previous time range
  const { startDate, endDate } = calculatePreviousRange(timeRange)
  const previousTransactions = transactions?.filter(t => dayjs(t.date).isBetween(startDate, endDate, "day", "[]")) ?? []
  const previousDataPoints = groupTransactionsByTimeRange(previousTransactions, timeRange)
  const previousTotal = previousDataPoints.reduce((acc, point) => acc + point["Net Income"], 0)

  // Calculate trend
  const trend = ((currentTotal - previousTotal) / (previousTotal || 1)) * 100 // Avoid division by zero
  const isTrendingUp = trend >= 0

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Net Income</CardTitle>
        <CardDescription>
          <div className="ml-auto flex items-center gap-2 text-sm font-medium leading-none text-muted-foreground dark:text-primary">
            {isTrendingUp ? (
              <>
                Trending up by {trend.toFixed(1)}% <TrendingUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Trending down by {Math.abs(trend).toFixed(1)}% <TrendingDown className="h-4 w-4" />
              </>
            )}
          </div>
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
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => dayjs(value).format("MMM DD")}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent labelFormatter={label => dayjs(label).format("MMM DD, YYYY")} indicator="dot" />
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
          <p className="ml-auto text-sm text-muted-foreground">
            {dayjs(dataPoints[0].day).isSame(dayjs(dataPoints[dataPoints.length - 1].day), "month")
              ? dayjs(dataPoints[0].day).format("MMMM YYYY")
              : `${dayjs(dataPoints[0].day).format("MMM YYYY")} - ${dayjs(dataPoints[dataPoints.length - 1].day).format("MMM YYYY")}`}
          </p>
        ) : (
          <p className="ml-auto text-sm text-muted-foreground">No data available</p>
        )}
      </CardFooter>
    </Card>
  )
}
