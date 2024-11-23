"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import Link from "next/link"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"

import { UserCreateDto, UserCreateDtoSchema } from "@budgeteer/types"

import useAuth from "../hooks/use-auth"
import { useToast } from "~/hooks/use-toast"
import { useRouter } from "next/navigation"

interface LoginFormProps {
  className?: string
}

export function LoginForm({ className }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<UserCreateDto>({
    resolver: zodResolver(UserCreateDtoSchema),
  })

  async function onSubmit(values: UserCreateDto) {
    setIsLoading(true)

    try {
      await login(values.username, values.password)
      setIsLoading(false)
      router.replace("/")
    } catch (e) {
      toast({
        variant: "destructive",
        title: "An error occured during login!",
        description: (e as Error).message,
      })
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    autoCapitalize="none"
                    autoComplete="username"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoCapitalize="none" autoCorrect="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Log In
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="underline underline-offset-4 hover:text-primary">
          Sign up
        </Link>{" "}
        instead.
      </div>
    </div>
  )
}
