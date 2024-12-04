import { Button } from "~/components/ui/button"
import { TransactionItem } from "./transaction-item"
import { Plus } from "lucide-react"
import Link from "next/link"
import { DashboardSectionHeading } from "../dashboard-section-heading"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { Skeleton } from "~/components/ui/skeleton"
import dayjs from "dayjs"
import { emojifyTransactionCategory } from "~/features/transaction/lib/emojify-transaction-category"

export function TransactionSection() {
  const { transactions } = useTransactionContext()

  return (
    <section className="flex flex-col">
      <div className="mb-8 flex w-full items-center justify-between gap-4">
        <DashboardSectionHeading
          className="mb-0"
          title="Transactions 🧾"
          description="A summary of your recent activity"
        />
        <Button asChild>
          <Link href="/transaction/new">
            <Plus /> New <span className="hidden lg:inline">Transaction</span>
          </Link>
        </Button>
      </div>
      {!transactions?.length ? (
        <Skeleton className="h-[370px] w-full" />
      ) : (
        <div className="max-h-[370px] min-h-[370px] overflow-y-auto pr-4">
          {transactions.map(t => (
            <TransactionItem
              id={t.id.toString()}
              type={t.type}
              description={`${emojifyTransactionCategory(t.category)} • ${dayjs(t.date).format("HH:mm, MMMM D, YYYY")}`}
              value={t.amount}
              key={t.id}
            />
          ))}
        </div>
      )}
    </section>
  )
}
