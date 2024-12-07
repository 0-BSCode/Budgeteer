import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TransactionsDataTable } from "~/features/transaction/components/transaction-data-table"

export default function QueryTransactionPage() {
  return (
    <div className="col-span-full">
      <Link href="/" className="flex items-center gap-2 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </Link>
      <h1 className="mb-8 text-center text-3xl font-bold">Query Transactions</h1>
      <TransactionsDataTable />
    </div>
  )
}
