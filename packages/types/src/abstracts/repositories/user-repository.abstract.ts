import type { UserCreateDto } from "../../entities/users/user-create.dto"
import type { UserUpdateDto } from "../../entities/users/user-update.dto"
import type { UserDto } from "../../entities/users/user.dto"

export type IUserRepository = {
  findById: (id: number) => Promise<UserDto | null>
  findByUsername: (username: string) => Promise<UserDto | null>
  create: (dto: UserCreateDto) => Promise<UserDto>
  updateProfilePictureUrl: (id: number, dto: UserUpdateDto) => Promise<UserDto>
  convertToDto: (data: unknown) => UserDto
}
