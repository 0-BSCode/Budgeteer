import type { UserCreateDto } from "../../entities/users/user-create.dto"
import type { UserUpdateDto } from "../../entities/users/user-update.dto"
import type { UserUpdateProfilePictureDto } from "../../entities/users/user-update-profile-picture.dto"
import type { UserDto, UserPublicDto } from "../../entities/users/user.dto"

export type IUserRepository = {
  findById: (id: number) => Promise<UserPublicDto | null>
  findByUsername: (username: string) => Promise<UserDto | null>
  create: (dto: UserCreateDto) => Promise<UserDto>
  updateProfilePictureUrl: (id: number, dto: UserUpdateProfilePictureDto) => Promise<UserPublicDto>
  update: (id: number, dto: UserUpdateDto) => Promise<UserPublicDto>
  convertToDto: (data: unknown) => UserDto
}
