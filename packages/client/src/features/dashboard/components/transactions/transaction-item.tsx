import { convertToTitleCase } from "~/lib/convertToTitleCase"
import { formatValueWithPeso } from "~/features/transaction/lib/format-value-with-peso"
import { TransactionTypeEnumSchema } from "@budgeteer/types"

interface Props {
  type: string
  description: string
  value: number
}

export function TransactionItem({ type, description, value }: Props) {
  const { data, success } = TransactionTypeEnumSchema.safeParse(type)
  const transactionType = success ? data : undefined

  return (
    <div className="mb-4 flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex max-w-64 flex-col">
          <p className="truncate font-semibold text-foreground">{convertToTitleCase(type)}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">{description}</p>
        </div>
      </div>
      <p className="text-lg font-bold text-foreground lg:text-2xl">{formatValueWithPeso(value, transactionType)}</p>
    </div>
  )
}
