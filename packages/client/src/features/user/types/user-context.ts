import { UserDto } from "@budgeteer/types"

export type UserContext = {
  user: UserDto | undefined
  authToken: string | undefined
}
