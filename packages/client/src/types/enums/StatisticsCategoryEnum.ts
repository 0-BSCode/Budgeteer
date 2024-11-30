import { z } from "zod"

export const StatisticsCategoryEnumSchema = z.enum(["Net Income", "Income", "Expenses", "Pending Goals"])

export type StatisticsCategoryEnum = z.infer<typeof StatisticsCategoryEnumSchema>
