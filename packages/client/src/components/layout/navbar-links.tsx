"use client"

import { usePathname } from "next/navigation"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import Link from "next/link"

const navLinks = [{ label: "Dashboard", path: "/" }]

export default function NavbarLinks({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <>
      {navLinks.map(l => (
        <Button
          className={cn(
            "text-muted-foreground transition-colors text-lg hover:text-foreground",
            {
              "text-foreground font-bold": l.path === pathname,
            },
            className,
          )}
          key={l.path}
          asChild
          variant="ghost"
        >
          <Link href={l.path}>{l.label}</Link>
        </Button>
      ))}
    </>
  )
}