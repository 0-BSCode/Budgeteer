import { Button } from "~/components/ui/button"
import { GoalCard } from "./goal-card"

export function IncomeDistributionSection() {
  return (
    <div className="col-span-full lg:px-8 pb-8 h-full  lg:mb-8">
      <main className="h-full flex-col grid lg:max-w-none grid-cols-12  lg:px-0 gap-8">
        <div className="col-span-7 h-full">
          <div className="flex-col pb-4 lg:flex hidden">
            <h2 className="font-semibold text-2xl">Income Distribution</h2>
            <p className="text-sm font-normal text-muted-foreground">November 1, 2024 - November 8, 2024</p>
          </div>
          <div className="w-full h-80  bg-gray-200 dark:bg-card rounded-lg lg:block hidden"></div>
        </div>
        <div className="col-span-12 lg:col-span-5 h-full flex flex-col">
          <div className="flex justify-between w-full items-center pb-4 lg:pb-8">
            <h2 className="font-semibold text-2xl">Goals</h2>
            <Button className="lg:block hidden font-normal text-sm">+ New Goal</Button>
            <Button className="font-normal text-sm lg:hidden">+</Button>
          </div>
          <div className="flex lg:grid lg:grid-cols-2 grid-overflow-x overflow-x-scroll lg:overflow-x-hidden gap-4 lg:overflow-y-scroll pb-2 lg:pb-0 lg:h-80 pr-4">
            {[1, 2, 3, 4, 5, 6, 7].map(() => (
              <GoalCard title="Vacation" deadline={new Date().toLocaleDateString()} key={Math.random()} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
