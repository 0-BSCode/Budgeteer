"use client"

import { ExpenseCategoryEnumValues, IncomeCategoryEnumValues, TransactionTypeEnumValues } from "@budgeteer/types"
import { SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem } from "~/components/ui/select"
import useTransaction from "../hooks/use-transaction"
import { useToast } from "~/hooks/use-toast"
import { convertToTitleCase } from "~/lib/convertToTitleCase"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Calendar } from "~/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { CalendarIcon, LoaderCircle } from "lucide-react"
import { cn } from "~/lib/utils"
import { format } from "date-fns"
import { RawTransactionCreateDto, RawTransactionCreateDtoSchema } from "~/types/entities/raw-transaction-create.dto"

export default function CreateTransactionForm() {
  const router = useRouter()
  const { create } = useTransaction()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RawTransactionCreateDto>({
    resolver: zodResolver(RawTransactionCreateDtoSchema),
    defaultValues: {
      type: TransactionTypeEnumValues.EXPENSE,
      category: ExpenseCategoryEnumValues.OTHER,
    },
  })

  const handleCancelCreating = () => {
    router.push("/dashboard")
  }

  const onSubmit = async (values: RawTransactionCreateDto) => {
    setIsLoading(true)
    try {
      await create({
        description: values.description,
        date: values.date,
        type: values.type,
        category: values.category,
        amount: values.amount,
      })
      toast({
        variant: "success",
        title: "Creation successful!",
        description: "Successfully created new transaction",
      })
      router.push("/dashboard")
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2">
                <FormLabel>Transaction Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
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
                Add Transaction
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
