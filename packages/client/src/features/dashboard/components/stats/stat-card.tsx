import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

interface Props {
  title: string
  value: string
  description: string
}

export function StatCard({ title, value, description }: Props) {
  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">{title}</CardTitle>
        <CardDescription>
          <p className="truncate pb-2 text-2xl font-bold text-foreground lg:text-3xl">{value}</p>
          <p className="text-xs font-normal text-muted-foreground lg:text-sm">{description}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
