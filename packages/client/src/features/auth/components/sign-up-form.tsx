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

import { UserCreateDtoSchema, UserCreateDto } from "@budgeteer/types"

import useAuth from "../hooks/use-auth"
import { useToast } from "~/hooks/use-toast"
import { useRouter } from "next/navigation"

interface SignUpFormProps {
  className?: string
}

export function SignUpForm({ className }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<UserCreateDto>({
    resolver: zodResolver(UserCreateDtoSchema),
  })

  async function onSubmit(values: UserCreateDto) {
    setIsLoading(true)

    try {
      await register(values.username, values.password)
      setIsLoading(false)
      router.replace("/")
    } catch (e) {
      toast({
        variant: "destructive",
        title: "An error occured during registration!",
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
                  <Input placeholder="Enter your username" autoCapitalize="none" autoCorrect="off" {...field} />
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
                  <Input autoCapitalize="none" autoCorrect="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </form>
      </Form>

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
