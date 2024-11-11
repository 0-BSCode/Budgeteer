import Image from "next/image"
import Link from "next/link"
import NavbarLinks from "./navbar-links"
import { Menu, CircleUserRound } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet"

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/80 px-4 md:px-6 backdrop-blur-sm">
      {/* Navigation links that will only show in larger screens */}
      <nav className="hidden flex-col gap-6 font-medium md:flex md:flex-row md:items-center md:gap-1">
        <Link className="flex items-center gap-2" href="/">
          <div className="w-12 h-12">
            <Image src="/logo.webp" width={512} height={512} alt="Logo" />
          </div>
          <span className="sr-only">Budgeteer</span>
        </Link>
        <NavbarLinks />
      </nav>

      {/* Mobile side drawer button */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0 md:hidden"
            type="button"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open navigation menu</span>
          </button>
        </SheetTrigger>
        <SheetContent isShowingCloseButton={false} side="left" className="w-full max-w-64 p-4">
          <SheetHeader>
            <SheetTitle className="sr-only">Budgeteer</SheetTitle>
          </SheetHeader>
          <div className="flex items-center gap-1 pr-3">
            <div className="w-12 h-12">
              <Image src="/logo.webp" width={512} height={512} alt="Logo" />
            </div>
            <span className="font-bold text-2xl">Budgeteer</span>
          </div>
          <nav className="mt-4">
            <NavbarLinks className="w-full text-lg justify-start font-medium" />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/80 h-10 w-10 rounded-full"
          type="button"
        >
          <CircleUserRound className="h-5 w-5" />
          <span className="sr-only">Open user menu</span>
        </button>
      </div>
    </header>
  )
}
