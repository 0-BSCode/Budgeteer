import type { GoalDto } from "./goal.dto"

type OmittedFields = Pick<GoalDto, "id" | "createdAt">
export type GoalCreateDto = Omit<GoalDto, keyof OmittedFields>
