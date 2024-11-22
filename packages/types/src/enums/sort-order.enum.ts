import { z } from "zod"

export const SortOrderEnum = {
  ASC: "ASC",
  DESC: "DESC",
} as const

export const SortOrderEnumSchema = z.enum([SortOrderEnum.ASC, SortOrderEnum.DESC])
