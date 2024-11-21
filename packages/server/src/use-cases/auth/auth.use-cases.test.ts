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

describe("register", () => {
  it("should create new accounts successfully & respond with an auth token", async () => {
    const mockRegisterResponse = { status: HttpStatusEnum.CREATED, token: "mocked.jwt.token" }

    // Check if token has the structure of a JWT
    vi.mocked(AuthUseCases.register).mockResolvedValue(mockRegisterResponse)
    const response = await AuthUseCases.register({ username: GOOD_INPUT.username, password: GOOD_INPUT.password })

    const { token } = response

    expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
  })
})

describe("login", () => {
  it("should authenticate successfully and respond with an auth token", async () => {
    const mockRegisterResponse = { status: HttpStatusEnum.OK, token: "mocked.jwt.token" }

    // Check if token has the structure of a JWT
    vi.mocked(AuthUseCases.login).mockResolvedValue(mockRegisterResponse)

    // Attempt to log in with the same credentials used to register earlier
    const response = await AuthUseCases.login({ username: GOOD_INPUT.username, password: GOOD_INPUT.password })

    const { token } = response
    // Check if token has the structure of a JWT
    expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
  })
})
