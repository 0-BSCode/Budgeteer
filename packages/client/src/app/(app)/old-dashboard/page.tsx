import { Metadata } from "next"
import { IncomeDistributionSection } from "~/features/old-dashboard/income-distribution-section"
import { StatisticsCards } from "~/features/old-dashboard/statistic-cards"
import { TransactionsList } from "~/features/old-dashboard/transactions-list"
import { TransactionsSection } from "~/features/old-dashboard/transactions-section"

export const metadata: Metadata = {
  title: "Dashboard | Budgeteer",
}

export default function Dashboard() {
  return (
    <div className="relative w-full justify-center items-center flex-col col-span-full lg:max-w-none px-4 lg:px-0">
      <StatisticsCards />
      <TransactionsSection />
      <IncomeDistributionSection />
      <TransactionsList />
    </div>
  )
}
