import { Button } from "~/components/ui/button"
import { Transaction } from "./transaction"
import { TransactionTypeEnumValues } from "@budgeteer/types"

export function TransactionsList() {
  return (
    <div className="lg:hidden col-span-full h-full flex flex-col">
      <div className="flex justify-between w-full items-center pb-4">
        <h2 className="font-semibold text-2xl">Transactions</h2>
        <Button className="font-normal text-sm">+</Button>
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
