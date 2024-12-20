"use client"

import { createContext, ReactNode, useContext } from "react"
import useTransaction from "../hooks/use-transaction"
import { useState, useEffect } from "react"
import { TransactionDto } from "@budgeteer/types"
import { useRouter } from "next/navigation"
import { useToast } from "~/hooks/use-toast"

type TransactionContext = {
  transactions: TransactionDto[] | null
  invalidateTransactionCache: (() => void) | null
}

const Context = createContext<TransactionContext | undefined>(undefined)

export function TransactionContextProvider({ children }: { children: ReactNode }) {
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const [transactions, setTransactions] = useState<TransactionDto[] | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { getAllTransactions } = useTransaction()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await getAllTransactions()

        setTransactions(transactions)
      } catch (e) {
        toast({
          variant: "destructive",
          title: "An error occured while fetching transactions.",
          description: (e as Error).message,
        })
        router.replace("/auth/login")
      }

      setIsUpdated(true)
    }

    if (!isUpdated) {
      fetchTransactions()
    }
  }, [router, toast, getAllTransactions, isUpdated])

  // Hacky way to maintain cache & invalidate without using a library
  const invalidateTransactionCache = () => {
    setIsUpdated(false)
  }

  return (
    <Context.Provider
      value={{
        transactions,
        invalidateTransactionCache,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useTransactionContext() {
  const context = useContext(Context)
  if (context === undefined) throw new Error("useTransactionContext was used outside of the provider!")
  return context
}
