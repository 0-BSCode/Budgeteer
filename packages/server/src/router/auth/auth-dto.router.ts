import { z } from "zod"

export const authRequestSchema = z.object({
  username: z
    .string()
    .max(30)
    .regex(/^[a-zA-Z0-9]+$/),
  password: z.string(),
})
