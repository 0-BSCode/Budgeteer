import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import dayjs from "dayjs"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { calculateIncomeBeforeDeadline } from "../../lib/calculate-goal-progress"
import { GoalDto } from "@budgeteer/types"
import { GoalCardHeader } from "./goal-card-header"

interface GoalCardProps {
  goalsList: GoalDto[]
  goal: GoalDto
}

export function GoalCard({ goal, goalsList }: GoalCardProps) {
  const { id, amount, deadline, isAccomplished } = goal
  const { transactions } = useTransactionContext()

  const netIncome = calculateIncomeBeforeDeadline(id, amount, goalsList, transactions || [], deadline)

  const progressPercentage = (netIncome / amount) * 100

  return (
    <Card className={isAccomplished ? "rounded-md opacity-50" : "rounded-md"}>
      <CardHeader className="p-4">
        <GoalCardHeader goal={goal} />
        <CardDescription className="pb-4">
          <CardTitle className="text-sm font-normal text-muted-foreground">
            Ends on {dayjs(deadline).format("MMMM D, YYYY")}
          </CardTitle>
        </CardDescription>
        <Progress value={progressPercentage} />
        <p className="self-end pb-2 pt-1 text-sm font-normal text-muted-foreground">
          ₱{netIncome} / ₱{amount} <span className="text-foreground">({progressPercentage.toFixed(2)}%)</span>
        </p>
      </CardHeader>
    </Card>
  )
}
