import { GoalCreateDtoSchema } from "@budgeteer/types"
import { z } from "zod"

export const RawGoalCreateDtoSchema = GoalCreateDtoSchema.omit({
  userId: true,
  isAccomplished: true,
})
export type RawGoalCreateDto = z.infer<typeof RawGoalCreateDtoSchema>
