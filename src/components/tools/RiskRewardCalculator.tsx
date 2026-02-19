import React, { useState } from 'react'

export default function RiskRewardCalculator() {
  const [entry, setEntry] = useState<string>('1.2000')
  const [stop, setStop] = useState<string>('1.1950')
  const [target, setTarget] = useState<string>('1.2100')

  const e = parseFloat(entry)
  const s = parseFloat(stop)
  const t = parseFloat(target)

  const risk = Math.abs(e - s)
  const reward = Math.abs(t - e)
  const rr = risk === 0 ? 0 : +(reward / risk).toFixed(2)
  const rMultiple = risk === 0 ? 0 : +(reward / risk).toFixed(2)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <input className="p-2 bg-panel border border-border rounded" value={entry} onChange={(e) => setEntry(e.target.value)} />
        <input className="p-2 bg-panel border border-border rounded" value={stop} onChange={(e) => setStop(e.target.value)} />
        <input className="p-2 bg-panel border border-border rounded" value={target} onChange={(e) => setTarget(e.target.value)} />
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="p-2 border border-border rounded">Risk: <span className="mono">{risk.toFixed(4)}</span></div>
        <div className="p-2 border border-border rounded">Reward: <span className="mono">{reward.toFixed(4)}</span></div>
        <div className="p-2 border border-border rounded">R multiple: <span className="mono">{rMultiple}</span></div>
      </div>
    </div>
  )
}
