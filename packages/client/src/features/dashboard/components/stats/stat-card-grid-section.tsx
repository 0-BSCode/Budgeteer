import { StatCard } from "./stat-card"
import { TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { Skeleton } from "~/components/ui/skeleton"
import { createStatCardsReport } from "../../lib/create-stat-cards-report"
import { getStatDescription } from "../../lib/get-stat-description"

interface Props {
  timeRange: TimeRangeEnum
}

export function StatCardGridSection({ timeRange }: Props) {
  const { transactions } = useTransactionContext()

  if (!transactions) {
    return (
      <section className="mb-8 hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-36 w-full" />
        ))}
      </section>
    )
  }

  const report = createStatCardsReport({ transactions, timeRange })

  return (
    <section className="mb-8 hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4">
      {report.map(r => (
        <StatCard
          key={`stat-card-${r.title}`}
          title={r.title}
          value={r.value}
          description={getStatDescription(r.percentDifference, timeRange)}
        />
      ))}
      <Skeleton className="h-36 w-full" /> {/* GOAL API NOT YET INTEGRATED */}
    </section>
  )
}
