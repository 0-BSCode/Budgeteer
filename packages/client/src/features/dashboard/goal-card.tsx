import { Edit } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"

interface GoalCardProps {
  title: string
  deadline: string
}

export function GoalCard({ title, deadline }: GoalCardProps) {
  return (
    <Card className="col-span-1 ">
      <CardHeader>
        <div className="flex items-center justify-between w-32 lg:w-full">
          <p className="lg:text-xl text-foreground font-bold">{title}</p>
          <Edit className="w-4 h-4" />
        </div>

        <CardDescription className="pb-2 lg:pb-2">
          <CardTitle className="text-xs font-normal text-muted-foreground">Ends on {deadline}</CardTitle>
        </CardDescription>
        <Progress value={50} />
        <p className="text-sm font-normal text-muted-foreground pt-1 self-end">31.74%</p>
      </CardHeader>
    </Card>
  )
}
