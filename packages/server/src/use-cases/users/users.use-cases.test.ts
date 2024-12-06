import { expect, vi, it, describe } from "vitest"
import { DataService } from "~/services/data-service"
import { type UserDto, type UserPublicDto } from "@budgeteer/types"
import { UsersUseCases } from "../users/users.use-cases"

const VALID_USER: UserPublicDto = {
  id: 1,
  username: "johndoe",
  profile_picture: "image_url",
  createdAt: new Date(),
}

const VALID_USER_WITH_PASSWORD: UserDto = {
  id: 1,
  username: "johndoe",
  password: "password",
  profile_picture: "image_url",
  createdAt: new Date(),
}

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
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    const response = await UsersUseCases.findById(VALID_USER.id)
    expect(response.data).toEqual(VALID_USER)
  })

  it("should throw an error if the user is not found", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(null)
    await expect(UsersUseCases.findById(1)).rejects.toThrowError("User not found")
  })
})

describe("findByUsername", () => {
  it("should find a user with an encrypted password field", async () => {
    vi.mocked(DataService.users.findByUsername).mockResolvedValue(VALID_USER_WITH_PASSWORD)
    const response = await UsersUseCases.findByUsername("johndoe")
    expect(response.data).toEqual(VALID_USER_WITH_PASSWORD)
  })

  it("should throw an error if the user is not found", async () => {
    vi.mocked(DataService.users.findByUsername).mockResolvedValue(null)
    await expect(UsersUseCases.findByUsername("johndoe")).rejects.toThrowError()
  })
})

describe("create", () => {
  it("should create a user", async () => {
    vi.mocked(DataService.users.create).mockResolvedValue(VALID_USER_WITH_PASSWORD)
    const response = await UsersUseCases.create({
      username: VALID_USER_WITH_PASSWORD.username,
      password: VALID_USER_WITH_PASSWORD.password,
    })

    expect(response.data).toEqual(VALID_USER_WITH_PASSWORD)
  })
  it("should throw an error if the username is already taken by another user", async () => {
    vi.mocked(DataService.users.findByUsername).mockResolvedValue(VALID_USER_WITH_PASSWORD)

    await expect(
      UsersUseCases.create({
        username: VALID_USER_WITH_PASSWORD.username,
        password: VALID_USER_WITH_PASSWORD.password,
      }),
    ).rejects.toThrowError()
  })

  it("should throw a db error when invalid credentials are detected", async () => {
    vi.mocked(DataService.users.findByUsername).mockResolvedValue(null)
    vi.mocked(DataService.users.create).mockRejectedValue(new Error("Database error!"))

    await expect(
      UsersUseCases.create({
        username: "test",
        password: "test",
      }),
    ).rejects.toThrowError("Database error!")
  })
})

describe("updateProfilePicture", () => {
  it("should update a user's profile picture URL", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    vi.mocked(DataService.users.updateProfilePictureUrl).mockResolvedValue(VALID_USER)
    const response = await UsersUseCases.updateProfilePictureUrl(1, {
      profile_picture: "updated_image_url",
    })
    expect(response.data).toEqual(VALID_USER)
  })

  it("should throw an error if the user is not found", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(null)

    await expect(
      UsersUseCases.updateProfilePictureUrl(1, {
        profile_picture: "updated_image_url",
      }),
    ).rejects.toThrowError()
  })

  it("should throw a db error", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)

    vi.mocked(DataService.users.updateProfilePictureUrl).mockRejectedValue(new Error("Database error!"))

    await expect(
      UsersUseCases.updateProfilePictureUrl(1, {
        profile_picture: "updated_image_url",
      }),
    ).rejects.toThrowError("Database error!")
  })
})
