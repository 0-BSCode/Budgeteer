import * as React from "react"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"
import { StatCard } from "./stat-card"
import { statisticsCategories } from "~/types/constants/statistics-categories"
import { TimeRangeEnum } from "~/types/enums/time-range-enum"

export function StatisticsCarousel() {
  return (
    <Carousel className="w-[80%] max-w-xs pb-2 lg:hidden lg:w-full">
      <CarouselContent>
        {statisticsCategories.map(category => (
          <CarouselItem key={category}>
            <div className="p-1">
              <StatCard statisticsCategory={category} timeRange={TimeRangeEnum.DAILY} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
