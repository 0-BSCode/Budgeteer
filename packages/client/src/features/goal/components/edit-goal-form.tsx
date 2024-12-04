"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
import { format, isEqual } from "date-fns"
import { TimePicker } from "~/components/ui/datetime-picker"
import useGoal from "../hooks/use-goal"
import { useGoalContext } from "../providers/goal-provider"
import { RawGoalCreateDto, RawGoalCreateDtoSchema } from "~/types/entities/raw-goal-create.dto"
import { GoalDto, GoalUpdateDto } from "@budgeteer/types"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "~/components/ui/dialog"
import Link from "next/link"

interface Props {
  id: string
}
export default function EditGoalForm({ id }: Props) {
  const router = useRouter()
  const { getGoal, update, remove } = useGoal()
  const [goal, setGoal] = useState<GoalDto | null>(null)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { invalidateGoalCache } = useGoalContext()

  const form = useForm<RawGoalCreateDto>({
    resolver: zodResolver(RawGoalCreateDtoSchema),
  })

  const onSubmit = async (values: RawGoalCreateDto) => {
    setIsLoading(true)
    try {
      const updatedGoal: GoalUpdateDto = {
        ...(values.amount !== goal?.amount && { amount: values.amount }),
        ...(goal && !isEqual(values.deadline, goal.deadline) && { deadline: values.deadline }),
        ...(values.description !== goal?.description && { description: values.description }),
      }

      if (Object.keys(updatedGoal).length > 0) {
        await update(id, updatedGoal)
        toast({
          variant: "success",
          title: "Update successful!",
          description: "Successfully updated goal",
        })

        if (invalidateGoalCache) {
          invalidateGoalCache()
        }
      } else {
        toast({
          variant: "destructive",
          title: "Nothing to update!",
          description: "No changes were made",
        })
      }
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

  const handleDeletion = async () => {
    setIsLoading(true)
    try {
      await remove(id)

      toast({
        variant: "success",
        title: "Deletion successful!",
        description: "Successfully deleted goal",
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

  useEffect(() => {
    getGoal(id).then(setGoal)
  }, [])

  if (!goal) {
    return <LoaderCircle className="mx-auto h-4 w-4 animate-spin" />
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-md flex-col gap-y-4">
          <FormField
            control={form.control}
            name="description"
            defaultValue={goal.description}
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
            defaultValue={goal.amount}
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
            defaultValue={goal.deadline}
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
                Update Goal
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" disabled={isLoading}>
                    Delete Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Delete Goal</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this goal?</DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                      <Button variant="ghost">Close</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDeletion}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Link href="/" className="w-full text-center">
                Go Back
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
