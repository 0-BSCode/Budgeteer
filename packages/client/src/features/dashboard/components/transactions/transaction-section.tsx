import { Button } from "~/components/ui/button"
import { TransactionItem } from "./transaction-item"
import { TransactionTypeEnumSchema } from "@budgeteer/types"
import { Plus } from "lucide-react"
import Link from "next/link"
import { DashboardSectionHeading } from "../dashboard-section-heading"

export function TransactionSection() {
  return (
    <section className="flex flex-col">
      <div className="flex justify-between w-full items-center mb-8 gap-4">
        <DashboardSectionHeading
          className="mb-0"
          title="Transactions"
          description="A summary of your recent activity"
        />
        <Button asChild>
          <Link href="/transaction/new">
            <Plus /> New <span className="hidden lg:inline">Transaction</span>
          </Link>
        </Button>
      </div>
      <div className="overflow-y-auto max-h-[370px] pr-2">
        {[1, 2, 3, 4, 5, 6, 7].map(k => (
          <TransactionItem
            type={TransactionTypeEnumSchema.Values.INCOME}
            description="💸 Salary • 5:00PM, 11/03/2024"
            key={`transaction-item-${k}`}
          />
        ))}
      </div>
    </section>
  )
}
