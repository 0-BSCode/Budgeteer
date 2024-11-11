import { PlusIcon } from "lucide-react"

export function Transaction() {
  return (
    <div className="w-full flex gap-4 justify-between items-center pb-6">
      <div className="flex gap-4">
        <div className="p-4 rounded-full bg-gray-300">
          <PlusIcon height={25} width={25} />
        </div>
        <div className="flex flex-col ">
          <p className="text-lg text-black font-semibold">Added to your balance</p>
          <p className="text-sm font-normal text-muted-foreground">💸 Salary • 5:00PM, November 3, 2024</p>
        </div>
      </div>
      <p className="text-3xl text-black font-bold pb-2">₱123.45</p>
    </div>
  )
}
