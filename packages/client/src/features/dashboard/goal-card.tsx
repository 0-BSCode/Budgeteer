import { Edit } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"

interface GoalCardProps {
  title: string
  deadline: string
}

export function GoalCard({ title, deadline }: GoalCardProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex w-32 items-center justify-between lg:w-full">
          <p className="font-bold text-foreground lg:text-xl">{title}</p>
          <Edit className="h-4 w-4" />
        </div>

        <CardDescription className="pb-2 lg:pb-2">
          <CardTitle className="text-xs font-normal text-muted-foreground">Ends on {deadline}</CardTitle>
        </CardDescription>
        <Progress value={50} />
        <p className="self-end pt-1 text-sm font-normal text-muted-foreground">31.74%</p>
      </CardHeader>
    </Card>
  )
}
