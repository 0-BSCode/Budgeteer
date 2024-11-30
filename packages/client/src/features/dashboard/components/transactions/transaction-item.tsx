import { convertToTitleCase } from "~/lib/convertToTitleCase"

interface Props {
  type: string
  description: string
}

export function TransactionItem({ type, description }: Props) {
  return (
    <div className="w-full flex gap-4 justify-between items-center mb-4">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col max-w-64">
          <p className="text-foreground font-semibold truncate">{convertToTitleCase(type)}</p>
          <p className="text-xs font-normal text-muted-foreground truncate">{description}</p>
        </div>
      </div>
      <p className="text-lg lg:text-2xl text-foreground font-bold">+&nbsp;₱123.45</p>
    </div>
  )
}
