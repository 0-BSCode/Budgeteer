import { Button } from "~/components/ui/button"
import { Transaction } from "./transaction"

export function TransactionsSection() {
  return (
    <div className="px-8 pb-8 ">
      <main className=" flex-col grid lg:max-w-none grid-cols-12 px-4 lg:px-0 gap-8">
        <div className="col-span-full lg:col-span-7 h-full bg-card rounded-lg"></div>
        <div className="hidden col-span-5 h-full lg:flex flex-col">
          <div className="flex justify-between w-full items-center pb-4">
            <h2 className="font-semibold text-2xl">Transactions</h2>
            <Button className="font-normal text-sm">+ New Transaction</Button>
          </div>
          {[1, 2, 3, 4].map(() => (
            <Transaction key={Math.random()} />
          ))}
        </div>
      </main>
    </div>
  )
}
