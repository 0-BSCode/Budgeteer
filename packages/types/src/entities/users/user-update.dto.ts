import { z } from "zod"
import { UserDtoSchema } from "./user.dto"

export const UserUpdateDtoSchema = UserDtoSchema.pick({ username: true, password: true })

export type UserUpdateDto = z.infer<typeof UserUpdateDtoSchema>
