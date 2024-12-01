import { TransactionContextProvider } from "~/features/transaction/providers/transaction-provider"

export default function UsesTransactionsLayout({ children }: { children: React.ReactNode }) {
  return <TransactionContextProvider>{children}</TransactionContextProvider>
}
