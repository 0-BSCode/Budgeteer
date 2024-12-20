import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet"
import { ModeToggle } from "~/components/ui/mode-toggle"

import NavbarLinks from "./navbar-links"
import UserDropdown from "./user-dropdown"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-accent/80 px-4 backdrop-blur-sm dark:bg-background/80 md:px-6">
      {/* Navigation links that will only show in larger screens */}
      <nav className="hidden flex-col gap-6 font-medium md:flex md:flex-row md:items-center md:gap-1">
        <Link className="flex items-center gap-2" href="/">
          <div className="h-10 w-10">
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
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:hidden"
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
            <div className="h-12 w-12">
              <Image src="/logo.webp" width={512} height={512} alt="Logo" />
            </div>
            <span className="text-2xl font-bold">Budgeteer</span>
          </div>
          <nav className="mt-4">
            <NavbarLinks className="w-full justify-start text-lg font-medium" />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />
        <UserDropdown />
      </div>
    </header>
  )
}
