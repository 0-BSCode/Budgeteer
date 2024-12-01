import { TimeRangeEnum, TimeRangeEnumSchema } from "~/types/enums/TimeRangeEnum"

export function getStatDescription(percent: number, timeRange: TimeRangeEnum): string {
  if (percent === 0) {
    return "There was no change"
  }

  const changeDirection = percent > 0 ? "up" : "down"

  const formattedPercent = percent.toFixed(0)

  let timeRangeLabel: string
  switch (timeRange) {
    case TimeRangeEnumSchema.Values.daily:
      timeRangeLabel = "yesterday"
      break
    case TimeRangeEnumSchema.Values.weekly:
      timeRangeLabel = "last week"
      break
    case TimeRangeEnumSchema.Values.monthly:
      timeRangeLabel = "last month"
      break
    default:
      timeRangeLabel = "last time"
  }

  return `${formattedPercent}% ${changeDirection} since ${timeRangeLabel}`
}
