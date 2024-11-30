import * as React from "react"

import { Carousel, CarouselContent, CarouselItem } from "~/components/ui/carousel"
import { StatCard } from "./stat-card"
import { statisticsCategories } from "~/types/constants/statistics-categories"
import { TimeRangeEnum } from "~/types/enums/TimeRangeEnum"

export function StatisticsCarousel() {
  return (
    <Carousel className="lg:w-full max-w-xs pb-2 lg:hidden">
      <CarouselContent>
        {statisticsCategories.map(category => (
          <CarouselItem key={category}>
            <div className="px-4 sm:px-0">
              <StatCard statisticsCategory={category} timeRange={TimeRangeEnum.DAILY} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
