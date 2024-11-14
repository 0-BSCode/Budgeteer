import { Metadata } from "next"
import { IncomeDistributionSection } from "~/features/dashboard/income-distribution-section"
import { StatisticsCards } from "~/features/dashboard/statistic-cards"
import { TransactionsList } from "~/features/dashboard/transactions-list"
import { TransactionsSection } from "~/features/dashboard/transactions-section"

export const metadata: Metadata = {
  title: "Dashboard | Budgeteer",
}

export default function Dashboard() {
  return (
    <main className="container relative flex-col col-span-full lg:max-w-none px-4 lg:px-0">
      <div className="flex-col w-full justify-center items-center">
        <StatisticsCards />
        <TransactionsSection />
        <IncomeDistributionSection />
        <TransactionsList />
      </div>
    </main>
  )
}
