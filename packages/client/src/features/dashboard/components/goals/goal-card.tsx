import { Check, MoreVertical } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import dayjs from "dayjs"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { calculateIncomeBeforeDeadline } from "../../lib/calculate-goal-progress"
import useGoal from "~/features/goal/hooks/use-goal"
import { useGoalContext } from "~/features/goal/providers/goal-provider"
import { GoalDto } from "@budgeteer/types"
import { Checkbox } from "~/components/ui/checkbox"

interface GoalCardProps {
  goal: GoalDto
}

export function GoalCard({ goal }: GoalCardProps) {
  const { id, description, amount, deadline, createdAt, isAccomplished } = goal

  const { transactions } = useTransactionContext()
  const { update, remove } = useGoal()
  const { invalidateGoalCache } = useGoalContext()

  const handleMarkAsDone = async () => {
    await update(id.toString(), { ...goal, isAccomplished: !isAccomplished })

    invalidateGoalCache()
  }

  const progressPercentage = (calculateIncomeBeforeDeadline(transactions || [], createdAt, deadline) / amount) * 100

  return (
    <Card className={isAccomplished ? "rounded-md opacity-50" : "rounded-md"}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between lg:w-full">
          <div className="flex items-center gap-2">
            <Checkbox checked={isAccomplished} onCheckedChange={handleMarkAsDone} />
            <p className={`font-bold text-foreground lg:text-xl ${isAccomplished && "line-through"}`}>{description}</p>
          </div>
          <div className="flex gap-2">
            <Button className="" variant="outline" size="icon" asChild>
              <Link href={`/goal/${id}`}>
                <MoreVertical className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <CardDescription className="pb-4">
          <CardTitle className="text-sm font-normal text-muted-foreground">
            Ends on {dayjs(deadline).format("MMMM D, YYYY")}
          </CardTitle>
        </CardDescription>
        <Progress value={progressPercentage} />
        <p className="self-end pb-2 pt-1 text-sm font-normal text-muted-foreground">
          ₱{calculateIncomeBeforeDeadline(transactions || [], createdAt, deadline)} / ₱{amount}{" "}
          <span className="text-foreground">({progressPercentage.toFixed(2)}%)</span>
        </p>
      </CardHeader>
    </Card>
  )
}
