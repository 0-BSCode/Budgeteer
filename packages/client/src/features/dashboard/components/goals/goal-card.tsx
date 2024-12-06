import { Edit } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import dayjs from "dayjs"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { calculateIncomeInDateRange } from "../../lib/calculate-goal-progress"

interface GoalCardProps {
  id: number
  description: string
  deadline: Date
  amount: number
  createdAt: Date
}

export function GoalCard({ id, createdAt, description, deadline, amount }: GoalCardProps) {
  const { transactions } = useTransactionContext()

  const progressPercentage = (calculateIncomeInDateRange(transactions || [], createdAt, deadline) / amount) * 100

  console.log(progressPercentage)

  return (
    <Card className="rounded-md">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between lg:w-full">
          <p className="font-bold text-foreground lg:text-xl">{description}</p>
          <Button className="relative -right-2 -top-1" variant="ghost" size="icon" asChild>
            <Link href={`/goal/${id}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <CardDescription className="pb-4">
          <CardTitle className="text-sm font-normal text-muted-foreground">
            Ends on {dayjs(deadline).format("MMMM D, YYYY")}
          </CardTitle>
        </CardDescription>
        <Progress value={progressPercentage} />
        <p className="self-end pt-1 text-sm font-normal text-muted-foreground">
          ₱{calculateIncomeInDateRange(transactions || [], createdAt, deadline)} / ₱{amount}{" "}
          <span className="text-foreground">({progressPercentage.toFixed(2)}%)</span>
        </p>
      </CardHeader>
    </Card>
  )
}
