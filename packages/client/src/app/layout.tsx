import type { Metadata } from "next"
import "./globals.css"
import { Manrope } from "next/font/google"
import { ThemeProvider } from "~/components/providers/theme-provider"
import { Toaster } from "~/components/ui/toaster"

const font = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Budgeteer",
  description: "A personal finance tracker.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" translate="no">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
