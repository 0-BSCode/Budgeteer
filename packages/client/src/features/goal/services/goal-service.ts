import { z } from "zod"
import { GoalDto, GoalDtoSchema, GoalUpdateDto, ResponseDto } from "@budgeteer/types"
import axios from "axios"
import config from "~/lib/config"
import { RawGoalCreateDto } from "~/types/entities/raw-goal-create.dto"

const BASE_URL = `${config.NEXT_PUBLIC_API_BASE_URL}/goals`

const goalService = {
  getByUserId: async (token: string): Promise<GoalDto[]> => {
    const { data: response } = await axios.get<ResponseDto<GoalDto>>(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data: goals, success } = z.array(GoalDtoSchema).safeParse(response.data)

    if (!success) {
      throw new Error("The server sent malformatted data. Please contact the website admin.")
    }

    return goals
  },
  getById: async (token: string, id: string): Promise<GoalDto> => {
    const { data: response } = await axios.get<ResponseDto<GoalDto>>(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const goal = validateResponseData(response.data)

    return goal
  },
  create: async (token: string, dto: RawGoalCreateDto): Promise<GoalDto> => {
    const { data: response } = await axios.post<ResponseDto<GoalDto>>(`${BASE_URL}`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const goal = validateResponseData(response.data)

    return goal
  },
  update: async (token: string, id: string, dto: GoalUpdateDto): Promise<GoalDto> => {
    const { data: response } = await axios.patch<ResponseDto<GoalDto>>(`${BASE_URL}/${id}`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const goal = validateResponseData(response.data)

    return goal
  },
  delete: async (token: string, id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

const validateResponseData = (data: GoalDto): GoalDto => {
  const { data: goal, success } = GoalDtoSchema.safeParse(data)

  if (!success) {
    throw new Error("The server sent malformatted data. Please contact the website admin.")
  }

  return goal
}

export default goalService
