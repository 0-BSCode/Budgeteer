import { StatCard } from "./stat-card"
import { TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { Skeleton } from "~/components/ui/skeleton"
import { createStatCardsReport } from "../../lib/create-stat-cards-report"
import { getStatDescription } from "../../lib/get-stat-description"
import { useGoalContext } from "~/features/goal/providers/goal-provider"

interface Props {
  timeRange: TimeRangeEnum
}

export function StatCardGridSection({ timeRange }: Props) {
  const { transactions } = useTransactionContext()
  const { goals } = useGoalContext()

  const pendingGoals = goals?.filter(g => !g.isAccomplished)
  const pendingCount = pendingGoals?.length || 0

  const goalsReport = {
    value: pendingCount ? `${pendingCount} goal${pendingCount !== 1 ? "s" : ""}` : "None yet",
    description: pendingCount ? "Need funding" : "You have no pending goals",
  }

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
      {pendingGoals ? (
        <StatCard
          key={`stat-card-pending-goals`}
          title={"Pending goals"}
          value={goalsReport.value}
          description={goalsReport.description}
        />
      ) : (
        <Skeleton className="h-36 w-full" />
      )}
    </section>
  )
}
