import { useLocalStorage } from "usehooks-ts"
import authService from "../services/auth-service"

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
    await authService.register(username, password)
  }

  return { authToken, login, logout, register }
}
