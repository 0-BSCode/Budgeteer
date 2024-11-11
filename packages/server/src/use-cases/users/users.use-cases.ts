import {
  type IUserUseCases,
  type ResponseDto,
  type UserCreateDto,
  type UserUpdateDto,
  HttpStatusEnum,
  type UserDto,
} from "@budgeteer/types"
import { HTTPException } from "hono/http-exception"
import { DataService } from "~/services/data-service"

export const UsersUseCases: IUserUseCases = {
  async findById(id: number): Promise<ResponseDto<UserDto>> {
    const user = await DataService.users.findById(id)

    if (!user) {
      throw new HTTPException(HttpStatusEnum.NOT_FOUND, { message: "User not found" })
    }

    const response: ResponseDto<UserDto> = {
      status: HttpStatusEnum.OK,
      data: user,
    }

    return response
  },
  async findByUsername(username: string): Promise<ResponseDto<UserDto>> {
    const user = await DataService.users.findByUsername(username)

    if (!user) {
      throw new HTTPException(HttpStatusEnum.NOT_FOUND, { message: "User not found" })
    }

    const response: ResponseDto<UserDto> = {
      status: HttpStatusEnum.OK,
      data: user,
    }

    return response
  },
  async create(dto: UserCreateDto): Promise<ResponseDto<UserDto | null>> {
    try {
      const user = await DataService.users.create(dto)

      const response: ResponseDto<UserDto> = {
        status: HttpStatusEnum.CREATED,
        data: user,
      }
      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to create user" })
    }
  },
  async updateProfilePictureUrl(id: number, dto: UserUpdateDto): Promise<ResponseDto<UserDto | null>> {
    await this.findById(id)

    try {
      const user = await DataService.users.updateProfilePictureUrl(id, dto)

      const response: ResponseDto<UserDto> = {
        status: HttpStatusEnum.OK,
        data: user,
      }

      return response
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to update user" })
    }
  },
}
