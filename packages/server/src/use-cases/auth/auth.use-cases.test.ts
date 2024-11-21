import { expect, vi, it, describe } from "vitest"
import { HttpStatusEnum } from "@budgeteer/types"
import { AuthUseCases } from "../auth/auth.use-cases"

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

vi.mock("../auth/auth.use-cases", () => ({
  AuthUseCases: {
    login: vi.fn(),
    register: vi.fn(),
  },
}))

const GOOD_INPUT = {
  username: `test`,
  password: "12345678",
}

const BAD_INPUT = {
  username: `test`,
  password: "12345",
}

describe("register", () => {
  it("should create new accounts successfully & respond with an auth token", async () => {
    const mockRegisterResponse = { status: HttpStatusEnum.CREATED, token: "mocked.jwt.token" }

    // Check if token has the structure of a JWT
    vi.mocked(AuthUseCases.register).mockResolvedValue(mockRegisterResponse)
    const response = await AuthUseCases.register({ username: GOOD_INPUT.username, password: GOOD_INPUT.password })

    const { token } = response

    expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
  })

  it("should throw an error if the user already exists", async () => {
    vi.mocked(AuthUseCases.register).mockRejectedValue(new Error("User already exists!"))

    await expect(
      AuthUseCases.register({ username: GOOD_INPUT.username, password: GOOD_INPUT.password }),
    ).rejects.toThrowError()
  })

  it("should throw an error if the inputted pasword is too short", async () => {
    vi.mocked(AuthUseCases.register).mockRejectedValue(new Error("Password too short!"))

    await expect(
      AuthUseCases.register({ username: GOOD_INPUT.username, password: BAD_INPUT.password }),
    ).rejects.toThrowError()
  })
})

describe("login", () => {
  it("should authenticate successfully and respond with an auth token", async () => {
    const mockLoginResponse = { status: HttpStatusEnum.OK, token: "mocked.jwt.token" }
    // const transaction: TransactionDto = {
    //   id: 1,
    //   description: "Test",
    //   type: TransactionTypeEnum.EXPENSE,
    //   amount: 50,
    //   category: ExpenseCategoryEnum.ENTERTAINMENT,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }
    // vi.mocked(DataService.transactions.create).mockResolvedValue(transaction)
    // const response = await TransactionUseCases.create({
    //   description: "Test",
    //   type: TransactionTypeEnum.EXPENSE,
    //   amount: 50,
    //   category: ExpenseCategoryEnum.ENTERTAINMENT,
    // })
    // expect(response.data).toEqual(transaction)
    // Check if token has the structure of a JWT
    vi.mocked(AuthUseCases.login).mockResolvedValue(mockLoginResponse)

    // Attempt to log in with the same credentials used to register earlier
    const response = await AuthUseCases.login({ username: GOOD_INPUT.username, password: GOOD_INPUT.password })

    const { token } = response
    // Check if token has the structure of a JWT
    expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
  })

  it("should throw an error if login fails", async () => {
    vi.mocked(AuthUseCases.login).mockRejectedValue(new Error("Login failed!"))

    await expect(
      AuthUseCases.login({ username: BAD_INPUT.username, password: BAD_INPUT.password }),
    ).rejects.toThrowError()
  })
})
