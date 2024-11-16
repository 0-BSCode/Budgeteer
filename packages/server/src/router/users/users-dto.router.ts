import { UserDtoSchema } from "@budgeteer/types"

export const patchUserSchema = UserDtoSchema.pick({ profile_picture: true })
