"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useToast } from "~/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Calendar } from "~/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { CalendarIcon, LoaderCircle } from "lucide-react"
import { cn } from "~/lib/utils"
import { format } from "date-fns"
import { TimePicker } from "~/components/ui/datetime-picker"
import useGoal from "../hooks/use-goal"
import { useGoalContext } from "../providers/goal-provider"
import { RawGoalCreateDto, RawGoalCreateDtoSchema } from "~/types/entities/raw-goal-create.dto"

export default function CreateGoalForm() {
  const router = useRouter()
  const { create } = useGoal()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { invalidateGoalCache } = useGoalContext()

  const form = useForm<RawGoalCreateDto>({
    resolver: zodResolver(RawGoalCreateDtoSchema),
  })

  const handleCancelCreating = () => {
    router.push("/")
  }

  const onSubmit = async (values: RawGoalCreateDto) => {
    if (values.deadline <= new Date()) {
      form.setError("deadline", {
        type: "manual",
        message: "Deadline must be in the future",
      })
      return
    }

    setIsLoading(true)
    try {
      await create({
        description: values.description,
        deadline: values.deadline,
        amount: values.amount,
      })
      toast({
        variant: "success",
        title: "Creation successful!",
        description: "Successfully created new goal",
      })

      if (invalidateGoalCache) {
        invalidateGoalCache()
      }

      router.push("/")
    } catch (e) {
      toast({
        variant: "destructive",
        title: "An error occured!",
        description: (e as Error).message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-md flex-col gap-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number" onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={new Date()}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP HH:mm:ss") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <FormMessage />
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    <div className="border-t border-border p-3">
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <div className="w-full max-w-md space-y-4 py-8">
            <div className="grid w-full max-w-md gap-3">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Add Goal
              </Button>
              <Button variant="ghost" onClick={handleCancelCreating} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
