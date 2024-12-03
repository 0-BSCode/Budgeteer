import CreateTransactionForm from "~/features/transaction/components/create-transaction-form"

export default function CreateTransactionPage() {
  return (
    <div className="col-span-full">
      <h1 className="mb-8 text-center text-3xl font-bold">Create Transaction</h1>
      <CreateTransactionForm />
    </div>
  )
}
