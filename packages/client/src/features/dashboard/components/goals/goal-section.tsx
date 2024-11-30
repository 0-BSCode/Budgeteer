import { DashboardSectionHeading } from "../dashboard-section-heading"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { GoalCard } from "./goal-card"

export function GoalSection() {
  return (
    <section>
      <div className="flex justify-between w-full items-center mb-8 gap-4">
        <DashboardSectionHeading
          className="mb-0"
          title="Goals 🎯"
          description="Track your progress toward key milestones"
        />
        <Button asChild>
          <Link href="/transaction/new">
            <Plus /> New <span className="hidden lg:inline">Goal</span>
          </Link>
        </Button>
      </div>
      <div className="overflow-y-auto max-h-[370px] pr-2 grid gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map(k => (
          <GoalCard key={`goal-card-${k}`} title="Cool goal" deadline="Sunday" />
        ))}
      </div>
    </section>
  )
}