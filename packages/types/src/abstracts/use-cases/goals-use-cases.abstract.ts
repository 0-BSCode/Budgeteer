import type { GoalDto } from "src/entities/goals/goal.dto"
import type { GoalCreateDto } from "src/entities/goals/goal-create.dto"
import type { GoalUpdateDto } from "src/entities/goals/goal-update.dto"
import type { ResponseDto } from "src/entities/response/response.dto"

export type IGoalUseCases = {
  findByUserId: (userId: number) => Promise<ResponseDto<GoalDto[]>>
  findById: (id: number, userId: number) => Promise<ResponseDto<GoalDto>>
  create: (dto: GoalCreateDto) => Promise<ResponseDto<GoalDto>>
  update: (id: number, userId: number, dto: GoalUpdateDto) => Promise<ResponseDto<GoalDto>>
  delete: (id: number, userId: number) => Promise<ResponseDto<void>>
}