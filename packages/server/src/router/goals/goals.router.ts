import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { goalIdSchema, createGoalSchema, updateGoalSchema } from "./goals-dto.router"
import { type GoalCreateDto, type GoalUpdateDto } from "@budgeteer/types"
import { authenticate } from "~/middleware/authenticate"
import { GoalUseCases } from "~/use-cases/goals.use-cases.ts/goals.use-cases"

type Variables = {
  id: string
}

const goals = new Hono<{ Variables: Variables }>()

goals.use("*", authenticate)

goals.get("/", async c => {
  const userId = c.get("id")

  const response = await GoalUseCases.findAllUserGoals(parseInt(userId))
  return c.json(response)
})

goals.get("/:id", zValidator("param", goalIdSchema), async c => {
  const id = c.req.param("id")

  const response = await GoalsUseCases.findById(parseInt(id))
  return c.json(response)
})

goals.post("/", zValidator("json", createGoalSchema), async c => {
  const { description, deadline, amount } = c.req.valid("json")
  const data: GoalCreateDto = {
    description,
    deadline,
    amount,
    userId: parseInt(c.get("id")),
  }

  const response = await GoalsUseCases.create(data)
  return c.json(response)
})

goals.put("/:id", zValidator("param", goalIdSchema), zValidator("json", updateGoalSchema), async c => {
  const { id } = c.req.valid("param")
  const { description, deadline, amount } = c.req.valid("json")

  const data: GoalUpdateDto = {
    ...(description !== undefined && { description }),
    ...(deadline !== undefined && { deadline }),
    ...(amount !== undefined && { amount }),
  }

  const response = await GoalsUseCases.update(parseInt(id), data)
  return c.json(response)
})

goals.delete("/:id", zValidator("param", goalIdSchema), async c => {
  const { id } = c.req.valid("param")

  const response = await GoalsUseCases.delete(parseInt(id))
  return c.json(response)
})

export default goals
