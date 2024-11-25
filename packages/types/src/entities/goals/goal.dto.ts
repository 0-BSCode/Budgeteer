import { z } from "zod"
import { MAX_GOAL_DESCRIPTION_LENGTH, MIN_GOAL_AMOUNT } from "../../constants/db.constants"

export const GoalDtoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  amount: z.number().min(MIN_GOAL_AMOUNT),
  description: z.string().max(MAX_GOAL_DESCRIPTION_LENGTH),
  createdAt: z.coerce.date(),
  deadline: z.coerce.date(),
})

export type GoalDto = z.infer<typeof GoalDtoSchema>
