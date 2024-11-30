import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"
import { TimeRangeEnum } from "~/types/enums/TimeRangeEnum"
import { StatisticsCategoryEnumSchema } from "~/types/enums/StatisticsCategoryEnum"
import { MobileStatWidget } from "./mobile-stat-widget"
import { cn } from "~/lib/utils"

interface Props {
  timeRange: TimeRangeEnum
  className?: string
}

export function MobileStatCarousel({ timeRange, className }: Props) {
  return (
    <div className={cn("max-w-sm", className)}>
      <Carousel>
        <CarouselContent>
          {StatisticsCategoryEnumSchema._def.values.map(category => {
            return (
              <CarouselItem key={`mobile-stat-widget-${category}`}>
                <MobileStatWidget title={category} value="₱123.45" description={timeRange} />
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
