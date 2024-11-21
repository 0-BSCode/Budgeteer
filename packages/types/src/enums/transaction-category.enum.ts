import { z } from "zod"

export const IncomeCategoryEnum = {
  ALLOWANCE: "ALLOWANCE",
  SALARY: "SALARY",
  BONUS: "BONUS",
  OTHER: "OTHER",
} as const

export const ExpenseCategoryEnum = {
  FOOD: "FOOD",
  ENTERTAINMENT: "ENTERTAINMENT",
  TRANSPORTATION: "TRANSPORTATION",
  UTILITIES: "UTILITIES",
  OTHER: "OTHER",
}

export const IncomeCategoryEnumSchema = z.enum([
  IncomeCategoryEnum.ALLOWANCE,
  IncomeCategoryEnum.SALARY,
  IncomeCategoryEnum.BONUS,
  IncomeCategoryEnum.OTHER,
])
export const ExpenseCategoryEnumSchema = z.enum([
  ExpenseCategoryEnum.FOOD,
  ExpenseCategoryEnum.ENTERTAINMENT,
  ExpenseCategoryEnum.TRANSPORTATION,
  ExpenseCategoryEnum.UTILITIES,
  ExpenseCategoryEnum.OTHER,
])
export const TransactionCategoryEnumSchema = z.union([IncomeCategoryEnumSchema, ExpenseCategoryEnumSchema])
