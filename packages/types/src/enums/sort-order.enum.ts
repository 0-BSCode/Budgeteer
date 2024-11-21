import { z } from "zod"

export const SortOrderEnum = {
  ASC: "ASC",
  DESC: "DESC",
}

export const SortOrderEnumSchema = z.enum([SortOrderEnum.ASC, SortOrderEnum.DESC])
