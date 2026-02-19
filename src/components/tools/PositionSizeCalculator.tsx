import React, { useState } from 'react'

export default function PositionSizeCalculator() {
  const [account, setAccount] = useState<string>('10000')
  const [riskPct, setRiskPct] = useState<string>('1')
  const [entry, setEntry] = useState<string>('100')
  const [stop, setStop] = useState<string>('95')

  const acc = parseFloat(account) || 0
  const rp = (parseFloat(riskPct) || 0) / 100
  const e = parseFloat(entry) || 0
  const s = parseFloat(stop) || 0

  const riskPerShare = Math.abs(e - s)
  const riskAmount = acc * rp
  const qty = riskPerShare === 0 ? 0 : Math.floor(riskAmount / riskPerShare)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <input className="p-2 bg-panel border border-border rounded" value={account} onChange={(e) => setAccount(e.target.value)} />
        <input className="p-2 bg-panel border border-border rounded" value={riskPct} onChange={(e) => setRiskPct(e.target.value)} />
        <input className="p-2 bg-panel border border-border rounded" value={entry} onChange={(e) => setEntry(e.target.value)} />
        <input className="p-2 bg-panel border border-border rounded" value={stop} onChange={(e) => setStop(e.target.value)} />
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="p-2 border border-border rounded">Risk/Share: <span className="mono">{riskPerShare.toFixed(4)}</span></div>
        <div className="p-2 border border-border rounded">Risk Amount: <span className="mono">{riskAmount.toFixed(2)}</span></div>
        <div className="p-2 border border-border rounded">Position Size: <span className="mono">{qty}</span></div>
      </div>
    </div>
  )
}
