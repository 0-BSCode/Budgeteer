import { convertToTitleCase } from "~/lib/convert-to-title-case"
import { formatValueWithPeso } from "~/features/transaction/lib/format-value-with-peso"
import { TransactionTypeEnumSchema } from "@budgeteer/types"
import Link from "next/link"

interface Props {
  id: string
  type: string
  description: string
  category: string
  value: number
}

export function TransactionItem({ id, type, description, category, value }: Props) {
  const { data, success } = TransactionTypeEnumSchema.safeParse(type)
  const transactionType = success ? data : undefined

  return (
    <Link
      href={`/transaction/${id}`}
      className="mb-4 flex w-full items-center justify-between gap-4 px-1 transition-colors hover:bg-muted"
    >
      <div className="flex items-center gap-4">
        <div className="flex max-w-64 flex-col">
          <p className="truncate font-semibold text-foreground">{convertToTitleCase(description)}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">{category}</p>
        </div>
      </div>
      <p className="text-lg font-bold text-foreground lg:text-2xl">{formatValueWithPeso(value, transactionType)}</p>
    </Link>
  )
}
