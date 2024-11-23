import { Metadata } from "next"
import Link from "next/link"

import { Button } from "~/components/ui/button"
import { SignUpForm } from "~/features/auth/components/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up | Budgeteer",
}

export default function SignUpPage() {
  return (
    <main className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 px-4 lg:px-0">
      <Button asChild variant="ghost" className="absolute right-4 top-4 md:right-8 md:top-8">
        <Link href="/auth/login">Log In</Link>
      </Button>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
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
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create a Budgeteer account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your desired username & password below to create your account
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </main>
  )
}
