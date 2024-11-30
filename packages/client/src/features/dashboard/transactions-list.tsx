import { Button } from "~/components/ui/button"
import { Transaction } from "./transaction"
import { TransactionTypeEnumValues } from "@budgeteer/types"

export function TransactionsList() {
  return (
    <div className="col-span-full flex h-full flex-col lg:hidden">
      <div className="flex w-full items-center justify-between pb-4">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <Button className="text-sm font-normal">+</Button>
      </div>
      {[1, 2].map(() => (
        <Transaction
          type={TransactionTypeEnumValues.INCOME}
          description="💸 Salary • 5:00PM, 11/03/2024"
          key={Math.random()}
        />
      ))}
    </div>
  )
}
