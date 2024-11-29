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
      <main className=" flex-col grid justify-center lg:max-w-none grid-cols-12 px-4 lg:px-0 gap-8">
        <div className="col-span-full lg:col-span-7 lg:h-full bg-gray-200 dark:bg-card h-44 rounded-lg"></div>
        <p className="hover:cursor-pointer lg:hidden text-sm font-normal text-muted-foreground my-[-28px] col-span-full text-end flex justify-end items-center">
          View More Charts <ChevronRight height={20} width={20} />
        </p>
        <div className="hidden col-span-5 h-full lg:flex flex-col">
          <div className="flex justify-between w-full items-center pb-4">
            <h2 className="font-semibold text-2xl">Transactions</h2>
            <Button className="font-normal text-sm" onClick={handleNewTransactionRedirect}>
              + New Transaction
            </Button>
          </div>
          <div className="overflow-y-scroll h-60 pr-4">
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
