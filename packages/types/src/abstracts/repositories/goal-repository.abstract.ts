import type { GoalDto } from "src/entities/goals/goal.dto"
import type { GoalCreateDto } from "src/entities/goals/goal-create.dto"
import type { GoalUpdateDto } from "src/entities/goals/goal-update.dto"

export type IGoalRepository = {
  findAllUserGoals: (userId: number) => Promise<GoalDto[]>
  findById: (id: number) => Promise<GoalDto | null>
  create: (dto: GoalCreateDto) => Promise<GoalDto>
  update: (id: number, dto: GoalUpdateDto) => Promise<GoalDto>
  delete: (id: number) => Promise<void>
  convertToDto: (data: unknown) => GoalDto
}
