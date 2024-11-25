import { UserDtoSchema } from "@budgeteer/types"

export const patchUserProfilePictureSchema = UserDtoSchema.pick({ profile_picture: true })
export const patchUserSchema = UserDtoSchema.pick({ username: true, password: true })
