import {
  type ResponseDto,
  type UserCreateDto,
  HttpStatusEnum,
  type IAuthUseCases,
  MIN_PASSWORD_LENGTH,
} from "@budgeteer/types"
import { HTTPException } from "hono/http-exception"
import { sign } from "hono/jwt"
import type { SignatureKey } from "hono/utils/jwt/jws"
import { comparePassword } from "~/infrastructure/bcrypt-hash-service"
import { ConfigService } from "~/services/config-service"
import { DataService } from "~/services/data-service"
import { HashService } from "~/services/hash-service"

export const AuthUseCases: IAuthUseCases = {
  async register(dto: UserCreateDto): Promise<ResponseDto<string>> {
    const { username, password } = dto

    // Password cannot be less than 8 characters long
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new HTTPException(HttpStatusEnum.BAD_REQUEST, {
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long!`,
      })
    }

    // Username must be unique
    if (await DataService.users.findByUsername(username)) {
      throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: `User with name ${username} already exists!` })
    }

    const hashedPassword = HashService.hashPassword(password)

    try {
      const user = await DataService.users.create({ username, password: hashedPassword })

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
    } catch (e) {
      if (e instanceof Error) {
        throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: e.message })
      }

      throw new HTTPException(HttpStatusEnum.INTERNAL_SERVER_ERROR, { message: "Unable to create user" })
    }
  },
  async login(dto: UserCreateDto): Promise<ResponseDto<string>> {
    const { username, password } = dto

    const user = await DataService.users.findByUsername(username)

    if (!user) {
      throw new HTTPException(HttpStatusEnum.NOT_FOUND, { message: `User with name ${username} not found!` })
    }

    const isPasswordValid = comparePassword(password, user.password)

    if (!isPasswordValid) {
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
      status: HttpStatusEnum.OK,
      data: token,
    }

    return response
  },
}
