import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { createTransactionSchema, transactionIdSchema, updateTransactionSchema } from "./transactions-dto.router"
import type { TransactionCreateDto, TransactionUpdateDto } from "@budgeteer/types"
import { TransactionUseCases } from "~/use-cases/transactions/transactions.use-cases"

// TODO: Protect routes and check per user
const transactionApi = new Hono()

// TODO: Implement (fetch all transactions per user)
transactionApi.get("/", async c => {
  return c.text("Hello World!")
})

transactionApi.get("/:id", zValidator("param", transactionIdSchema), async c => {
  const id = c.req.param("id")

  const response = await TransactionUseCases.findById(parseInt(id))
  return c.json(response)
})

transactionApi.post("/", zValidator("json", createTransactionSchema), async c => {
  const { description, type, amount } = c.req.valid("json")
  const data: TransactionCreateDto = {
    description,
    type,
    amount,
  }

  const response = await TransactionUseCases.create(data)
  return c.json(response)
})

transactionApi.put(
  "/:id",
  zValidator("param", transactionIdSchema),
  zValidator("json", updateTransactionSchema),
  async c => {
    const { id } = c.req.valid("param")
    const { description, type, amount } = c.req.valid("json")

    const data: TransactionUpdateDto = {
      description,
      type,
      amount,
    }

    const response = await TransactionUseCases.update(parseInt(id), data)
    return c.json(response)
  },
)

transactionApi.delete("/:id", zValidator("param", transactionIdSchema), async c => {
  const { id } = c.req.valid("param")

  const response = await TransactionUseCases.delete(parseInt(id))
  return c.json(response)
})

export default transactionApi
