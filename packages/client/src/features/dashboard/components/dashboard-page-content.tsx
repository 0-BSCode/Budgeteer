"use client"

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { TimeRangeEnumSchema, TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import { convertToTitleCase } from "~/lib/convertToTitleCase"
import { useRouter } from "next/navigation"
import StatWidget from "./stat-widget"
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
        <StatWidget className="sm:hidden" title="Net income" value="$56,381" description="31.74% up since last week" />
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
      <div className="flex gap-8">
        <section className="w-1/2 grid gap-8">
          <NetIncomeChart />
          <DistributionPieChart />
        </section>
        <section className="w-1/2">lorem1000</section>
      </div>
    </>
  )
}
