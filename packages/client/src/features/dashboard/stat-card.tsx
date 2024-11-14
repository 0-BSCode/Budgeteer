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
        <CardTitle className="text-xs lg:text-sm font-normal text-muted-foreground">{statisticsCategory}</CardTitle>
        <CardDescription>
          <p className="text-2xl lg:text-3xl text-foreground font-bold pb-2">
            {statisticsCategory === StatisticsCategoryEnum.PENDING_GOALS ? "4" : "₱123.45"}
          </p>
          <p className="text-xs lg:text-sm font-normal text-muted-foreground">
            {statisticsCategory === StatisticsCategoryEnum.PENDING_GOALS
              ? "More goals need funding"
              : `31.74% up since ${getTimeRangeForCardDescription(timeRange)}`}
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
