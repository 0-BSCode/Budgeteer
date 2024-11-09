import type { IUserRepository, UserCreateDto, UserUpdateDto, UserDto } from "@budgeteer/types"
import { db } from ".."
import { eq } from "drizzle-orm"
import { usersTable, type SelectUser } from "../models/user.model"
import { z } from "zod"

const validateUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  profile_picture: z.string(),
  createdAt: z.union([z.string(), z.date()]),
})

export const userRepository: IUserRepository = {
  async findById(id: number): Promise<UserDto | null> {
    const records = await db.select().from(usersTable).where(eq(usersTable.id, id))
    const record: SelectUser = records[0]

    if (!record) return null

    return this.convertToDto(record)
  },
  async findByUsername(username: string): Promise<UserDto | null> {
    const records = await db.select().from(usersTable).where(eq(usersTable.username, username))
    const record: SelectUser = records[0]

    if (!record) return null

    return this.convertToDto(record)
  },
  async create(dto: UserCreateDto): Promise<UserDto> {
    const data: UserCreateDto = {
      username: dto.username,
      password: dto.password,
    }

    const records = await db.insert(usersTable).values(data).returning()
    const record: SelectUser = records[0]

    return this.convertToDto(record)
  },
  async updateProfilePictureUrl(id: number, dto: UserUpdateDto): Promise<UserDto> {
    const records = await db
      .update(usersTable)
      .set({ profile_picture: dto.profile_picture })
      .where(eq(usersTable.id, id))
      .returning()

    const record: SelectUser = records[0]

    return this.convertToDto(record)
  },
  convertToDto(data: unknown): UserDto {
    const transactionData = validateUserSchema.parse(data)

    return {
      id: transactionData.id,
      username: transactionData.username,
      password: transactionData.password,
      profile_picture: transactionData.profile_picture,
      createdAt: new Date(transactionData.createdAt),
    }
  },
}
