"use client"

import { createContext, ReactNode, useContext } from "react"
import userService from "../services/user-service"
import useAuth from "~/features/auth/hooks/use-auth"
import { useState, useEffect } from "react"
import { UserPublicDto } from "@budgeteer/types"
import { useRouter } from "next/navigation"
import LoadingPage from "~/components/layout/loading-page"

type UserContext = {
  user: UserPublicDto | null
  authToken: string | null
}

const Context = createContext<UserContext | undefined>(undefined)

export function UserContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { authToken } = useAuth()
  const [user, setUser] = useState<UserPublicDto | null>(null)

  useEffect(() => {
    // Redirects the user to authenticate if they don't have a token
    if (!authToken) {
      return router.replace("/auth/login")
    }

    const fetchUser = async () => {
      const fetchedUser = await userService.fetchUserDetails(authToken)
      setUser(fetchedUser)
    }

    fetchUser()
  }, [router, authToken])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <Context.Provider
      value={{
        user,
        authToken,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useUserContext() {
  const context = useContext(Context)
  if (context === undefined) throw new Error("useUserContext was used outside of the provider!")
  return context
}
