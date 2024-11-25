import type { ResponseDto } from "../../entities/response/response.dto"
import type { UserCreateDto } from "../../entities/users/user-create.dto"
import type { UserUpdateProfilePictureDto } from "../../entities/users/user-update-profile-picture.dto"
import type { UserUpdateDto } from "../../entities/users/user-update.dto"
import type { UserDto, UserPublicDto } from "../../entities/users/user.dto"

export type IUserUseCases = {
  getBalance: (id: number) => Promise<ResponseDto<number>>
  findById: (id: number) => Promise<ResponseDto<UserPublicDto>>
  findByUsername: (username: string) => Promise<ResponseDto<UserDto>>
  create: (dto: UserCreateDto) => Promise<ResponseDto<UserDto>>
  updateProfilePictureUrl: (id: number, dto: UserUpdateProfilePictureDto) => Promise<ResponseDto<UserPublicDto>>
  update: (id: number, dto: UserUpdateDto) => Promise<ResponseDto<UserPublicDto>>
}
