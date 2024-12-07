import { Hono } from "hono"
import { goalIdSchema, createGoalSchema, updateGoalSchema } from "./goals-dto.router"
import { type GoalCreateDto, type GoalUpdateDto } from "@budgeteer/types"
import { authenticate } from "~/middleware/authenticate"
import { GoalUseCases } from "~/use-cases/goals/goals.use-cases"
import { validator } from "hono/validator"
import { validateInput } from "../_utils/validate-input"

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

goals.get(
  "/:id",
  validator("param", (value, _c) => validateInput(goalIdSchema, value)),
  async c => {
    const { id } = c.req.valid("param")
    const userId = parseInt(c.get("id"))

    const response = await GoalUseCases.findById(id, userId)
    return c.json(response)
  },
)

goals.post(
  "/",
  validator("json", (value, _c) => validateInput(createGoalSchema, value)),
  async c => {
    const { description, amount } = c.req.valid("json")
    const data: GoalCreateDto = {
      description,
      deadline: new Date(),
      amount,
      userId: parseInt(c.get("id")),
    }

    const response = await GoalUseCases.create(data)
    return c.json(response)
  },
)

goals.patch(
  "/:id",
  validator("param", (value, _c) => validateInput(goalIdSchema, value)),
  validator("json", (value, _c) => validateInput(updateGoalSchema, value)),
  async c => {
    const { id } = c.req.valid("param")
    const userId = parseInt(c.get("id"))
    const { description, deadline, amount } = c.req.valid("json")

    const data: GoalUpdateDto = {
      ...(description !== undefined && { description }),
      ...(deadline !== undefined && { deadline }),
      ...(amount !== undefined && { amount }),
    }

    const response = await GoalUseCases.update(id, userId, data)
    return c.json(response)
  },
)

goals.delete(
  "/:id",
  validator("param", (value, _c) => validateInput(goalIdSchema, value)),
  async c => {
    const { id } = c.req.valid("param")
    const userId = parseInt(c.get("id"))

    const response = await GoalUseCases.delete(id, userId)
    return c.json(response)
  },
)

export default goals
