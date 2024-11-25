import { z } from "zod"
import { MAX_GOAL_DESCRIPTION_LENGTH, MIN_GOAL_AMOUNT } from "../../constants/db.constants"
import { SortOrderEnum, SortOrderEnumSchema } from "../../enums/sort-order.enum"
import { TransactionSortColumnEnum, TransactionSortColumnEnumSchema } from "../../enums/transaction-sort-column.enum"

export const GoalDtoSchema = z
  .object({
    id: z.number(),
    userId: z.number(),
    amount: z.number().min(MIN_GOAL_AMOUNT),
    description: z.string().max(MAX_GOAL_DESCRIPTION_LENGTH),
    createdAt: z.date(),
    deadline: z.date(),
  })
  .refine(data => data.deadline > data.createdAt, {
    message: "Deadline must come after creation date",
    path: ["deadline"],
  })

export const GoalQueryDtoSchema = z.object({
  // User ID
  userId: z.number(),

  // Amount filter
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),

  // Date filter
  startDate: z.date().optional(),
  deadline: z.date().optional(),

  // Pagination
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),

  // Sorting
  sortBy: TransactionSortColumnEnumSchema.default(TransactionSortColumnEnum.DATE),
  sortOrder: SortOrderEnumSchema.default(SortOrderEnum.ASC),
})

export type GoalDto = z.infer<typeof GoalDtoSchema>
export type GoalQueryDto = z.infer<typeof GoalQueryDtoSchema>
