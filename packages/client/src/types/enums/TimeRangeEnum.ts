import { z } from "zod"

export const TimeRangeEnumSchema = z.enum(["daily", "weekly", "monthly"])

export type TimeRangeEnum = z.infer<typeof TimeRangeEnumSchema>
