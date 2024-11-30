"use client"

import { Button } from "~/components/ui/button"
import { Transaction } from "./transaction"
import { TransactionTypeEnumValues } from "@budgeteer/types"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function TransactionsSection() {
  const router = useRouter()
  const handleNewTransactionRedirect = () => {
    router.push("/transaction/new")
  }
  return (
    <div className="lg:px-8 lg:pb-8">
      <main className="grid grid-cols-12 flex-col justify-center gap-8 px-4 lg:max-w-none lg:px-0">
        <div className="col-span-full h-44 rounded-lg bg-gray-200 dark:bg-card lg:col-span-7 lg:h-full"></div>
        <p className="col-span-full my-[-28px] flex items-center justify-end text-end text-sm font-normal text-muted-foreground hover:cursor-pointer lg:hidden">
          View More Charts <ChevronRight height={20} width={20} />
        </p>
        <div className="col-span-5 hidden h-full flex-col lg:flex">
          <div className="flex w-full items-center justify-between pb-4">
            <h2 className="text-2xl font-semibold">Transactions</h2>
            <Button className="text-sm font-normal" onClick={handleNewTransactionRedirect}>
              + New Transaction
            </Button>
          </div>
          <div className="h-60 overflow-y-scroll pr-4">
            {[1, 2, 3, 4, 5].map(() => (
              <Transaction
                type={TransactionTypeEnumValues.INCOME}
                description="💸 Salary • 5:00PM, 11/03/2024"
                key={Math.random()}
              />
            ))}
            {[1, 2].map(() => (
              <Transaction
                type={TransactionTypeEnumValues.EXPENSE}
                description="🍔 Food • 5:00PM, 11/03/2024"
                key={Math.random()}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
