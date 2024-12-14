"use client"

import { createContext, ReactNode, useContext } from "react"
import userService from "../services/user-service"
import useAuth from "~/features/auth/hooks/use-auth"
import { useState, useEffect } from "react"
import { UserPublicDto, UserPublicDtoSchema } from "@budgeteer/types"
import { useRouter } from "next/navigation"
import LoadingPage from "~/components/layout/loading-page"
import { useToast } from "~/hooks/use-toast"

type UserContext = {
  user: UserPublicDto | null
  authToken: string | null
  updateUserProfilePicture: ((p: string) => Promise<void>) | null
}

const Context = createContext<UserContext | undefined>(undefined)

export function UserContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { toast } = useToast()
  const { authToken } = useAuth()
  const [user, setUser] = useState<UserPublicDto | null>(null)

  useEffect(() => {
    // Redirects the user to authenticate if they don't have a token
    if (!authToken) {
      return router.replace("/auth/login")
    }

    const fetchUser = async () => {
      try {
        const fetchedUser = UserPublicDtoSchema.parse(await userService.fetchUserDetails(authToken))

        setUser(fetchedUser)
      } catch (_) {
        toast({
          variant: "destructive",
          title: "An error occured while fetching user details.",
          description: "Your session expired. Please log in again.",
        })
        router.replace("/auth/login")
      }
    }

    fetchUser()
  }, [router, authToken, toast])

  if (!user || !authToken) {
    return <LoadingPage />
  }

  const updateUserProfilePicture = async (newProfilePicture: string) => {
    const newProfile = await userService.updateUserProfilePicture(authToken, newProfilePicture)
    setUser(newProfile)
  }

  return (
    <Context.Provider
      value={{
        user,
        authToken,
        updateUserProfilePicture,
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
