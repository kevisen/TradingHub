import React, { useState } from 'react'

type Props = {
  before?: string
  after?: string
}

export default function BeforeAfterSlider({ before, after }: Props) {
  const [pct, setPct] = useState(50)
  return (
    <div className="border border-border rounded bg-panel p-3">
      <div className="font-medium mb-2">Before / After Comparison</div>
      <div className="relative w-full h-48 overflow-hidden rounded">
        <img src={before} alt="before" className="absolute inset-0 w-full h-full object-cover" />
        <div style={{ width: `${pct}%` }} className="absolute top-0 left-0 h-full overflow-hidden">
          <img src={after} alt="after" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mt-2">
        <input type="range" min={0} max={100} value={pct} onChange={(e) => setPct(Number(e.target.value))} className="w-full" />
      </div>
    </div>
  )
}
