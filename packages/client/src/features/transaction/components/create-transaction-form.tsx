"use client"

import {
  ExpenseCategoryEnumValues,
  IncomeCategoryEnumValues,
  TransactionCreateDto,
  TransactionCreateDtoSchema,
  TransactionTypeEnum,
  TransactionTypeEnumValues,
} from "@budgeteer/types"
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Calendar } from "~/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "~/lib/utils"
import { format } from "date-fns"

const DEFAULT_ID = -1

export default function CreateTransactionForm() {
  const router = useRouter()
  const { create } = useTransaction()
  const { toast } = useToast()
  const [type, setType] = useState<TransactionTypeEnum>(TransactionTypeEnumValues.EXPENSE)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TransactionCreateDto>({
    resolver: zodResolver(TransactionCreateDtoSchema),
    defaultValues: {
      // TODO: Don't include this (populated on the db)
      userId: DEFAULT_ID,
    },
  })

  const handleCancelCreating = () => {
    router.push("/dashboard")
  }

  const onSubmit = async (values: TransactionCreateDto) => {
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
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
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
                <FormDescription>When did this transaction occur?</FormDescription>
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
                  onValueChange={value => {
                    field.onChange(value)
                    setType(value as TransactionTypeEnum)
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value={TransactionTypeEnumValues.EXPENSE}>Expense</SelectItem>
                    <SelectItem value={TransactionTypeEnumValues.INCOME}>Income</SelectItem>
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
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {type === TransactionTypeEnumValues.EXPENSE &&
                      Object.values(ExpenseCategoryEnumValues).map(category => (
                        <SelectItem key={category} value={category}>
                          {convertToTitleCase(category)}
                        </SelectItem>
                      ))}
                    {type === TransactionTypeEnumValues.INCOME &&
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
          <Button type="submit" disabled={isLoading}>
            Add Transaction
          </Button>
        </form>
      </Form>

      {/* <div className="flex flex-col items-center gap-4">
        <div className="w-full space-y-2 max-w-md">
          <Label htmlFor="transaction-description">Description</Label>
          <Input
            id="transaction-description"
            type="text"
            value={description}
            onChange={e => handleInputChange<string>(setDescription, e.target.value)}
          />
        </div>
        <div className="w-full space-y-2 max-w-md">
          <Label htmlFor="transaction-date">Date</Label>
          <Input
            id="transaction-date"
            type="date"
            className="max-w-md flex flex-col"
            value={formatDate(date)}
            onChange={e => handleInputChange<Date>(setDate, new Date(e.target.value))}
          />
        </div>
        <div className="w-full space-y-2 max-w-md">
          <Label htmlFor="transaction-amount">Amount</Label>
          <Input
            id="transaction-amount"
            type="number"
            className="max-w-md"
            value={amount}
            onChange={e => handleInputChange<string>(setAmount, e.target.value)}
          />
        </div>
        <div className="w-full space-y-2 max-w-md">
          <Label htmlFor="transaction-type" className="block">
            Type
          </Label>
          <Select
            value={type}
            onValueChange={e =>
              handleInputChange<TransactionTypeEnum>(setType, e as keyof typeof TransactionTypeEnumValues)
            }
          >
            <SelectTrigger className="w-full max-w-md rounded border border-input px-3 py-1">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TransactionTypeEnumValues).map(type => (
                <SelectItem key={type} value={type}>
                  {convertToTitleCase(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full space-y-2 max-w-md">
          <Label htmlFor="transaction-category" className="block">
            Category
          </Label>
          <Select
            value={category}
            onValueChange={e => handleInputChange<TransactionCategoryEnum>(setCategory, e as TransactionCategoryEnum)}
          >
            <SelectTrigger className="w-full max-w-md rounded border border-input px-3 py-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {type === TransactionTypeEnumValues.EXPENSE &&
                Object.values(ExpenseCategoryEnumValues).map(category => (
                  <SelectItem key={category} value={category}>
                    {convertToTitleCase(category)}
                  </SelectItem>
                ))}
              {type === TransactionTypeEnumValues.INCOME &&
                Object.values(IncomeCategoryEnumValues).map(category => (
                  <SelectItem key={category} value={category}>
                    {convertToTitleCase(category)}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div> */}

      <div className="flex justify-center">
        <div className="grid gap-3 w-full max-w-md">
          <Button variant="ghost" onClick={handleCancelCreating}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
