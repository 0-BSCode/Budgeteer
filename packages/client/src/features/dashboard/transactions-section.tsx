import { Button } from "~/components/ui/button"
import { Transaction } from "./transaction"
import { TransactionTypeEnum } from "@budgeteer/types"
import { ChevronRight } from "lucide-react"

export function TransactionsSection() {
  return (
    <div className="lg:px-8 lg:pb-8">
      <main className=" flex-col grid justify-center lg:max-w-none grid-cols-12 px-4 lg:px-0 gap-8">
        <div className="col-span-full lg:col-span-7 lg:h-full bg-gray-200 dark:bg-card h-44 rounded-lg"></div>
        <p className="hover:cursor-pointer lg:hidden text-sm font-normal text-muted-foreground my-[-28px] col-span-full text-end flex justify-end items-center">
          View More Charts <ChevronRight />
        </p>
        <div className="hidden col-span-5 h-full lg:flex flex-col">
          <div className="flex justify-between w-full items-center pb-4">
            <h2 className="font-semibold text-2xl">Transactions</h2>
            <Button className="font-normal text-sm">+ New Transaction</Button>
          </div>
          {[1, 2].map(() => (
            <Transaction
              type={TransactionTypeEnum.INCOME}
              description="💸 Salary • 5:00PM, 11/03/2024"
              key={Math.random()}
            />
          ))}
          {[1, 2].map(() => (
            <Transaction
              type={TransactionTypeEnum.EXPENSE}
              description="🍔 Food • 5:00PM, 11/03/2024"
              key={Math.random()}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
