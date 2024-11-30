"use client"

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { TimeRangeEnumSchema, TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import { convertToTitleCase } from "~/lib/convertToTitleCase"
import { useRouter } from "next/navigation"
import { MobileStatWidget } from "./mobile-stat-widget"
import { StatCard } from "./stat-card"
import { NetIncomeChart } from "./charts/net-income-chart"
import { DistributionPieChart } from "./charts/distribution-pie-chart"

interface Props {
  initialTimeRange: TimeRangeEnum
}

export default function DashboardPageContent({ initialTimeRange }: Props) {
  const router = useRouter()

  const handleTimeRangeChange = (value: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set("time", value)

    // Push the updated URL search param without reloading
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <>
      <div className="flex justify-between w-full items-center mb-8 flex-col sm:flex-row gap-8 col-span-full">
        <h1 className="hidden sm:block text-3xl font-bold text-start">Dashboard</h1>
        <MobileStatWidget
          className="sm:hidden"
          title="Net income"
          value="$56,381"
          description="31.74% up since last week"
        />
        <Tabs className="sm:w-1/2 w-full" onValueChange={handleTimeRangeChange} defaultValue={initialTimeRange}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value={TimeRangeEnumSchema.Values.daily}>
              {convertToTitleCase(TimeRangeEnumSchema.Values.daily)}
            </TabsTrigger>
            <TabsTrigger value={TimeRangeEnumSchema.Values.weekly}>
              {convertToTitleCase(TimeRangeEnumSchema.Values.weekly)}
            </TabsTrigger>
            <TabsTrigger value={TimeRangeEnumSchema.Values.monthly}>
              {convertToTitleCase(TimeRangeEnumSchema.Values.monthly)}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <section className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map(i => (
          <StatCard key={i} timeRange={initialTimeRange} />
        ))}
      </section>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <section className="md:w-3/5">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Analytics</h2>
            <p className="text-muted-foreground text-sm">Overview of your financial performance</p>
          </div>
          <div className="grid gap-8">
            <NetIncomeChart />
            <DistributionPieChart />
          </div>
        </section>
        <div className="md:w-2/5 flex flex-col gap-8">
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Transactions</h2>
              <p className="text-muted-foreground text-sm">A summary of your recent activity</p>
            </div>
            <div></div>
          </section>
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Goals</h2>
              <p className="text-muted-foreground text-sm">Track your progress toward key milestones</p>
            </div>
            <div></div>
          </section>
        </div>
      </div>
    </>
  )
}
