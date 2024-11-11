import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { StatCard } from "./stat-card"

export function StatisticsCards() {
  return (
    <Tabs defaultValue="daily" className="col-span-full px-8 py-4 h-72">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <TabsList className="grid w-[50%] grid-cols-3 place-self-end">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="daily" className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(() => (
          <StatCard key={Math.random()} />
        ))}
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
