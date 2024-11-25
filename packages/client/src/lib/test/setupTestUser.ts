import authService from "~/features/auth/services/auth-service"

export function createRandomString(): string {
  return Math.random().toString().slice(2, 10)
}

export const sharedTestState = {
  token: "",
  username: "",
  password: "",
}

export async function setupTestUser() {
  if (!sharedTestState.token) {
    const username = `test${Math.random().toString().slice(2, 10)}`
    const password = "12345678"
    const token = await authService.register(username, password)

    sharedTestState.token = token
    sharedTestState.username = username
    sharedTestState.password = password
  }
}
