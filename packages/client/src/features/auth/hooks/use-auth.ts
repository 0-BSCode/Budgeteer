import { useLocalStorage } from "usehooks-ts"
import authService from "../services/auth-service"
import userService from "~/features/user/services/user-service"
import { UserUpdateDto } from "@budgeteer/types"

const AUTH_TOKEN_KEY = "auth-token"

export default function useAuth() {
  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage<string | null>(AUTH_TOKEN_KEY, null)

  const login = async (username: string, password: string) => {
    const token = await authService.login(username, password)
    setAuthToken(token)
  }

  const logout = () => {
    removeAuthToken()
  }

  const register = async (username: string, password: string) => {
    const token = await authService.register(username, password)
    setAuthToken(token)
  }

  const updateUserCredentials = async (credentials: UserUpdateDto) => {
    if (!authToken) {
      throw new Error("You cannot edit a profile while authenticated! Please log in first.")
    }

    await userService.updateUserCredentials(authToken, credentials)
    login(credentials.username, credentials.password)
  }

  return { authToken, login, logout, register, updateUserCredentials }
}
