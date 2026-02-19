import React, { useState } from 'react'

type Props = {
  image?: string
}

export default function StaticChartBreakdown({ image }: Props) {
  const [overlay, setOverlay] = useState(true)
  return (
    <div className="border border-border rounded bg-panel p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Static Chart Breakdown</div>
        <label className="text-sm text-secondaryText">
          <input type="checkbox" checked={overlay} onChange={() => setOverlay((s) => !s)} className="mr-2" /> Overlay
        </label>
      </div>

      <div className="relative">
        <div className="w-full h-48 bg-black/40 rounded flex items-center justify-center text-secondaryText">{image ? <img src={image} alt="chart" className="max-h-full" /> : 'Chart image placeholder'}</div>
        {overlay && (
          <div className="absolute top-4 left-4 p-2 bg-black/40 border border-border text-xs text-primaryText rounded">Overlay annotations (example)</div>
        )}
      </div>
    </div>
  )
}
