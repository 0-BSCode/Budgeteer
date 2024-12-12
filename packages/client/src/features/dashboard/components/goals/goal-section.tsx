import { DashboardSectionHeading } from "../dashboard-section-heading"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { GoalCard } from "./goal-card"
import { useGoalContext } from "~/features/goal/providers/goal-provider"
import { Skeleton } from "~/components/ui/skeleton"

export function GoalSection() {
  const { goals } = useGoalContext()

  const sortedGoals = goals?.sort((a, b) => {
    //  place accomplished goals at the end
    if (a.isAccomplished !== b.isAccomplished) return a.isAccomplished ? 1 : -1

    // sort by deadline in ascending order
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })

  return (
    <section>
      <div className="mb-8 flex w-full items-center justify-between gap-4">
        <DashboardSectionHeading
          className="mb-0"
          title="Goals 🎯"
          description="Track your progress toward key milestones"
        />
        <Button asChild>
          <Link href="/goal/new">
            <Plus /> Create
          </Link>
        </Button>
      </div>
      <div className="grid max-h-[370px] gap-4 overflow-y-auto pr-3">
        {!sortedGoals?.length ? (
          <Skeleton className="h-[370px] w-full" />
        ) : (
          sortedGoals.map(g => <GoalCard goalsList={sortedGoals} goal={g} key={`goal-card-${g.id}`} />)
        )}
      </div>
    </section>
  )
}
