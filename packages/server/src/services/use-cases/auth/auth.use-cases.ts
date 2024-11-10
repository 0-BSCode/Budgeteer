import {
  type ResponseDto,
  type UserCreateDto,
  HttpStatusEnum,
  type UserDto,
  type IAuthUseCases,
} from "@budgeteer/types"
import { compareSync, genSaltSync, hashSync } from "bcrypt"
import { HTTPException } from "hono/http-exception"
import { sign } from "hono/jwt"
import type { SignatureKey } from "hono/utils/jwt/jws"
import { ConfigService } from "~/services/config-service"
import { DataService } from "~/services/data-service"

export const AuthUseCases: IAuthUseCases = {
  async register(dto: UserCreateDto): Promise<ResponseDto<UserDto | null>> {
    const { username, password } = dto

    // Username must be unique
    if (await DataService.users.findByUsername(username)) {
      throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: `User with name ${username} already exists!` })
    }

    const salt = genSaltSync()
    const hashedPassword = hashSync(password, salt)

    try {
      const user = await DataService.users.create({ username, password: hashedPassword })

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
  async login(dto: UserCreateDto): Promise<ResponseDto<string | null>> {
    const { username, password } = dto

    const user = await DataService.users.findByUsername(username)

    if (!user) {
      throw new HTTPException(HttpStatusEnum.NOT_FOUND, { message: `User with name ${username} not found!` })
    }

    if (!compareSync(password, user.password)) {
      throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: "Incorrect password. Please try again!" })
    }

    const { id } = user

    const token = await sign(
      {
        id,
        username,
        // Expires in 1 hour
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      ConfigService.JWT_SECRET as SignatureKey,
    )

    const response: ResponseDto<string> = {
      status: HttpStatusEnum.CREATED,
      data: token,
    }

    return response
  },
}
