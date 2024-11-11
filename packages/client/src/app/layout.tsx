import type { Metadata } from "next"
import "./globals.css"
import { Manrope } from "next/font/google"

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
      <body className={font.className}>{children}</body>
    </html>
  )
}
