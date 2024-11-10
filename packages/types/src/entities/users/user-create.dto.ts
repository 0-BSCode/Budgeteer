import type { UserDto } from "../users/user.dto"

export type UserCreateDto = Pick<UserDto, "username" | "password">
