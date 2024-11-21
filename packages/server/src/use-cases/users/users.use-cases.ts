import {
  type IUserUseCases,
  type ResponseDto,
  type UserCreateDto,
  type UserUpdateDto,
  HttpStatusEnum,
  type UserDto,
  TransactionTypeEnum,
  UserPublicDtoSchema,
  type UserPublicDto,
} from "@budgeteer/types"
import { HTTPException } from "hono/http-exception"
import { DataService } from "~/services/data-service"

export const UsersUseCases: IUserUseCases = {
  async getBalance(id: number): Promise<ResponseDto<number>> {
    const transactions = await DataService.transactions.findByUserId(id)
    const expenses = transactions.filter(transaction => transaction.type === TransactionTypeEnum.EXPENSE)
    const incomes = transactions.filter(transaction => transaction.type === TransactionTypeEnum.INCOME)
    const balance =
      incomes.reduce((total, income) => total + income.amount, 0) -
      expenses.reduce((total, expense) => total + expense.amount, 0)

    const response: ResponseDto<number> = {
      status: HttpStatusEnum.OK,
      data: balance,
    }

    return response
  },
  async findById(id: number): Promise<ResponseDto<UserPublicDto>> {
    const user = await DataService.users.findById(id)

    if (!user) {
      throw new HTTPException(HttpStatusEnum.NOT_FOUND, { message: "User not found" })
    }

    const response: ResponseDto<UserPublicDto> = {
      status: HttpStatusEnum.OK,
      data: UserPublicDtoSchema.parse(user),
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
    if (await DataService.users.findByUsername(dto.username)) {
      throw new HTTPException(HttpStatusEnum.BAD_REQUEST, { message: `User with name ${dto.username} already exists!` })
    }

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
