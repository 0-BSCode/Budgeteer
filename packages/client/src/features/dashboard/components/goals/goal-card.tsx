import { Edit } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Button } from "~/components/ui/button"
import Link from "next/link"

interface GoalCardProps {
  description: string
  deadline: string
  amount: number
}

export function GoalCard({ description, deadline, amount }: GoalCardProps) {
  return (
    <Card className="rounded-md">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between lg:w-full">
          <p className="font-bold text-foreground lg:text-xl">{description}</p>
          <Button className="relative -right-2 -top-1" variant="ghost" size="icon" asChild>
            <Link href="#">
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <CardDescription className="pb-4">
          <CardTitle className="text-sm font-normal text-muted-foreground">Ends on {deadline}</CardTitle>
        </CardDescription>
        <Progress value={50} />
        <p className="self-end pt-1 text-sm font-normal text-muted-foreground">
          ₱123.45 / ₱{amount} <span className="text-foreground">(31.74%)</span>
        </p>
      </CardHeader>
    </Card>
  )
}
