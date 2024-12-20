import { Hono } from "hono"
import { createTransactionSchema, transactionIdSchema, updateTransactionSchema } from "./transactions-dto.router"
import { type TransactionCreateDto, type TransactionUpdateDto } from "@budgeteer/types"
import { TransactionUseCases } from "~/use-cases/transactions/transactions.use-cases"
import { authenticate } from "~/middleware/authenticate"
import { validator } from "hono/validator"
import { validateInput } from "../_utils/validate-input"

type Variables = {
  id: string
}

const transactions = new Hono<{ Variables: Variables }>()

transactions.use("*", authenticate)

transactions.get("/", async c => {
  const userId = c.get("id")

  const response = await TransactionUseCases.findByUserId(parseInt(userId))
  return c.json(response)
})

transactions.get(
  "/:id",
  validator("param", (value, _c) => validateInput(transactionIdSchema, value)),
  async c => {
    const userId = parseInt(c.get("id"))
    const id = c.req.param("id")

    const response = await TransactionUseCases.findById(parseInt(id), userId)
    return c.json(response)
  },
)

transactions.post(
  "/",
  validator("json", (value, _c) => validateInput(createTransactionSchema, value)),
  async c => {
    const { description, type, amount, category, date } = c.req.valid("json")
    const data: TransactionCreateDto = {
      description,
      type,
      amount,
      category,
      date,
      userId: parseInt(c.get("id")),
    }

    const response = await TransactionUseCases.create(data)
    return c.json(response)
  },
)

transactions.patch(
  "/:id",
  validator("param", (value, _c) => validateInput(transactionIdSchema, value)),
  validator("json", (value, _c) => validateInput(updateTransactionSchema, value)),
  async c => {
    const { id } = c.req.valid("param")
    const userId = parseInt(c.get("id"))
    const { description, type, amount, category, date } = c.req.valid("json")

    const data: TransactionUpdateDto = {
      ...(description !== undefined && { description }),
      ...(type !== undefined && { type }),
      ...(amount !== undefined && { amount }),
      ...(category !== undefined && { category }),
      ...(date !== undefined && { date }),
    }

    const response = await TransactionUseCases.update(id, userId, data)
    return c.json(response)
  },
)

transactions.delete(
  "/:id",
  validator("param", (value, _c) => validateInput(transactionIdSchema, value)),
  async c => {
    const { id } = c.req.valid("param")
    const userId = parseInt(c.get("id"))

    const response = await TransactionUseCases.delete(id, userId)
    return c.json(response)
  },
)

export default transactions
