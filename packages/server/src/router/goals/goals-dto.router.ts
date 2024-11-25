import { GoalDtoSchema } from "@budgeteer/types"

export const goalIdSchema = GoalDtoSchema.pick({ id: true })

export const createGoalSchema = GoalDtoSchema.pick({
  description: true,
  userId: true,
  deadline: true,
  amount: true,
})

export const updateGoalSchema = createGoalSchema.partial()
