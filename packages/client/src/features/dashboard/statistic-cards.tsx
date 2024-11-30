import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { StatCard } from "./stat-card"
import { StatisticsCarousel } from "./statistics-carousel"
import { TimeRangeEnum } from "~/types/enums/time-range-enum"
import { statisticsCategories } from "~/types/constants/statistics-categories"

export function StatisticsCards() {
  return (
    <Tabs defaultValue={TimeRangeEnum.DAILY} className="col-span-full lg:h-64 lg:px-8 lg:py-4">
      <div className="flex flex-col items-center justify-center pb-4 lg:flex-row lg:justify-between">
        <StatisticsCarousel />
        <h1 className="hidden text-lg font-bold lg:block lg:text-3xl">Dashboard</h1>
        <TabsList className="mt-2 grid w-full grid-cols-3 lg:w-[50%] lg:place-self-end">
          <TabsTrigger value={TimeRangeEnum.DAILY}>Daily</TabsTrigger>
          <TabsTrigger value={TimeRangeEnum.WEEKLY}>Weekly</TabsTrigger>
          <TabsTrigger value={TimeRangeEnum.MONTHLY}>Monthly</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value={TimeRangeEnum.DAILY} className="4">
        <div className="hidden gap-4 lg:grid lg:grid-cols-4">
          {statisticsCategories.map(category => (
            <StatCard key={category} statisticsCategory={category} timeRange={TimeRangeEnum.DAILY} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value={TimeRangeEnum.WEEKLY} className="hidden gap-4 lg:grid lg:grid-cols-4">
        {statisticsCategories.map(category => (
          <StatCard key={category} statisticsCategory={category} timeRange={TimeRangeEnum.WEEKLY} />
        ))}
      </TabsContent>
      <TabsContent value={TimeRangeEnum.MONTHLY} className="mt-[0.5px] hidden gap-4 lg:grid lg:grid-cols-4">
        {statisticsCategories.map(category => (
          <StatCard key={category} statisticsCategory={category} timeRange={TimeRangeEnum.MONTHLY} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
