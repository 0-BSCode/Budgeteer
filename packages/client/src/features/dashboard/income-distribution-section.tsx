import { Button } from "~/components/ui/button"
import { GoalCard } from "./goal-card"

export function IncomeDistributionSection() {
  return (
    <div className="col-span-full px-8 pb-8 h-[40%] mb-8">
      <main className="h-full flex-col grid lg:max-w-none grid-cols-12 px-4 lg:px-0 gap-8">
        <div className="col-span-7 h-full">
          <div className="flex flex-col pb-4">
            <h2 className="font-semibold text-2xl">Income Distribution</h2>
            <p className="text-sm font-normal text-muted-foreground">November 1, 2024 - November 8, 2024</p>
          </div>
          <div className="w-full h-full bg-card rounded-lg"></div>
        </div>
        <div className="col-span-5 h-full flex flex-col">
          <div className="flex justify-between w-full items-center pb-8">
            <h2 className="font-semibold text-2xl">Goals</h2>
            <Button className="font-normal text-sm">+ New Goal</Button>
          </div>
          <div className="grid grid-cols-2 grid-flow-row gap-4">
            {[1, 2, 3, 4].map(() => (
              <GoalCard key={Math.random()} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
