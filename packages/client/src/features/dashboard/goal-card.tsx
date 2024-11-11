import { Edit } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"

export function GoalCard() {
  return (
    <Card className="col-span-1 p-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-3xl text-black font-bold ">Vacation</p>
          <Edit />
        </div>

        <CardDescription className="pb-4">
          <CardTitle className="text-sm font-normal text-muted-foreground">Ends on November 11</CardTitle>
        </CardDescription>
        <Progress value={50} />
        <p className="text-sm font-normal text-muted-foreground pt-1 self-end">31.74%</p>
      </CardHeader>
    </Card>
  )
}
