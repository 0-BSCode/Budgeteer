import { expect, vi, it, describe } from "vitest"
import { DataService } from "~/services/data-service"
import { type UserDto, type UserPublicDto } from "@budgeteer/types"
import { UsersUseCases } from "../users/users.use-cases"

vi.mock("~/services/data-service", () => ({
  DataService: {
    users: {
      findById: vi.fn(),
      findByUsername: vi.fn(),
      create: vi.fn(),
      updateProfilePictureUrl: vi.fn(),
    },
  },
}))

describe("findById", () => {
  it("should find a user and return their credentials without a password field", async () => {
    const user: UserPublicDto = {
      id: 1,
      username: "johndoe",
      profile_picture: "image_url",
      createdAt: new Date(),
    }

    vi.mocked(DataService.users.findById).mockResolvedValue(user)
    const response = await UsersUseCases.findById(1)
    expect(response.data).toEqual(user)
  })

  it("should throw an error if the user is not found", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(null)
    await expect(UsersUseCases.findById(1)).rejects.toThrowError("User not found")
  })
})

describe("findByUsername", () => {
  it("should find a user with an encrypted password field", async () => {
    const user: UserDto = {
      id: 1,
      username: "johndoe",
      profile_picture: "image_url",
      password: "TestEncryptedPassword123123123",
      createdAt: new Date(),
    }

    vi.mocked(DataService.users.findByUsername).mockResolvedValue(user)
    const response = await UsersUseCases.findByUsername("johndoe")
    expect(response.data).toEqual(user)
  })

  it("should throw an error if the user is not found", async () => {
    vi.mocked(DataService.users.findByUsername).mockResolvedValue(null)
    await expect(UsersUseCases.findByUsername("johndoe")).rejects.toThrowError()
  })
})

describe("create", () => {
  it("should create a user", async () => {
    const user: UserDto = {
      id: 1,
      username: "johndoe",
      profile_picture: "image_url",
      password: "TestEncryptedPassword123123123",
      createdAt: new Date(),
    }

    vi.mocked(DataService.users.create).mockResolvedValue(user)
    const response = await UsersUseCases.create({
      username: "Test",
      password: "TestEncryptedPassword123123123",
    })

    expect(response.data).toEqual(user)
  })
})

describe("updateProfilePicture", () => {
  it("should update a user's profile picture URL", async () => {
    const user: UserPublicDto = {
      id: 1,
      username: "johndoe",
      profile_picture: "image_url",
      createdAt: new Date(),
    }

    vi.mocked(DataService.users.findById).mockResolvedValue(user)
    vi.mocked(DataService.users.updateProfilePictureUrl).mockResolvedValue(user)
    const response = await UsersUseCases.updateProfilePictureUrl(1, {
      profile_picture: "updated_image_url",
    })
    expect(response.data).toEqual(user)
  })

  it("should throw an error if the user is not found", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(null)

    await expect(
      UsersUseCases.updateProfilePictureUrl(1, {
        profile_picture: "updated_image_url",
      }),
    ).rejects.toThrowError()
  })
})
