import Navbar from "~/components/layout/navbar"
import Footer from "~/components/layout/footer"
import { UserContextProvider } from "~/features/user/providers/user-context-provider"
import { TransactionContextProvider } from "~/features/transaction/providers/transaction-provider"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserContextProvider>
        <TransactionContextProvider>
          <Navbar />
          {/* Height is: screen - y-margins - header - footer - 1px offset to remove scrollbar */}
          <main className="container mx-auto my-8 flex min-h-[calc(100vh-64px-64px-96px-1px)] max-w-screen-xl flex-grow auto-rows-auto flex-col gap-4 px-4 md:grid md:grid-cols-12 md:px-10">
            {children}
          </main>
          <Footer />
        </TransactionContextProvider>
      </UserContextProvider>
    </>
  )
}
