"use client"

import { useState } from "react"
import { LoaderCircle } from "lucide-react"
import Link from "next/link"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface SignUpFormProps {
  className?: string
}

export function SignUpForm({ className }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              autoCapitalize="none"
              autoCorrect="off"
              type="password"
              disabled={isLoading}
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </div>
      </form>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
          Log In
        </Link>{" "}
        instead.
      </div>
    </div>
  )
}