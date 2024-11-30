import { cn } from "~/lib/utils"

interface Props {
  title: string
  description: string
  className?: string
}

export function DashboardSectionHeading({ title, description, className }: Props) {
  return (
    <div className={cn("mb-8", className)}>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  )
}
