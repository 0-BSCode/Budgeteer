import CreateTransactionForm from "~/features/transaction/components/create-transaction-form"

export default function CreateTransactionPage() {
  return (
    <div className="col-span-full">
      <h1 className="text-3xl font-bold text-center mb-8">Create Transaction</h1>
      <CreateTransactionForm />
    </div>
  )
}
