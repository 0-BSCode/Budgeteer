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
  Cell,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, CalendarIcon, ExternalLinkIcon, FilterIcon, TrashIcon } from "lucide-react"
import { TdHTMLAttributes, useEffect, useState } from "react"
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import Link from "next/link"
import { Badge } from "~/components/ui/badge"

const incomeCategoryList = Object.values(IncomeCategoryEnumValues).map(incomeCategory => ({
  value: incomeCategory,
  label: convertToTitleCase(incomeCategory),
}))

const expenseCategoryList = Object.values(ExpenseCategoryEnumValues).map(expenseCategory => ({
  value: expenseCategory,
  label: convertToTitleCase(expenseCategory),
}))

const transactionTableColumns: ColumnDef<TransactionDto>[] = [
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

const determineCellAlignment = (cell: TdHTMLAttributes<HTMLTableCellElement>) => {
  const [_id, tag] = cell.id!.split("_")
  switch (tag) {
    case "type":
    case "category":
      return "center"
    case "amount":
    case "date":
      return "right"
    default:
      return "left"
  }
}

const renderCellContent = (cell: Cell<TransactionDto, unknown>) => {
  const [_id, tag] = cell.id!.split("_")
  const content = flexRender(cell.column.columnDef.cell, cell.getContext())
  switch (tag) {
    case "description":
      return (
        <Link key={cell.id} href={`/transaction/${cell.row.original.id}`} className="pl-4 hover:underline">
          <ExternalLinkIcon className="mr-2 inline h-4 w-4" />
          {content}
        </Link>
      )
    case "type":
      return (
        <Badge
          variant={"outline"}
          className={cn("font-bold", {
            "bg-red-400 text-slate-900": cell.row.original.type === "EXPENSE",
            "bg-green-400 text-slate-900": cell.row.original.type === "INCOME",
          })}
        >
          {content}
        </Badge>
      )
    case "category":
      return <div className="font-thin">{content}</div>
    case "date":
      return <div className="pr-4">{content}</div>
    default:
      return <div>{content}</div>
  }
}

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
    getPaginationRowModel: getPaginationRowModel(),
  })

  const resetFilters = () => {
    setAmountRange([undefined, undefined])
    setDateRange([undefined, undefined])
    setType(undefined)
    setCategories([])
  }

  useEffect(() => {
    table.getColumn("amount")?.setFilterValue(amountRange)
    table.getColumn("date")?.setFilterValue(dateRange)
    table.getColumn("type")?.setFilterValue(type)
    table.getColumn("category")?.setFilterValue(categories)
  }, [amountRange, dateRange, type, categories])

  // TODO: Remove backend endpoint for querying transactions
  return (
    <div className="ml-16 flex flex-col space-y-5">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p>
              <FilterIcon className="mr-2 inline h-4 w-4" />
              Filters
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-6 flex flex-col space-y-5 py-4">
              <div className="flex flex-col space-y-2">
                <p className="font-bold">Amount Range</p>
                <div className="flex items-center space-x-5">
                  <Input
                    placeholder="Minimum amount"
                    type="number"
                    value={amountRange[0] ?? ""}
                    onChange={event => {
                      const newValue = [Number(event.target.value) || undefined, amountRange[1]]
                      setAmountRange(newValue)
                    }}
                    className="max-w-sm"
                  />
                  <p>to</p>
                  <Input
                    placeholder="Maximum amount"
                    type="number"
                    value={amountRange[1] ?? ""}
                    onChange={event => {
                      const newValue = [amountRange[0], Number(event.target.value) || undefined]
                      setAmountRange(newValue)
                    }}
                    className="max-w-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="font-bold">Date Range</p>
                <div className="flex items-center space-x-5">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-[24rem] pl-3 text-left font-normal", !dateRange[0] && "text-muted-foreground")}
                      >
                        {dateRange[0] ? format(dateRange[0], "PPP") : <span>Minimum date</span>}
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
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p>to</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-[24rem] pl-3 text-left font-normal", !dateRange[0] && "text-muted-foreground")}
                      >
                        {dateRange[1] ? format(dateRange[1], "PPP") : <span>Maximum date</span>}
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
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="font-bold">Type</p>
                <Select
                  value={type ?? ""}
                  onValueChange={value => {
                    setType(value as TransactionTypeEnum)

                    // Reset categories
                    setCategories([])
                  }}
                >
                  <SelectTrigger className="flex w-full max-w-sm rounded border border-input px-3 py-1">
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
              <div className="flex flex-col space-y-2">
                <p className="font-bold">Category</p>
                <MultiSelect
                  disabled={!type}
                  className={cn("w-full max-w-sm", {
                    "text-muted-foreground": !type,
                  })}
                  options={type === "INCOME" ? incomeCategoryList : expenseCategoryList}
                  onValueChange={values => {
                    setCategories(values as TransactionCategoryEnum[])
                  }}
                  value={categories}
                  placeholder="Select categories"
                  variant="default"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => resetFilters()}
                className="w-[200px] text-red-500 hover:text-red-300"
              >
                <TrashIcon className="mr-2 inline h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      <p className="text-center">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </p>
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
                    <TableCell key={cell.id} align={determineCellAlignment(cell)}>
                      {renderCellContent(cell)}
                    </TableCell>
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
        <div className="flex w-full justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="w-[100px]"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="w-[100px]"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
