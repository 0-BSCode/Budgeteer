import { PlusIcon } from "lucide-react"

export function Transaction() {
  return (
    <div className="w-full flex gap-4 justify-between items-center pb-6">
      <div className="flex gap-4 items-center">
        <div className="p-2 rounded-full bg-background border-2 border-outline">
          <PlusIcon height={25} width={25} />
        </div>
        <div className="flex flex-col">
          <p className="text-base text-foreground font-semibold">Added to your balance</p>
          <p className="text-xs font-normal text-muted-foreground">💸 Salary • 5:00PM, November 3, 2024</p>
        </div>
      </div>
      <p className="text-2xl text-foreground font-bold pb-2">₱123.45</p>
    </div>
  )
}
