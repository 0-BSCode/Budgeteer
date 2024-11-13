import { z } from "zod"
import { UserDtoSchema } from "./user.dto"

export const UserCreateDtoSchema = UserDtoSchema.pick({ username: true, password: true })

export type UserCreateDto = z.infer<typeof UserCreateDtoSchema>
