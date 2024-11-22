import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import {
  createTransactionSchema,
  transactionIdSchema,
  updateTransactionSchema,
  transactionQuerySchema,
} from "./transactions-dto.router"
import { type TransactionCreateDto, type TransactionQueryDto, type TransactionUpdateDto } from "@budgeteer/types"
import { TransactionUseCases } from "~/use-cases/transactions/transactions.use-cases"
import { authenticate } from "~/middleware/authenticate"

type Variables = {
  id: string
}

const transactionApi = new Hono<{ Variables: Variables }>()

transactionApi.use("*", authenticate)

transactionApi.get("/", async c => {
  const userId = c.get("id")

  const response = await TransactionUseCases.findByUserId(parseInt(userId))
  return c.json(response)
})

transactionApi.get("/:id", zValidator("param", transactionIdSchema), async c => {
  const id = c.req.param("id")

  const response = await TransactionUseCases.findById(parseInt(id))
  return c.json(response)
})

transactionApi.get("/query", zValidator("query", transactionQuerySchema), async c => {
  const userId = c.get("id")
  const query: Omit<TransactionQueryDto, "userId"> = c.req.valid("query")
  const data: TransactionQueryDto = {
    userId: parseInt(userId),
    ...(query.minAmount !== undefined && { minAmount: query.minAmount }),
    ...(query.maxAmount !== undefined && { maxAmount: query.maxAmount }),
    ...(query.startDate !== undefined && { startDate: query.startDate }),
    ...(query.endDate !== undefined && { endDate: query.endDate }),
    ...(query.type !== undefined && { type: query.type }),
    categories: query.categories,
    page: query.page,
    limit: query.limit,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  }

  const response = await TransactionUseCases.query(data)
  return c.json(response)
})

transactionApi.post("/", zValidator("json", createTransactionSchema), async c => {
  const { description, type, amount, category } = c.req.valid("json")
  const data: TransactionCreateDto = {
    description,
    type,
    amount,
    category,
    userId: parseInt(c.get("id")),
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
    const { description, type, amount, category } = c.req.valid("json")

    const data: TransactionUpdateDto = {
      ...(description !== undefined && { description }),
      ...(type !== undefined && { type }),
      ...(amount !== undefined && { amount }),
      ...(category !== undefined && { category }),
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
