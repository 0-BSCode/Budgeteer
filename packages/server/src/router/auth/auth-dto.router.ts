import { UserDtoSchema } from "@budgeteer/types"

export const authRequestSchema = UserDtoSchema.pick({ username: true, password: true })
