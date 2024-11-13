import { z } from "zod"
import { UserDtoSchema } from "./user.dto"

export const UserUpdateDtoSchema = UserDtoSchema.partial()

export type UserUpdateDto = z.infer<typeof UserUpdateDtoSchema>
