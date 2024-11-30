import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { StatCard } from "./stat-card"
import { StatisticsCarousel } from "./statistics-carousel"
import { TimeRangeEnumSchema } from "~/types/enums/TimeRangeEnum"
import { statisticsCategories } from "~/types/constants/statistics-categories"

export function StatisticsCards() {
  return (
    <Tabs defaultValue={TimeRangeEnumSchema.Values.daily} className="col-span-full lg:px-8 lg:py-4 lg:h-64">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between pb-4">
        <StatisticsCarousel />
        <h1 className="text-lg lg:text-3xl font-bold lg:block hidden">Dashboard</h1>
        <TabsList className="grid w-full lg:w-[50%] mt-2 grid-cols-3 lg:place-self-end">
          <TabsTrigger value={TimeRangeEnumSchema.Values.daily}>Daily</TabsTrigger>
          <TabsTrigger value={TimeRangeEnumSchema.Values.weekly}>Weekly</TabsTrigger>
          <TabsTrigger value={TimeRangeEnumSchema.Values.monthly}>Monthly</TabsTrigger>
        </TabsList>
      </div>
      <div>
        <TabsContent value={TimeRangeEnumSchema.Values.daily}>
          <div className="hidden lg:grid lg:grid-cols-4 gap-4">
            {statisticsCategories.map(category => (
              <StatCard key={category} statisticsCategory={category} timeRange={TimeRangeEnumSchema.Values.daily} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value={TimeRangeEnumSchema.Values.weekly} className="hidden lg:grid lg:grid-cols-4 gap-4">
          {statisticsCategories.map(category => (
            <StatCard key={category} statisticsCategory={category} timeRange={TimeRangeEnumSchema.Values.weekly} />
          ))}
        </TabsContent>
        <TabsContent
          value={TimeRangeEnumSchema.Values.monthly}
          className="hidden lg:grid lg:grid-cols-4 gap-4 mt-[0.5px]"
        >
          {statisticsCategories.map(category => (
            <StatCard key={category} statisticsCategory={category} timeRange={TimeRangeEnumSchema.Values.monthly} />
          ))}
        </TabsContent>
      </div>
    </Tabs>
  )
}
