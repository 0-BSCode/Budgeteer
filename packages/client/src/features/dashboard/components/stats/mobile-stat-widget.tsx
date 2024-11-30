import { cn } from "~/lib/utils"

interface Props {
  title: string
  value: string
  description: string
  className?: string
}

export function MobileStatWidget({ title, value, description, className }: Props) {
  return (
    <section className={cn("flex flex-col gap-2 items-center", className)}>
      <p className="text-muted-foreground">{title}</p>
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
    </section>
  )
}
