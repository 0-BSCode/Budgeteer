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
    <main className="container relative col-span-full flex-col px-4 lg:max-w-none lg:px-0">
      <div className="w-full flex-col items-center justify-center">
        <StatisticsCards />
        <TransactionsSection />
        <IncomeDistributionSection />
        <TransactionsList />
      </div>
    </main>
  )
}
