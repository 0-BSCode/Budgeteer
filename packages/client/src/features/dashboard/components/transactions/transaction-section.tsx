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
          <div className="flex gap-2">
            <Button variant="outline">
              <Link href="/transaction">
                <TableIcon className="inline h-4 w-4" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/transaction/new">
                <Plus /> Create
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {!transactions ? (
        <Skeleton className="h-[370px] w-full" />
      ) : transactions.length === 0 ? (
        <div className="h-[370px] gap-2 pr-4">
          <span className="text-muted-foreground">No transactions recorded yet.</span>
        </div>
      ) : (
        <div className="h-[370px] gap-2 overflow-y-scroll pr-4">
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
