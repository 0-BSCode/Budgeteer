import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { Button } from "~/components/ui/button"
import { LoginForm } from "~/features/auth/components/login-form"

export const metadata: Metadata = {
  title: "Log In | Budgeteer",
}

export default function LoginPage() {
  return (
    <main className="container relative grid h-full flex-col items-center justify-center px-4 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Button asChild variant="ghost" className="absolute right-4 top-4 md:right-8 md:top-8">
        <Link href="/auth/sign-up">Sign Up</Link>
      </Button>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="h-12 w-12">
            <Image src="/logo.webp" width={512} height={512} alt="Logo" />
          </div>
          Budgeteer
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Budgeteer allows me to budget my expenses properly while tracking my income. Reaching my financial
              goals has never been easier!&rdquo;
            </p>
            <footer className="text-sm">Anon</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-[288px] flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Log in to Budgeteer</h1>
            <p className="text-sm text-muted-foreground">Enter your username & password below to log in</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
