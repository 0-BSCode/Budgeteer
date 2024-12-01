import { z } from "zod"

export const StatCardsReportSchema = z.array(
  z.object({
    title: z.string(),
    value: z.string(),
    percentDifference: z.number(), // positive indicates 'up' while negative indicates 'down'
  }),
)

export type StatCardsReport = z.infer<typeof StatCardsReportSchema>
