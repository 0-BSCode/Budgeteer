import { expect, it, describe, beforeAll } from "vitest"
import { setupTestUser, sharedTestState, createRandomString } from "~/lib/test/sertupTestUser"
import userService from "~/features/user/services/user-service"
import authService from "~/features/auth/services/auth-service"

const NEW_CREDENTIALS = {
  username: `new${createRandomString()}`,
  password: "87654321",
}

describe.only("user-service", () => {
  beforeAll(async () => {
    await setupTestUser()
  })

  describe("fetchUserDetails", () => {
    it("should fetch user details with a valid token", async () => {
      const user = await userService.fetchUserDetails(sharedTestState.token)

      expect(user).toHaveProperty("username", sharedTestState.username)
      expect(user).toHaveProperty("id")
      expect(user).toHaveProperty("createdAt")
      expect(user).toHaveProperty("profile_picture")
    })
  })

  describe("updateUserCredentials", () => {
    it("should update user credentials", async () => {
      const updatedProfile = await userService.updateUserCredentials(sharedTestState.token, {
        username: NEW_CREDENTIALS.username,
        password: NEW_CREDENTIALS.password,
      })

      expect(updatedProfile).toHaveProperty("username", NEW_CREDENTIALS.username)
    })

    it("should let us login with these new credentials", async () => {
      const token = await authService.login(NEW_CREDENTIALS.username, NEW_CREDENTIALS.password)

      expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
      sharedTestState.token = token
      sharedTestState.username = NEW_CREDENTIALS.username
      sharedTestState.password = NEW_CREDENTIALS.password
    })
  })
})
