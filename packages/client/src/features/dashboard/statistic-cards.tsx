import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { StatCard } from "./stat-card"

export function StatisticsCards() {
  return (
    <Tabs defaultValue="account" className="col-span-full p-8 h-[20%]">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <TabsList className="grid w-[50%] grid-cols-3 place-self-end">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="passwords">Password</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="account" className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(() => (
          <StatCard key={Math.random()} />
        ))}
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, youll be logged out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
