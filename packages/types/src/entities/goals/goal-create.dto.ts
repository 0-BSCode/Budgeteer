import type { z } from "zod"
import { GoalDtoSchema } from "./goal.dto"

// type OmittedFields = Pick<GoalDto, "id" | "createdAt">

export const GoalCreateDtoSchema = GoalDtoSchema.omit({
  id: true,
  createdAt: true,
})

export type GoalCreateDto = z.infer<typeof GoalCreateDtoSchema>
