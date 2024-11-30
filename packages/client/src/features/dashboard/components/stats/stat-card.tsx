import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { TimeRangeEnumSchema, TimeRangeEnum } from "~/types/enums/TimeRangeEnum"

interface StatCardProps {
  timeRange: TimeRangeEnum
}

export function StatCard({ timeRange }: StatCardProps) {
  const getTimeRangeForCardDescription = (timeRange: TimeRangeEnum) => {
    switch (timeRange) {
      case TimeRangeEnumSchema.Values.daily:
        return "yesterday"
      case TimeRangeEnumSchema.Values.weekly:
        return "last week"
      case TimeRangeEnumSchema.Values.monthly:
        return "last month"
      default:
        return "last time"
    }
  }

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="text-xs lg:text-sm font-normal text-muted-foreground">Something</CardTitle>
        <CardDescription>
          <p className="text-2xl lg:text-3xl text-foreground font-bold pb-2">₱123.45</p>
          <p className="text-xs lg:text-sm font-normal text-muted-foreground">
            31.74% up since {getTimeRangeForCardDescription(timeRange)}
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
