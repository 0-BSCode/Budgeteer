import { MinusIcon, PlusIcon } from "lucide-react"
import { TransactionTypeEnumValues } from "@budgeteer/types"
import { convertToTitleCase } from "~/lib/convertToTitleCase"

interface TransactionProps {
  type: string
  description: string
}

export function Transaction({ type, description }: TransactionProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 pb-6">
      <div className="flex items-center gap-4">
        <div className="border-outline rounded-full border-2 bg-background p-2">
          {type === TransactionTypeEnumValues.INCOME ? (
            <PlusIcon className="h-4 w-4 lg:h-6 lg:w-6" />
          ) : (
            <MinusIcon className="h-4 w-4 lg:h-6 lg:w-6" />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-foreground lg:text-base">{convertToTitleCase(type)}</p>
          <p className="font truncate text-[10px] font-normal text-muted-foreground lg:text-xs">{description}</p>
        </div>
      </div>
      <p className="pb-2 text-xl font-bold text-foreground lg:text-2xl">₱123.45</p>
    </div>
  )
}
