import React, { Suspense } from 'react'

const CandleChart = React.lazy(() => import('./CandleChart'))
const StaticChartBreakdown = React.lazy(() => import('./StaticChartBreakdown'))
const BeforeAfterSlider = React.lazy(() => import('./BeforeAfterSlider'))

export default function ChartPanel() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<div className="text-secondaryText">Loading charts...</div>}>
        <CandleChart />
        <div className="grid md:grid-cols-2 gap-3">
          <StaticChartBreakdown />
          <BeforeAfterSlider />
        </div>
      </Suspense>
    </div>
  )
}
