import { useLocalStorage } from "usehooks-ts"

const AUTH_TOKEN_KEY = "auth-token"

export default function useAuth() {
  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage<string | null>(AUTH_TOKEN_KEY, null)

  return { authToken, setAuthToken, removeAuthToken }
}
