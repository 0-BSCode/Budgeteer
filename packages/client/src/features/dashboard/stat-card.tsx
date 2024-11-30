import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { StatisticsCategoryEnum } from "~/types/enums/statistics-category-enum"
import { TimeRangeEnum } from "~/types/enums/time-range-enum"

interface StatCardProps {
  timeRange: TimeRangeEnum
  statisticsCategory: StatisticsCategoryEnum
}

export function StatCard({ timeRange, statisticsCategory }: StatCardProps) {
  const getTimeRangeForCardDescription = (TimeRange: TimeRangeEnum) => {
    return TimeRange === TimeRangeEnum.DAILY
      ? "yesterday"
      : TimeRange === TimeRangeEnum.WEEKLY
        ? "last week"
        : "last month"
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">{statisticsCategory}</CardTitle>
        <CardDescription>
          <p className="pb-2 text-2xl font-bold text-foreground lg:text-3xl">
            {statisticsCategory === StatisticsCategoryEnum.PENDING_GOALS ? "4" : "₱123.45"}
          </p>
          <p className="text-xs font-normal text-muted-foreground lg:text-sm">
            {statisticsCategory === StatisticsCategoryEnum.PENDING_GOALS
              ? "More goals need funding"
              : `31.74% up since ${getTimeRangeForCardDescription(timeRange)}`}
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
