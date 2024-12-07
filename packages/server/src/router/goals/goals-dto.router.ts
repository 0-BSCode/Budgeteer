import { GoalDtoSchema } from "@budgeteer/types"
import { z } from "zod"

export const goalIdSchema = z.object({
  id: z.coerce.number(),
})

export const createGoalSchema = GoalDtoSchema.pick({
  description: true,
  amount: true,
  deadline: true,
})

export const updateGoalSchema = GoalDtoSchema.partial()
