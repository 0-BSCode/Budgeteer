import { z } from "zod"
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MAX_PROFILE_PIC_LENGTH,
} from "@budgeteer/types"

export const UserDtoSchema = z.object({
  id: z.number(),
  username: z
    .string()
    .min(MIN_USERNAME_LENGTH)
    .max(MAX_USERNAME_LENGTH)
    .regex(/^[a-zA-Z0-9]+$/),
  password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  profile_picture: z.string().max(MAX_PROFILE_PIC_LENGTH),
  createdAt: z.coerce.date(),
})

export const UserPublicDtoSchema = UserDtoSchema.omit({ password: true })

export type UserDto = z.infer<typeof UserDtoSchema>
export type UserPublicDto = z.infer<typeof UserPublicDtoSchema>
