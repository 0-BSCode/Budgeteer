import { MinusIcon, PlusIcon } from "lucide-react"
import { TransactionTypeEnumValues } from "@budgeteer/types"
import { convertToTitleCase } from "~/lib/convertToTitleCase"

interface TransactionProps {
  type: string
  description: string
}

export function Transaction({ type, description }: TransactionProps) {
  return (
    <div className="w-full flex gap-4 justify-between items-center pb-6">
      <div className="flex gap-4 items-center">
        <div className="p-2 rounded-full bg-background border-2 border-outline">
          {type === TransactionTypeEnumValues.INCOME ? (
            <PlusIcon className="w-4 h-4 lg:w-6 lg:h-6" />
          ) : (
            <MinusIcon className="w-4 h-4 lg:w-6 lg:h-6" />
          )}
        </div>
        <div className="flex flex-col ">
          <p className="text-sm lg:text-base text-foreground font-semibold">{convertToTitleCase(type)}</p>
          <p className="text-[10px] lg:text-xs font-normal text-muted-foreground font truncate">{description}</p>
        </div>
      </div>
      <p className="text-xl lg:text-2xl text-foreground font-bold pb-2">₱123.45</p>
    </div>
  )
}
