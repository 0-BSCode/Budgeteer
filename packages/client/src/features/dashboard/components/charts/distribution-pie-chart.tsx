"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { TimeRangeEnum, TimeRangeEnumSchema } from "~/types/enums/TimeRangeEnum"
import dayjs from "dayjs"

const chartConfig = {
  ALLOWANCE: {
    label: "Allowance",
    color: "hsl(var(--chart-1))",
  },
  SALARY: {
    label: "Salary",
    color: "hsl(var(--chart-2))",
  },
  BONUS: {
    label: "Bonus",
    color: "hsl(var(--chart-3))",
  },
  OTHER: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

interface Props {
  timeRange: TimeRangeEnum
}

function calculateTimeRange(timeRange: TimeRangeEnum): { startDate: Date; endDate: Date } {
  const now = dayjs()
  switch (timeRange) {
    case TimeRangeEnumSchema.Values.daily:
      return { startDate: now.startOf("day").toDate(), endDate: now.endOf("day").toDate() }
    case TimeRangeEnumSchema.Values.weekly:
      return { startDate: now.startOf("week").toDate(), endDate: now.endOf("week").toDate() }
    case TimeRangeEnumSchema.Values.monthly:
      return { startDate: now.startOf("month").toDate(), endDate: now.endOf("month").toDate() }
    default:
      throw new Error("Invalid time range")
  }
}

export function DistributionPieChart({ timeRange }: Props) {
  const { transactions } = useTransactionContext()

  const { startDate, endDate } = calculateTimeRange(timeRange)

  const filteredTransactions =
    transactions?.filter(
      t =>
        dayjs(t.date).isBetween(startDate, endDate, "day", "[]") &&
        ["ALLOWANCE", "SALARY", "BONUS", "OTHER"].includes(t.category) &&
        t.amount > 0,
    ) ?? []

  const groupedData = filteredTransactions.reduce<Record<string, number>>((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
    return acc
  }, {})

  const chartData = Object.entries(groupedData).map(([category, amount]) => ({
    category,
    visitors: amount,
    fill: chartConfig[category as keyof typeof chartConfig]?.color,
  }))

  const formatToPhp = (value: number) => `₱${value.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Income Distribution</CardTitle>
        <CardDescription>Visualizing your income sources</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[216px] w-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => chartConfig[value as keyof typeof chartConfig]?.label}
            />
            <XAxis dataKey="visitors" type="number" tickFormatter={formatToPhp} hide={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={undefined}
                  formatter={value => formatToPhp(Number(value))}
                  hideLabel
                />
              }
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        {chartData.length > 0 ? (
          <p className="ml-auto text-sm text-muted-foreground">
            {dayjs(startDate).isSame(dayjs(endDate), "month")
              ? dayjs(startDate).format("MMMM YYYY") // Single month
              : `${dayjs(startDate).format("MMM YYYY")} - ${dayjs(endDate).format("MMM YYYY")}`}{" "}
          </p>
        ) : (
          <p className="ml-auto text-sm text-muted-foreground">No data available</p>
        )}
      </CardFooter>
    </Card>
  )
}
