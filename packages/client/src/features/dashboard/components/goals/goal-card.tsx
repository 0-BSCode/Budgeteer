import { Edit } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Button } from "~/components/ui/button"
import Link from "next/link"

interface GoalCardProps {
  title: string
  deadline: string
}

export function GoalCard({ title, deadline }: GoalCardProps) {
  return (
    <Card className="rounded-md">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between lg:w-full">
          <p className="lg:text-xl text-foreground font-bold">{title}</p>
          <Button className="relative -right-2 -top-1" variant="ghost" size="icon" asChild>
            <Link href="#">
              <Edit className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <CardDescription className="pb-4">
          <CardTitle className="text-sm font-normal text-muted-foreground">Ends on {deadline}</CardTitle>
        </CardDescription>
        <Progress value={50} />
        <p className="text-sm font-normal text-muted-foreground pt-1 self-end">
          ₱123.45 / ₱123.45 <span className="text-foreground">(31.74%)</span>
        </p>
      </CardHeader>
    </Card>
  )
}
