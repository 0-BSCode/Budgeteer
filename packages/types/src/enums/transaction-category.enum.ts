import { z } from "zod"

export const IncomeCategoryEnumValues = {
  ALLOWANCE: "ALLOWANCE",
  SALARY: "SALARY",
  BONUS: "BONUS",
  OTHER: "OTHER",
} as const

export const ExpenseCategoryEnumValues = {
  FOOD: "FOOD",
  ENTERTAINMENT: "ENTERTAINMENT",
  TRANSPORTATION: "TRANSPORTATION",
  UTILITIES: "UTILITIES",
  OTHER: "OTHER",
} as const

export const IncomeCategoryEnumSchema = z.enum([
  IncomeCategoryEnumValues.ALLOWANCE,
  IncomeCategoryEnumValues.SALARY,
  IncomeCategoryEnumValues.BONUS,
  IncomeCategoryEnumValues.OTHER,
])
export const ExpenseCategoryEnumSchema = z.enum([
  ExpenseCategoryEnumValues.FOOD,
  ExpenseCategoryEnumValues.ENTERTAINMENT,
  ExpenseCategoryEnumValues.TRANSPORTATION,
  ExpenseCategoryEnumValues.UTILITIES,
  ExpenseCategoryEnumValues.OTHER,
])
export const TransactionCategoryEnumSchema = z.union([IncomeCategoryEnumSchema, ExpenseCategoryEnumSchema])
export type TransactionCategoryEnum = z.infer<typeof TransactionCategoryEnumSchema>
