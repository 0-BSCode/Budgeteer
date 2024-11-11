import type { ResponseDto } from "~/entities/response/response.dto"
import type { UserCreateDto } from "~/entities/users/user-create.dto"
import type { UserDto } from "~/entities/users/user.dto"

export type IAuthUseCases = {
  register: (dto: UserCreateDto) => Promise<ResponseDto<UserDto>>
  login: (dto: UserCreateDto) => Promise<ResponseDto<string>>
}
