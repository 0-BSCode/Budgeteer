"use client"

import {
  ExpenseCategoryEnumValues,
  IncomeCategoryEnumValues,
  TransactionDto,
  TransactionTypeEnumValues,
  TransactionUpdateDto,
} from "@budgeteer/types"
import { useEffect, useState } from "react"
import useTransaction from "../hooks/use-transaction"
import { CalendarIcon, LoaderCircle } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { useForm } from "react-hook-form"
import { RawTransactionCreateDto, RawTransactionCreateDtoSchema } from "~/types/entities/raw-transaction-create.dto"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "~/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Input } from "~/components/ui/input"
import { Popover, PopoverContent } from "@radix-ui/react-popover"
import { TimePicker } from "~/components/ui/datetime-picker"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { format } from "date-fns"
import { PopoverTrigger } from "~/components/ui/popover"
import { Calendar } from "~/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { convertToTitleCase } from "~/lib/convertToTitleCase"
import Link from "next/link"
import { isEqual } from "date-fns"
import { useTransactionContext } from "../providers/transaction-provider"

interface Props {
  id: string
}

export default function EditTransactionForm({ id }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [transaction, setTransaction] = useState<TransactionDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getTransaction, update, remove } = useTransaction()
  const { invalidateTransactionCache } = useTransactionContext()

  const form = useForm<RawTransactionCreateDto>({
    resolver: zodResolver(RawTransactionCreateDtoSchema),
  })

  const onSubmit = async (values: RawTransactionCreateDto) => {
    setIsLoading(true)
    try {
      const updatedTransaction: TransactionUpdateDto = {
        ...(values.amount !== transaction?.amount && { amount: values.amount }),
        ...(values.category !== transaction?.category && { category: values.category }),
        ...(transaction && !isEqual(values.date, transaction.date) && { date: values.date }),
        ...(values.description !== transaction?.description && { description: values.description }),
        ...(values.type !== transaction?.type && { type: values.type }),
      }

      if (Object.keys(updatedTransaction).length > 0) {
        await update(id, updatedTransaction)
        toast({
          variant: "success",
          title: "Update successful!",
          description: "Successfully updated transaction",
        })

        if (invalidateTransactionCache) {
          invalidateTransactionCache()
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
      // TODO: Add modal to confirm deletion
      await remove(id)

      toast({
        variant: "success",
        title: "Deletion successful!",
        description: "Successfully deleted transaction",
      })

      if (invalidateTransactionCache) {
        invalidateTransactionCache()
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
    getTransaction(id).then(setTransaction)
  }, [])

  if (!transaction) {
    return <LoaderCircle className="mx-auto h-4 w-4 animate-spin" />
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-md flex-col gap-y-4">
          <FormField
            control={form.control}
            name="description"
            defaultValue={transaction.description}
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
            defaultValue={transaction.amount}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={transaction.date}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Date</FormLabel>
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
          <FormField
            control={form.control}
            defaultValue={transaction.type}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={value => {
                    form.setValue(
                      "category",
                      value === TransactionTypeEnumValues.EXPENSE
                        ? ExpenseCategoryEnumValues.OTHER
                        : IncomeCategoryEnumValues.OTHER,
                    )
                    field.onChange(value)
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="block w-full max-w-md rounded border border-input px-3 py-1">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {Object.values(TransactionTypeEnumValues).map(type => (
                      <SelectItem key={type} value={type}>
                        {convertToTitleCase(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={transaction.category}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={value => {
                    field.onChange(value)
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="block w-full max-w-md rounded border border-input px-3 py-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {form.getValues("type") === TransactionTypeEnumValues.EXPENSE &&
                      Object.values(ExpenseCategoryEnumValues).map(category => (
                        <SelectItem key={category} value={category}>
                          {convertToTitleCase(category)}
                        </SelectItem>
                      ))}
                    {form.getValues("type") === TransactionTypeEnumValues.INCOME &&
                      Object.values(IncomeCategoryEnumValues).map(category => (
                        <SelectItem key={category} value={category}>
                          {convertToTitleCase(category)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full max-w-md space-y-4 py-8">
            <div className="grid w-full max-w-md gap-3">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Update Transaction
              </Button>
              <Button variant="destructive" disabled={isLoading} onClick={handleDeletion}>
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Delete Transaction
              </Button>
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
