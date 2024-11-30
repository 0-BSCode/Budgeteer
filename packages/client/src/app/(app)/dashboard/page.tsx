import { Metadata } from "next"
import DashboardPageContent from "~/features/dashboard/dashboard-page-content"
import { TimeRangeEnumSchema } from "~/types/enums/TimeRangeEnum"

export const metadata: Metadata = {
  title: "Dashboard | Budgeteer",
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const timeSearchParam = (await searchParams).time
  const { success, data } = TimeRangeEnumSchema.safeParse(timeSearchParam)
  const timeRange = success ? data : TimeRangeEnumSchema.Values.daily

  return (
    <div className="col-span-full">
      <DashboardPageContent initialTimeRange={timeRange} />
    </div>
  )
}
