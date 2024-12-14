"use client"

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { TimeRangeEnumSchema, TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import { convertToTitleCase } from "~/lib/convert-to-title-case"
import { useRouter } from "next/navigation"
import { NetIncomeChart } from "./charts/net-income-chart"
import { DistributionPieChart } from "./charts/distribution-pie-chart"
import { MobileStatCarousel } from "./stats/mobile-stat-carousel"
import { TransactionSection } from "./transactions/transaction-section"
import { DashboardSectionHeading } from "./dashboard-section-heading"
import { GoalSection } from "./goals/goal-section"
import { StatCardGridSection } from "./stats/stat-card-grid-section"

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
      <div className="col-span-full mb-8 flex w-full flex-col items-center justify-between gap-8 overflow-hidden sm:flex-row">
        <h1 className="hidden text-start text-3xl font-bold sm:block">Dashboard</h1>
        <MobileStatCarousel className="sm:hidden" timeRange={initialTimeRange} />
        <Tabs className="w-full sm:w-1/2" onValueChange={handleTimeRangeChange} defaultValue={initialTimeRange}>
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
      <StatCardGridSection timeRange={initialTimeRange} />
      <div className="flex flex-col gap-8 md:flex-row lg:gap-12">
        <section className="md:w-3/5">
          <DashboardSectionHeading title="Analytics 📊" description="Overview of your financial performance" />
          <div className="grid gap-8">
            <NetIncomeChart timeRange={initialTimeRange} />
            <DistributionPieChart timeRange={initialTimeRange} />
          </div>
        </section>
        <div className="flex flex-col gap-8 md:w-2/5">
          <TransactionSection />
          <GoalSection />
        </div>
      </div>
    </>
  )
}
