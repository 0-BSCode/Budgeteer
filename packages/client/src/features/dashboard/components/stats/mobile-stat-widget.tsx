import { cn } from "~/lib/utils"

interface Props {
  title: string
  value: string
  description: string
  className?: string
}

export function MobileStatWidget({ title, value, description, className }: Props) {
  return (
    <section className={cn("flex flex-col items-center gap-2", className)}>
      <p className="text-muted-foreground">{title}</p>
      <p className="max-w-[10ch] truncate text-4xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </section>
  )
}
