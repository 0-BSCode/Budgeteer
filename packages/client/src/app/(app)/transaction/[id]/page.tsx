import EditTransactionForm from "~/features/transaction/components/edit-transaction-form"

export default async function EditTransactionPage({ params }: { params: Promise<{ id: string }> }) {
  const transactionId = (await params).id

  return (
    <div className="col-span-full">
      <h1 className="mb-8 text-center text-3xl font-bold">Edit Transaction</h1>
      <EditTransactionForm id={transactionId} />
    </div>
  )
}
