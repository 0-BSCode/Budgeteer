import { GoalDto, TransactionDto } from "@budgeteer/types"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
dayjs.extend(isBetween)

export function calculateIncomeBeforeDeadline(
  currentGoalId: number,
  currentGoalAmount: number,
  goals: GoalDto[],
  transactions: TransactionDto[],
  deadline: Date,
): number {
  const remainingGoals = goals.filter(goal => goal.id !== currentGoalId)

  let remainingNetIncome =
    transactions
      .filter(t => t.type === "INCOME" && new Date(t.date) <= deadline)
      .reduce((sum, t) => sum + t.amount, 0) -
    transactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0)

  for (const goal of remainingGoals) {
    // Subtract the amount of the previously set goal if it is not accomplished
    if (new Date(goal.deadline) < deadline && !goal.isAccomplished) {
      remainingNetIncome -= goal.amount
    }
  }

  // Ensure no overflow when remainingNetIncome surpasses the current goal amount
  return remainingNetIncome < 0 ? 0 : remainingNetIncome > currentGoalAmount ? currentGoalAmount : remainingNetIncome
}
