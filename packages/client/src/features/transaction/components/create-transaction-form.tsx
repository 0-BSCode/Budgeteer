"use client"

import {
  ExpenseCategoryEnumValues,
  IncomeCategoryEnumValues,
  TransactionCategoryEnum,
  TransactionTypeEnum,
  TransactionTypeEnumValues,
} from "@budgeteer/types"
import { SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem } from "~/components/ui/select"
import useTransaction from "../hooks/use-transaction"
import { useToast } from "~/hooks/use-toast"
import { convertToTitleCase } from "~/lib/convertToTitleCase"

const BLANK_INPUT = ""

export default function CreateTransactionForm() {
  const router = useRouter()
  const { create } = useTransaction()
  const { toast } = useToast()
  const [description, setDescription] = useState(BLANK_INPUT)
  const [date, setDate] = useState(new Date())
  const [type, setType] = useState<TransactionTypeEnum>(TransactionTypeEnumValues.EXPENSE)
  const [category, setCategory] = useState<TransactionCategoryEnum>("OTHER")
  const [amount, setAmount] = useState(BLANK_INPUT)

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handleInputChange: <T>(setFn: Dispatch<SetStateAction<T>>, value: T) => void = (setFn, value) => {
    setFn(value)
  }

  const handleCancelCreating = () => {
    router.push("/dashboard")
  }

  const handleCreateTransaction = async () => {
    try {
      await create({
        description,
        date,
        type,
        category,
        amount: Number(amount),
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
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
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
      </div>

      <div className="flex justify-center">
        <div className="grid gap-3 w-full max-w-md">
          <Button onClick={handleCreateTransaction}>Add Transaction</Button>
          <Button variant="ghost" onClick={handleCancelCreating}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
