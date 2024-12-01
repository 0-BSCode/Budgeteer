import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"
import { TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import { MobileStatWidget } from "./mobile-stat-widget"
import { cn } from "~/lib/utils"
import { useTransactionContext } from "~/features/transaction/providers/transaction-provider"
import { createStatCardsReport } from "../../lib/create-stat-cards-report"
import { getStatDescription } from "../../lib/get-stat-description"
import { Skeleton } from "~/components/ui/skeleton"

interface Props {
  timeRange: TimeRangeEnum
  className?: string
}

export function MobileStatCarousel({ timeRange, className }: Props) {
  const { transactions } = useTransactionContext()

  if (!transactions) {
    return <Skeleton className="h-24 w-full max-w-sm" />
  }

  const report = createStatCardsReport({ transactions, timeRange })

  return (
    <div className={cn("max-w-sm", className)}>
      <Carousel>
        <CarouselContent>
          {report.map(r => {
            return (
              <CarouselItem key={`mobile-stat-widget-${r.title}`}>
                <MobileStatWidget
                  title={r.title}
                  value={`${r.value}`}
                  description={getStatDescription(r.percentDifference, timeRange)}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="left-11 border-none bg-transparent" />
        <CarouselNext className="right-11 border-none bg-transparent" />
      </Carousel>
    </div>
  )
}
