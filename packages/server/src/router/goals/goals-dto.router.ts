import { GoalDtoSchema } from "@budgeteer/types"
import { z } from "zod"

export const goalIdSchema = z.object({
  id: z.coerce.number(),
})

export const createGoalSchema = GoalDtoSchema.partial()

export const updateGoalSchema = GoalDtoSchema.partial()
