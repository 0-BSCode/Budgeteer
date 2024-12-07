import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { goalIdSchema, createGoalSchema, updateGoalSchema } from "./goals-dto.router"
import { type GoalCreateDto, type GoalUpdateDto } from "@budgeteer/types"
import { authenticate } from "~/middleware/authenticate"
import { GoalUseCases } from "~/use-cases/goals/goals.use-cases"

type Variables = {
  id: string
}

const goals = new Hono<{ Variables: Variables }>()

goals.use("*", authenticate)

goals.get("/", async c => {
  const userId = c.get("id")

  const response = await GoalUseCases.findByUserId(parseInt(userId))
  return c.json(response)
})

goals.get("/:id", zValidator("param", goalIdSchema), async c => {
  const { id } = c.req.valid("param")
  const userId = parseInt(c.get("id"))

  const response = await GoalUseCases.findById(id, userId)
  return c.json(response)
})

goals.post("/", zValidator("json", createGoalSchema), async c => {
  const { description, amount, deadline } = c.req.valid("json")
  const data: GoalCreateDto = {
    description,
    deadline,
    amount,
    userId: parseInt(c.get("id")),
    isAccomplished: false,
  }

  const response = await GoalUseCases.create(data)
  return c.json(response)
})

goals.patch("/:id", zValidator("param", goalIdSchema), zValidator("json", updateGoalSchema), async c => {
  const { id } = c.req.valid("param")
  const userId = parseInt(c.get("id"))
  const { description, deadline, amount, isAccomplished } = c.req.valid("json")
  console.log("API -------------------")
  console.log(isAccomplished)
  const data: GoalUpdateDto = {
    ...(description !== undefined && { description }),
    ...(deadline !== undefined && { deadline }),
    ...(amount !== undefined && { amount }),
    ...(isAccomplished !== undefined && { isAccomplished }),
  }

  const response = await GoalUseCases.update(id, userId, data)
  return c.json(response)
})

goals.delete("/:id", zValidator("param", goalIdSchema), async c => {
  const { id } = c.req.valid("param")
  const userId = parseInt(c.get("id"))

  const response = await GoalUseCases.delete(id, userId)
  return c.json(response)
})

export default goals
