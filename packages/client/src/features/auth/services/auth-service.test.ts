import { expect, it, describe } from "vitest"
import { MIN_PASSWORD_LENGTH } from "@budgeteer/types"
import authService from "./auth-service"
import userService from "~/features/user/services/user-service"

function createRandomString(): string {
  return Math.random().toString().slice(2, 10)
}

const GOOD_INPUT = {
  username: `test${createRandomString()}`,
  password: "12345678",
}
let GOOD_INPUT_TOKEN: string = ""

const BAD_INPUT = {
  username: `test${createRandomString()}`,
  password: "1234567",
}

describe("register", () => {
  it("should create new accounts successfully & respond with an auth token", async () => {
    const token = await authService.register(GOOD_INPUT.username, GOOD_INPUT.password)
    GOOD_INPUT_TOKEN = token

    // Check if token has the structure of a JWT
    expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
  })

  it("should allow the user to query their details with the token", async () => {
    const user = await userService.fetchUserDetails(GOOD_INPUT_TOKEN)

    expect(user).toHaveProperty("username", GOOD_INPUT.username)
    expect(user).toHaveProperty("id")
    expect(user).toHaveProperty("createdAt")
    expect(user).toHaveProperty("profile_picture")
    expect(user.password).toBeUndefined()
  })

  it(`should not allow passwords less than ${MIN_PASSWORD_LENGTH} characters in length`, async () => {
    await expect(authService.register(BAD_INPUT.username, BAD_INPUT.password)).rejects.toThrowError()
  })
})

describe("login", () => {
  it("should authenticate successfully and respond with an auth token", async () => {
    // Attempt to log in with the same credentials used to register earlier
    const token = await authService.login(GOOD_INPUT.username, GOOD_INPUT.password)

    // Check if token has the structure of a JWT
    expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
  })

  it("should reject login with invalid credentials", async () => {
    await expect(authService.login(BAD_INPUT.username, BAD_INPUT.password)).rejects.toThrowError()
  })
})
