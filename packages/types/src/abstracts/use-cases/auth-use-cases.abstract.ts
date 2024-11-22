import type { ResponseDto } from "~/entities/response/response.dto"
import type { UserCreateDto } from "~/entities/users/user-create.dto"

export type IAuthUseCases = {
  register: (dto: UserCreateDto) => Promise<ResponseDto<string>>
  login: (dto: UserCreateDto) => Promise<ResponseDto<string>>
}
