import { Button } from "~/components/ui/button"
import { Transaction } from "./transaction"

export function TransactionsSection() {
  return (
    <div className="col-span-full px-8 pb-8 h-[40%]">
      <main className="h-full flex-col grid lg:max-w-none grid-cols-12 px-4 lg:px-0 gap-8">
        <div className="col-span-7 h-full bg-gray-300 rounded-lg"></div>
        <div className="col-span-5 h-full flex flex-col">
          <div className="flex justify-between w-full items-center pb-8">
            <h2 className="font-semibold text-2xl">Transactions</h2>
            <Button className="font-normal text-base">+ New Transaction</Button>
          </div>
          {[1, 2, 3, 4].map(() => (
            <Transaction key={Math.random()} />
          ))}
        </div>
      </main>
    </div>
  )
}
