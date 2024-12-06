import { expect, vi, it, describe } from "vitest"
import { DataService } from "~/services/data-service"
import { type GoalDto, type UserDto, type UserPublicDto } from "@budgeteer/types"
import { GoalUseCases } from "./goals.use-cases"

const VALID_USER: UserPublicDto = {
  id: 1,
  username: "johndoe",
  profile_picture: "image_url",
  createdAt: new Date(),
}

const VALID_GOAL: GoalDto = {
  id: 1,
  userId: VALID_USER.id,
  description: "Wife's Birthday Gift",
  amount: 1000,
  createdAt: new Date(),
  // Set to 1 day after createdAt
  deadline: new Date(Date.now() + 3600 * 1000 * 24),
}

const VALID_GOALS: GoalDto[] = [
  {
    id: 1,
    userId: VALID_USER.id,
    description: "Vacation in the Bahamas",
    amount: 1000,
    createdAt: new Date(),
    // Set to 1 day after createdAt
    deadline: new Date(Date.now() + 3600 * 1000 * 24),
  },
  {
    id: 2,
    userId: VALID_USER.id,
    description: "Rent",
    amount: 2000,
    createdAt: new Date(),
    // Set to 1 day after createdAt
    deadline: new Date(Date.now() + 3600 * 1000 * 24),
  },
  {
    id: 3,
    userId: VALID_USER.id,
    description: "Wedding Ring",
    amount: 3000,
    createdAt: new Date(),
    // Set to 1 day after createdAt
    deadline: new Date(Date.now() + 3600 * 1000 * 24),
  },
]

vi.mock("~/services/data-service", () => ({
  DataService: {
    goals: {
      findByUserId: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    users: {
      findById: vi.fn(),
    },
  },
}))

describe("findById", () => {
  it("should find a goal and return it", async () => {
    vi.mocked(DataService.goals.findById).mockResolvedValue(VALID_GOAL)
    const response = await GoalUseCases.findById(1, VALID_USER.id)
    expect(response.data).toEqual(VALID_GOAL)
  })

  it("should throw an error if the goal is not found", async () => {
    vi.mocked(DataService.goals.findById).mockResolvedValue(null)
    await expect(GoalUseCases.findById(1, VALID_USER.id)).rejects.toThrowError()
  })

  it("should throw an error if the goal does not belong to the user", async () => {
    const FAKE_USER: UserPublicDto = { ...VALID_USER, id: 2 }
    vi.mocked(DataService.goals.findById).mockResolvedValue(VALID_GOAL)
    await expect(GoalUseCases.findById(1, FAKE_USER.id)).rejects.toThrowError("Goal not found")
  })
})

describe("findByUserId", () => {
  it("should find all goals of a particular user and return it", async () => {
    vi.mocked(DataService.goals.findByUserId).mockResolvedValue(VALID_GOALS)
    const response = await GoalUseCases.findByUserId(1)
    expect(response.data).toEqual(VALID_GOALS)
  })

  it("should throw an error if the user is not found", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(null)
    await expect(GoalUseCases.findByUserId(1)).rejects.toThrowError("User not found")
  })

  it("should throw a db error", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    vi.mocked(DataService.goals.findByUserId).mockRejectedValue(new Error("Database error!"))
    await expect(GoalUseCases.findByUserId(1)).rejects.toThrowError("Database error!")
  })
})

describe("create", () => {
  it("should create a goal", async () => {
    vi.mocked(DataService.goals.create).mockResolvedValue(VALID_GOAL)
    const response = await GoalUseCases.create({
      username: user.username,
      password: user.password,
    })

    expect(response.data).toEqual(user)
  })
  it("should throw an error if the username is already taken by another user", async () => {
    const user: UserDto = {
      id: 1,
      username: "johndoe",
      profile_picture: "image_url",
      password: "TestEncryptedPassword123123123",
      createdAt: new Date(),
    }

    vi.mocked(DataService.users.findByUsername).mockResolvedValue(user)

    await expect(
      UsersUseCases.create({
        username: user.username,
        password: user.password,
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

  it("should throw a db error", async () => {
    const user: UserPublicDto = {
      id: 1,
      username: "johndoe",
      profile_picture: "image_url",
      createdAt: new Date(),
    }

    vi.mocked(DataService.users.findById).mockResolvedValue(user)

    vi.mocked(DataService.users.updateProfilePictureUrl).mockRejectedValue(new Error("Database error!"))

    await expect(
      UsersUseCases.updateProfilePictureUrl(1, {
        profile_picture: "updated_image_url",
      }),
    ).rejects.toThrowError("Database error!")
  })
})
