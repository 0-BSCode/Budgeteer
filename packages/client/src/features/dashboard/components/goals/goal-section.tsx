import { DashboardSectionHeading } from "../dashboard-section-heading"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { GoalCard } from "./goal-card"
import { useGoalContext } from "~/features/goal/providers/goal-provider"
import { Skeleton } from "~/components/ui/skeleton"
import dayjs from "dayjs"

export function GoalSection() {
  const { goals } = useGoalContext()

  console.log(goals)
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
            <Plus /> New <span className="hidden lg:inline">Goal</span>
          </Link>
        </Button>
      </div>
      <div className="grid max-h-[370px] gap-4 overflow-y-auto pr-3">
        {!goals?.length ? (
          <Skeleton className="h-[370px] w-full" />
        ) : (
          goals.map(g => (
            <GoalCard
              key={`goal-card-${g.id}`}
              amount={g.amount}
              description={g.description}
              deadline={`${dayjs(g.deadline).format("MMMM D, YYYY")}`}
            />
          ))
        )}
      </div>
    </section>
  )
}
