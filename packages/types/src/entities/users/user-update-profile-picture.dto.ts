import { z } from "zod"
import { UserDtoSchema } from "./user.dto"

export const UserUpdateProfilePictureDtoSchema = UserDtoSchema.partial()

export type UserUpdateProfilePictureDto = z.infer<typeof UserUpdateProfilePictureDtoSchema>
