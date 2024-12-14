import { convertToTitleCase } from "~/lib/convert-to-title-case"
import { formatValueWithPeso } from "~/features/transaction/lib/format-value-with-peso"
import { TransactionTypeEnumSchema } from "@budgeteer/types"
import Link from "next/link"
import { Card } from "~/components/ui/card"

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
    <Card className="mb-2 rounded-md p-4 transition-colors hover:bg-muted">
      <Link href={`/transaction/${id}`} className="flex w-full items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-4">
          <div className="flex max-w-[15ch] flex-col truncate lg:max-w-56">
            <p className="truncate font-semibold text-foreground">{convertToTitleCase(description)}</p>
            <p className="hidden truncate text-xs font-normal text-muted-foreground lg:block">{category}</p>
            {category.split("•").map((category, index) => (
              <p key={index} className="text-xs font-normal text-muted-foreground lg:hidden">
                {category}
              </p>
            ))}
          </div>
        </div>
        <p className="line-clamp-1 text-base font-bold text-foreground lg:text-2xl">
          {formatValueWithPeso(value, transactionType)}
        </p>
      </Link>
    </Card>
  )
}
