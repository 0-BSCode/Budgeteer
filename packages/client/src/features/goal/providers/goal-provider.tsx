"use client"

import { createContext, ReactNode, useContext } from "react"
import useGoal from "../hooks/use-goal"
import { useState, useEffect } from "react"
import { GoalDto } from "@budgeteer/types"
import { useRouter } from "next/navigation"
import { useToast } from "~/hooks/use-toast"

type GoalContext = {
  goals: GoalDto[] | null
  invalidateGoalCache: () => void
}

const Context = createContext<GoalContext | undefined>(undefined)

export function GoalContextProvider({ children }: { children: ReactNode }) {
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const [goals, setGoals] = useState<GoalDto[] | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { getAllGoals } = useGoal()

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goals = await getAllGoals()

        setGoals(goals)
      } catch (e) {
        toast({
          variant: "destructive",
          title: "An error occured while fetching goals.",
          description: (e as Error).message,
        })

        router.replace("/auth/login")
      }

      setIsUpdated(true)
    }

    if (!isUpdated) {
      fetchGoals()
    }
  }, [router, toast, getAllGoals, isUpdated])

  // Hacky way to maintain cache & invalidate without using a library
  const invalidateGoalCache = () => {
    setIsUpdated(false)
  }

  return (
    <Context.Provider
      value={{
        goals,
        invalidateGoalCache,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useGoalContext() {
  const context = useContext(Context)
  if (context === undefined) throw new Error("useGoalContext was used outside of the provider!")
  return context
}
