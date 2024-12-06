import { TransactionsDataTable } from "~/features/transaction/components/transaction-data-table"

export default function QueryTransactionPage() {
  return (
    <div className="col-span-full">
      <h1 className="mb-8 text-center text-3xl font-bold">Query Transactions</h1>
      <TransactionsDataTable />
    </div>
  )
}
