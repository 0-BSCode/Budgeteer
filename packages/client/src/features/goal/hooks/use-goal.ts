import { GoalDto, GoalUpdateDto } from "@budgeteer/types"
import goalService from "../services/goal-service"
import useAuth from "~/features/auth/hooks/use-auth"
import { useCallback } from "react"
import { RawGoalCreateDto } from "~/types/entities/raw-goal-create.dto"

export default function useGoal() {
  const { authToken } = useAuth()

  const create = async (dto: RawGoalCreateDto): Promise<GoalDto> => {
    if (!authToken) {
      throw new Error("You cannot create a goal while unauthenticated! Please log in first.")
    }

    const goal = await goalService.create(authToken, dto)
    return goal
  }

  const getGoal = async (id: string): Promise<GoalDto> => {
    if (!authToken) {
      throw new Error("You cannot fetch goals while unauthenticated! Please log in first.")
    }

    const goal = await goalService.getById(authToken, id)
    return goal
  }

  const getAllGoals = useCallback(async (): Promise<GoalDto[]> => {
    if (!authToken) {
      throw new Error("You cannot fetch goals while unauthenticated! Please log in first.")
    }

    const goals = await goalService.getByUserId(authToken)

    return goals
  }, [authToken])

  const update = async (id: string, dto: GoalUpdateDto): Promise<GoalDto> => {
    if (!authToken) {
      throw new Error("You cannot update a goal while unauthenticated! Please log in first.")
    }

    const goal = await goalService.update(authToken, id, dto)

    return goal
  }

  const remove = async (id: string): Promise<void> => {
    if (!authToken) {
      throw new Error("You cannot delete a goal while unauthenticated! Please log in first.")
    }

    await goalService.delete(authToken, id)
  }

  return {
    create,
    getAllGoals,
    getGoal,
    update,
    remove,
  }
}
