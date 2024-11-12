import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { StatCard } from "./stat-card"
import { StatisticsCarousel } from "./statistics-carousel"

export function StatisticsCards() {
  return (
    <Tabs defaultValue="daily" className="col-span-full px-8 lg:py-4 h-64">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-4">
        <StatisticsCarousel />
        <h1 className="text-lg lg:text-3xl font-bold lg:block hidden">Dashboard</h1>
        <TabsList className="grid lg:w-[50%] grid-cols-3 lg:place-self-end">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="daily" className="4">
        <div className="hidden lg:grid lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(() => (
            <StatCard key={Math.random()} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="weekly" className="grid grid-cols-4 gap-4 mt-[-0.5px]">
        {[1, 2, 3, 4].map(() => (
          <StatCard key={Math.random()} />
        ))}
      </TabsContent>
      <TabsContent value="monthly" className="grid grid-cols-4 gap-4 mt-[-0.5px]">
        {[1, 2, 3, 4].map(() => (
          <StatCard key={Math.random()} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
