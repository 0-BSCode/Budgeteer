import type { z } from "zod"
import { GoalDtoSchema } from "./goal.dto"

export const GoalCreateDtoSchema = GoalDtoSchema.omit({
  id: true,
  createdAt: true,
  isAccomplished: true,
})

export type GoalCreateDto = z.infer<typeof GoalCreateDtoSchema>
