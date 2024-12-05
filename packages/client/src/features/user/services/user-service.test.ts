import { expect, it, describe, beforeAll } from "vitest"
import { setupTestUser, sharedUserTestState, createRandomString } from "~/lib/test/setup-test-user"
import userService from "~/features/user/services/user-service"
import authService from "~/features/auth/services/auth-service"

const NEW_CREDENTIALS = {
  profile_picture: "5",
  username: `new${createRandomString()}`,
  password: "87654321",
}

describe.only("user-service", () => {
  beforeAll(async () => {
    await setupTestUser()
  })

  describe("fetchUserDetails", () => {
    it("should fetch user details with a valid token", async () => {
      const user = await userService.fetchUserDetails(sharedUserTestState.token)

      expect(user).toHaveProperty("username", sharedUserTestState.username)
      expect(user).toHaveProperty("id")
      expect(user).toHaveProperty("createdAt")
      expect(user).toHaveProperty("profile_picture")
    })
  })

  describe("updateUserCredentials", () => {
    it("should update user credentials", async () => {
      const updatedProfile = await userService.updateUserCredentials(sharedUserTestState.token, {
        username: NEW_CREDENTIALS.username,
        password: NEW_CREDENTIALS.password,
      })

      expect(updatedProfile).toHaveProperty("username", NEW_CREDENTIALS.username)
    })

    it("should let us login with these new credentials", async () => {
      const token = await authService.login(NEW_CREDENTIALS.username, NEW_CREDENTIALS.password)

      expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
      sharedUserTestState.token = token
      sharedUserTestState.username = NEW_CREDENTIALS.username
      sharedUserTestState.password = NEW_CREDENTIALS.password
    })
  })

  describe("updateUserProfilePicture", () => {
    it("should update the profile picture successfully", async () => {
      const updatedProfile = await userService.updateUserProfilePicture(
        sharedUserTestState.token,
        NEW_CREDENTIALS.profile_picture,
      )

      expect(updatedProfile).toHaveProperty("profile_picture", NEW_CREDENTIALS.profile_picture)
    })
  })
})
