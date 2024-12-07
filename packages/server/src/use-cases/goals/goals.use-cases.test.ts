import { expect, vi, it, describe } from "vitest"
import { DataService } from "~/services/data-service"
import { type GoalCreateDto, type GoalDto, type GoalUpdateDto, type UserPublicDto } from "@budgeteer/types"
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
  isAccomplished: false,
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
    isAccomplished: false,
    // Set to 1 day after createdAt
    deadline: new Date(Date.now() + 3600 * 1000 * 24),
  },
  {
    id: 2,
    userId: VALID_USER.id,
    description: "Rent",
    amount: 2000,
    createdAt: new Date(),
    isAccomplished: false,
    // Set to 1 day after createdAt
    deadline: new Date(Date.now() + 3600 * 1000 * 24),
  },
  {
    id: 3,
    userId: VALID_USER.id,
    description: "Wedding Ring",
    amount: 3000,
    isAccomplished: false,
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
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    vi.mocked(DataService.goals.findByUserId).mockResolvedValue(VALID_GOALS)

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
      description: VALID_GOAL.description,
      amount: VALID_GOAL.amount,
      deadline: VALID_GOAL.deadline,
      userId: VALID_USER.id,
    })

    expect(response.data).toEqual(VALID_GOAL)
  })
  it("should throw an error if the deadline comes before the creation date or the current date", async () => {
    const { ...data } = VALID_GOAL
    const goalCreateDto: GoalCreateDto = { ...data, deadline: new Date(Date.now() - 3600 * 1000 * 24) }
    await expect(GoalUseCases.create(goalCreateDto)).rejects.toThrowError()
  })
})

describe("update", () => {
  it("should update a goal", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    vi.mocked(DataService.goals.findByUserId).mockResolvedValue(VALID_GOALS)

    const { ...data } = VALID_GOAL
    const goalUpdateDto: GoalUpdateDto = {
      ...data,
      description: "Updated",
      amount: 100,
    }
    vi.mocked(DataService.goals.findById).mockResolvedValue(VALID_GOAL)
    vi.mocked(DataService.goals.update).mockResolvedValue({ ...VALID_GOAL, ...goalUpdateDto })
    const response = await GoalUseCases.update(1, VALID_USER.id, goalUpdateDto)
    expect(response.data).toEqual({ ...VALID_GOAL, ...goalUpdateDto })
  })

  it("should throw an error if the goal is not found", async () => {
    const { ...data } = VALID_GOAL
    const goalUpdateDto: GoalUpdateDto = {
      ...data,
    }
    vi.mocked(DataService.goals.findById).mockResolvedValue(null)
    await expect(GoalUseCases.update(1, VALID_USER.id, goalUpdateDto)).rejects.toThrowError()
  })

  it("should throw an error if the deadline comes before the creation date or current date", async () => {
    const { ...data } = VALID_GOAL
    const goalUpdateDto: GoalUpdateDto = {
      ...data,
      deadline: new Date(Date.now() - 3600 * 1000 * 24),
    }
    vi.mocked(DataService.goals.findById).mockResolvedValue(VALID_GOAL)
    vi.mocked(DataService.goals.update).mockRejectedValue(new Error())
    await expect(GoalUseCases.update(1, VALID_USER.id, goalUpdateDto)).rejects.toThrowError(
      "Deadline must be in the future",
    )
  })
})

describe("delete", () => {
  it("should delete a goal", async () => {
    vi.mocked(DataService.users.findById).mockResolvedValue(VALID_USER)
    vi.mocked(DataService.goals.findByUserId).mockResolvedValue(VALID_GOALS)

    vi.mocked(DataService.goals.findById).mockResolvedValue(VALID_GOAL)
    vi.mocked(DataService.goals.delete)
    const response = await GoalUseCases.delete(1, VALID_USER.id)
    expect(response.data).toEqual(null)
  })

  it("should throw an error if the goal is not found", async () => {
    vi.mocked(DataService.goals.findById).mockResolvedValue(null)
    await expect(GoalUseCases.delete(1, VALID_USER.id)).rejects.toThrowError()
  })

  it("should throw a db error", async () => {
    vi.mocked(DataService.goals.findById).mockResolvedValue(VALID_GOAL)
    vi.mocked(DataService.goals.delete).mockRejectedValue(new Error("Database error!"))
    await expect(GoalUseCases.delete(1, VALID_USER.id)).rejects.toThrowError("Database error!")
  })
})
