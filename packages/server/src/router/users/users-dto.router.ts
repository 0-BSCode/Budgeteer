import { z } from "zod"

export const patchUserSchema = z.object({
  profile_picture_url: z.string().max(255),
})
