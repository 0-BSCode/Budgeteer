"use client"

import {
  ExpenseCategoryEnumValues,
  IncomeCategoryEnumValues,
  TransactionCategoryEnum,
  TransactionDto,
  TransactionTypeEnum,
  TransactionTypeEnumValues,
} from "@budgeteer/types"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, CalendarIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { useTransactionContext } from "../providers/transaction-provider"
import { convertToTitleCase } from "~/lib/convert-to-title-case"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Calendar } from "~/components/ui/calendar"
import { cn } from "~/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { MultiSelect } from "~/components/ui/multi-select"

export const incomeCategoryList = Object.values(IncomeCategoryEnumValues).map(incomeCategory => ({
  value: incomeCategory,
  label: convertToTitleCase(incomeCategory),
}))

export const expenseCategoryList = Object.values(ExpenseCategoryEnumValues).map(expenseCategory => ({
  value: expenseCategory,
  label: convertToTitleCase(expenseCategory),
}))

export const transactionTableColumns: ColumnDef<TransactionDto>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    filterFn: (row, id, filterValue) => {
      let [min, max]: [number | undefined, number | undefined] = filterValue

      if (min === undefined) {
        min = -Infinity
      }

      if (max === undefined) {
        max = Infinity
      }

      const rowValue = row.getValue<number>(id)

      return rowValue >= min && rowValue <= max
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: "equals",
    cell: ({ row }) => {
      return (
        <div className="font-bold">
          <p>{convertToTitleCase(row.getValue("type"))}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="font-bold">
          <p>{convertToTitleCase(row.getValue("category"))}</p>
        </div>
      )
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date: Date = new Date(row.getValue("date"))
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date))

      return <div className="font-medium">{formatted}</div>
    },
    filterFn: (row, id, filterValue) => {
      let [min, max]: [Date | undefined, Date | undefined] = filterValue

      if (min === undefined) {
        min = new Date(0)
      }

      if (max === undefined) {
        max = new Date()
      }

      const rowValue = row.getValue<Date>(id)

      return rowValue >= min && rowValue <= max
    },
  },
]

export function TransactionsDataTable() {
  const { transactions } = useTransactionContext()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [amountRange, setAmountRange] = useState<(number | undefined)[]>([undefined, undefined])
  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  const [type, setType] = useState<TransactionTypeEnum | undefined>(undefined)
  const [categories, setCategories] = useState<TransactionCategoryEnum[]>([])

  const table = useReactTable({
    data: transactions || [],
    columns: transactionTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <div>
          <Input
            placeholder="Minimum amount"
            type="number"
            value={amountRange[0]}
            onChange={event => {
              const newValue = [Number(event.target.value) || undefined, amountRange[1]]
              setAmountRange(newValue)
              table.getColumn("amount")?.setFilterValue(newValue)
            }}
            className="max-w-sm"
          />
          <Input
            placeholder="Maximum amount"
            type="number"
            value={amountRange[1]}
            onChange={event => {
              const newValue = [amountRange[0], Number(event.target.value) || undefined]
              setAmountRange(newValue)
              table.getColumn("amount")?.setFilterValue(newValue)
            }}
            className="max-w-sm"
          />
        </div>
        <div>
          <div>
            <p>Minimum Date</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full pl-3 text-left font-normal", !dateRange[0] && "text-muted-foreground")}
                >
                  {dateRange[0] ? format(dateRange[0], "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange[0]}
                  onSelect={day => {
                    const newValue = [day, dateRange[1]]
                    setDateRange(newValue)
                    table.getColumn("date")?.setFilterValue(newValue)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <p>Maximum Date</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full pl-3 text-left font-normal", !dateRange[0] && "text-muted-foreground")}
                >
                  {dateRange[1] ? format(dateRange[1], "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateRange[1]}
                  onSelect={day => {
                    const newValue = [dateRange[0], day]
                    setDateRange(newValue)
                    table.getColumn("date")?.setFilterValue(newValue)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>
          <p>Type</p>
          <Select
            value={type}
            onValueChange={value => {
              setType(value as TransactionTypeEnum)
              table.getColumn("type")?.setFilterValue(value)

              // Reset categories
              setCategories([])
              table.getColumn("category")?.setFilterValue([])
            }}
          >
            <SelectTrigger className="flex w-full max-w-md rounded border border-input px-3 py-1">
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
        {type && (
          <div>
            <p>Category</p>
            <MultiSelect
              options={type === "INCOME" ? incomeCategoryList : expenseCategoryList}
              onValueChange={values => {
                setCategories(values as TransactionCategoryEnum[])
                table.getColumn("category")?.setFilterValue(values)
              }}
              value={categories}
              placeholder="Select categories"
              variant="default"
              animation={2}
              maxCount={3}
            />
          </div>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={transactionTableColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
