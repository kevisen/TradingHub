import React from 'react'
const ChartPanel = React.lazy(() => import('../components/charts/ChartPanel'))

export default function ChartsPage() {
  return (
    <div className="bg-panel border border-border rounded p-4">
      <h2 className="font-semibold">Charts</h2>
      <React.Suspense fallback={<div className="text-secondaryText">Loading charts...</div>}>
        <ChartPanel />
      </React.Suspense>
    </div>
  )
}
