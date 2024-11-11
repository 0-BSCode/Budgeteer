import Navbar from "~/components/layout/navbar"
import Footer from "~/components/layout/footer"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* Height is: screen - y-margins - header - footer - 1px offset to remove scrollbar */}
      <main className="my-8 container mx-auto px-4 md:px-8 flex max-w-screen-xl auto-rows-auto flex-col gap-4 md:grid md:grid-cols-12 flex-grow h-[calc(100vh-64px-64px-96px-1px)]">
        {children}
      </main>
      <Footer />
    </>
  )
}
