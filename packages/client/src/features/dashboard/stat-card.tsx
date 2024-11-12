import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export function StatCard() {
  return (
    <Card className="col-span-1 ">
      <CardHeader>
        <CardTitle className="text-xs lg:text-sm font-normal text-muted-foreground">Net Income</CardTitle>
        <CardDescription>
          <p className="text-2xl lg:text-3xl text-foreground font-bold pb-2">₱123.45</p>
          <p className="text-xs lg:text-sm font-normal text-muted-foreground">31.74% up since last week</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
