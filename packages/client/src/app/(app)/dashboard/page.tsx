import { Metadata } from "next"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { StatisticsCards } from "~/features/dashboard/statistic-cards"

export const metadata: Metadata = {
  title: "Dashboard | Budgeteer",
}

export default function Dashboard() {
  return (
    <main className="container relative h-full flex-col  grid lg:max-w-none lg:grid-cols-12 px-4 lg:px-0">
      <div className=" h-full flex-col col-span-full w-full">
        <div className="col-span-full h-[15%] flex justify-between items-center py-4 px-8">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Budgeteer
          </div>
          <Button asChild variant="ghost" className="">
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>
        <StatisticsCards />
      </div>
    </main>
  )
}
