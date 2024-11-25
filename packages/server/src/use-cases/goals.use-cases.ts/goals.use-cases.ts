import {
  type ResponseDto,
  HttpStatusEnum,
  type IGoalUseCases,
  type GoalDto,
  type GoalUpdateDto,
  type GoalCreateDto,
} from "@budgeteer/types"
import { HTTPException } from "hono/http-exception"
import { DataService } from "~/services/data-service"
import { UsersUseCases } from "../users/users.use-cases"

export const GoalUseCases: IGoalUseCases = {
  async findAllUserGoals(userId: number): Promise<ResponseDto<GoalDto[]>> {
    await UsersUseCases.findById(userId)

    try {
      const goals = await DataService.goals.findAllUserGoals(userId)

      const response: ResponseDto<GoalDto[]> = {
        status: HttpStatusEnum.OK,
        data: goals,
      }

      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to fetch user goals" })
    }
  },
  async findById(id: number): Promise<ResponseDto<GoalDto>> {
    const goal = await DataService.goals.findById(id)
    if (!goal) {
      throw new HTTPException(HttpStatusEnum.NOT_FOUND, { message: "Goal not found" })
    }

    const response: ResponseDto<GoalDto> = {
      status: HttpStatusEnum.OK,
      data: goal,
    }

    return response
  },
  async create(dto: GoalCreateDto): Promise<ResponseDto<GoalDto>> {
    try {
      // Check if deadline is in the future (past the creation date)
      if (dto.deadline < new Date()) {
        throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: "Deadline must be in the future" })
      }

      const goal = await DataService.goals.create(dto)

      const response: ResponseDto<GoalDto> = {
        status: HttpStatusEnum.CREATED,
        data: goal,
      }
      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to create goal" })
    }
  },
  async update(id: number, dto: GoalUpdateDto): Promise<ResponseDto<GoalDto>> {
    const goal = await this.findById(id)

    if (dto.deadline) {
      if (dto.deadline < goal.createdAt) {
        throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: "Deadline must be in the future" })
      }
    }

    try {
      const goal = await DataService.goals.update(id, dto)

      const response: ResponseDto<GoalDto> = {
        status: HttpStatusEnum.OK,
        data: goal,
      }

      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to update goal" })
    }
  },
  async delete(id: number): Promise<ResponseDto<null>> {
    await this.findById(id)

    try {
      await DataService.goals.delete(id)

      const response: ResponseDto<null> = {
        status: HttpStatusEnum.OK,
        data: null,
      }

      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to delete goal" })
    }
  },
}
