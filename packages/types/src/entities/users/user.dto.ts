import { z } from "zod"

export const UserDtoSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  profile_picture: z.string(),
  createdAt: z.date(),
})

export type UserDto = z.infer<typeof UserDtoSchema>
