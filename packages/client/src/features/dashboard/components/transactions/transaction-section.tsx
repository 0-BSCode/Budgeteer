import { Button } from "~/components/ui/button"
import { TransactionItem } from "./transaction-item"
import { Plus, TableIcon } from "lucide-react"
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
      <div className="mb-8 flex w-full flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
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
        <Button variant="ghost">
          <Link href="/transaction">
            <TableIcon className="mr-2 inline h-4 w-4" />
            Query Transactions
          </Link>
        </Button>
      </div>
      {!transactions?.length ? (
        <Skeleton className="h-[370px] w-full" />
      ) : (
        <div className="h-[370px] overflow-y-auto pr-4">
          {transactions.map(t => (
            <TransactionItem
              id={t.id.toString()}
              type={t.type}
              description={t.description}
              category={`${emojifyTransactionCategory(t.category)} • ${dayjs(t.date).format("HH:mm, MMMM D, YYYY")}`}
              value={t.amount}
              key={t.id}
            />
          ))}
        </div>
      )}
    </section>
  )
}
