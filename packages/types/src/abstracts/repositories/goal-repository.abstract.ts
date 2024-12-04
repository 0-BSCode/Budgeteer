import type { GoalDto } from "../../entities/goals/goal.dto"
import type { GoalCreateDto } from "../../entities/goals/goal-create.dto"
import type { GoalUpdateDto } from "../../entities/goals/goal-update.dto"

export type IGoalRepository = {
  findByUserId: (userId: number) => Promise<GoalDto[]>
  findById: (id: number) => Promise<GoalDto>
  create: (dto: GoalCreateDto) => Promise<GoalDto>
  update: (id: number, dto: GoalUpdateDto) => Promise<GoalDto>
  delete: (id: number) => Promise<void>
  convertToDto: (data: unknown) => GoalDto
}
