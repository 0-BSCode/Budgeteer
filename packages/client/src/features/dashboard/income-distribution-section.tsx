import { Button } from "~/components/ui/button"
import { GoalCard } from "./goal-card"

export function IncomeDistributionSection() {
  return (
    <div className="col-span-full h-full pb-8 lg:mb-8 lg:px-8">
      <main className="grid h-full grid-cols-12 flex-col gap-8 lg:max-w-none lg:px-0">
        <div className="col-span-7 h-full">
          <div className="hidden flex-col pb-4 lg:flex">
            <h2 className="text-2xl font-semibold">Income Distribution</h2>
            <p className="text-sm font-normal text-muted-foreground">November 1, 2024 - November 8, 2024</p>
          </div>
          <div className="hidden h-80 w-full rounded-lg bg-gray-200 dark:bg-card lg:block"></div>
        </div>
        <div className="col-span-12 flex h-full flex-col lg:col-span-5">
          <div className="flex w-full items-center justify-between pb-4 lg:pb-8">
            <h2 className="text-2xl font-semibold">Goals</h2>
            <Button className="hidden text-sm font-normal lg:block">+ New Goal</Button>
            <Button className="text-sm font-normal lg:hidden">+</Button>
          </div>
          <div className="grid-overflow-x flex gap-4 overflow-x-scroll pb-2 pr-4 lg:grid lg:h-80 lg:grid-cols-2 lg:overflow-x-hidden lg:overflow-y-scroll lg:pb-0">
            {[1, 2, 3, 4, 5, 6, 7].map(() => (
              <GoalCard title="Vacation" deadline={new Date().toLocaleDateString()} key={Math.random()} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
