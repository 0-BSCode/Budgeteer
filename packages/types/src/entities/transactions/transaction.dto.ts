import { z } from "zod"
import { TransactionTypeEnumSchema } from "../../enums/transaction-type.enum"
import { TransactionCategoryEnumSchema } from "../../enums/transaction-category.enum"
import { MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_DESCRIPTION_LENGTH } from "../../constants/db.constants"
import { SortOrderEnum, SortOrderEnumSchema } from "../../enums/sort-order.enum"
import { TransactionSortColumnEnum, TransactionSortColumnEnumSchema } from "../../enums/transaction-sort-column.enum"

export const TransactionDtoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  description: z.string().max(MAX_TRANSACTION_DESCRIPTION_LENGTH),
  type: TransactionTypeEnumSchema,
  category: TransactionCategoryEnumSchema,
  amount: z.number().min(MIN_TRANSACTION_AMOUNT),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const TransactionQueryDtoSchema = z.object({
  // User ID
  userId: z.number(),

  // Type and category filter
  type: TransactionTypeEnumSchema.optional(),
  categories: z.array(TransactionCategoryEnumSchema).default([]),

  // Amount filter
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),

  // Date filter
  startDate: z.date().optional(),
  endDate: z.date().optional(),

  // Pagination
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),

  // Sorting
  sortBy: TransactionSortColumnEnumSchema.default(TransactionSortColumnEnum.DATE),
  sortOrder: SortOrderEnumSchema.default(SortOrderEnum.ASC),
})

export type TransactionDto = z.infer<typeof TransactionDtoSchema>
export type TransactionQueryDto = z.infer<typeof TransactionQueryDtoSchema>
