import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { StatCard } from "./stat-card"
import { StatisticsCarousel } from "./statistics-carousel"
import { TimeRangeEnum } from "~/types/enums/time-range-enum"
import { statisticsCategories } from "~/types/constants/statistics-categories"

export function StatisticsCards() {
  return (
    <Tabs defaultValue={TimeRangeEnum.DAILY} className="col-span-full lg:px-8 lg:py-4 lg:h-64">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between pb-4">
        <StatisticsCarousel />
        <h1 className="text-lg lg:text-3xl font-bold lg:block hidden">Dashboard</h1>
        <TabsList className="grid w-full lg:w-[50%] mt-2 grid-cols-3 lg:place-self-end">
          <TabsTrigger value={TimeRangeEnum.DAILY}>Daily</TabsTrigger>
          <TabsTrigger value={TimeRangeEnum.WEEKLY}>Weekly</TabsTrigger>
          <TabsTrigger value={TimeRangeEnum.MONTHLY}>Monthly</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value={TimeRangeEnum.DAILY} className="4">
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 ">
          {statisticsCategories.map(category => (
            <StatCard key={category} statisticsCategory={category} timeRange={TimeRangeEnum.DAILY} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value={TimeRangeEnum.WEEKLY} className="hidden lg:grid lg:grid-cols-4 gap-4">
        {statisticsCategories.map(category => (
          <StatCard key={category} statisticsCategory={category} timeRange={TimeRangeEnum.WEEKLY} />
        ))}
      </TabsContent>
      <TabsContent value={TimeRangeEnum.MONTHLY} className="hidden lg:grid lg:grid-cols-4 gap-4 mt-[0.5px]">
        {statisticsCategories.map(category => (
          <StatCard key={category} statisticsCategory={category} timeRange={TimeRangeEnum.MONTHLY} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
