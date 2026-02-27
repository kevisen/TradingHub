import React, { useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import DragInteractionShell from '@/components/animations/DragInteractionShell'
import PnlPulseValue from '@/components/animations/PnlPulseValue'

function generateEquity(start: number, trades: number, winRate: number, avgR: number, stdDev: number) {
  const equity = [start]
  for (let i = 0; i < trades; i++) {
    const win = Math.random() < winRate
    const r = avgR + (Math.random() - 0.5) * stdDev
    const change = win ? start * (r / 100) : -start * (Math.abs(r) / 100)
    const next = Math.max(0, equity[equity.length - 1] + change)
    equity.push(next)
  }
  return equity.map((v, i) => ({ index: i, value: +v.toFixed(2) }))
}

export default function PLSimulator() {
  const [start, setStart] = useState<string>('10000')
  const [trades, setTrades] = useState<string>('50')
  const [winRate, setWinRate] = useState<string>('0.55')
  const [avgR, setAvgR] = useState<string>('1')
  const [stdDev, setStdDev] = useState<string>('0.5')

  const data = generateEquity(parseFloat(start) || 0, parseInt(trades) || 0, parseFloat(winRate) || 0, parseFloat(avgR) || 0, parseFloat(stdDev) || 0)
  const startCapital = parseFloat(start) || 0
  const lastValue = data.length ? data[data.length - 1].value : 0
  const pnlValue = +(lastValue - startCapital).toFixed(2)
  const pnlSign = pnlValue >= 0 ? '+' : ''
  const pnlClass = pnlValue >= 0 ? 'text-green-300' : 'text-red-300'

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-2">
        <input className="p-2 bg-panel border border-border rounded" value={start} onChange={(e) => setStart(e.target.value)} />
        <input className="p-2 bg-panel border border-border rounded" value={trades} onChange={(e) => setTrades(e.target.value)} />
        <input className="p-2 bg-panel border border-border rounded" value={winRate} onChange={(e) => setWinRate(e.target.value)} />
        <input className="p-2 bg-panel border border-border rounded" value={avgR} onChange={(e) => setAvgR(e.target.value)} />
        <input className="p-2 bg-panel border border-border rounded" value={stdDev} onChange={(e) => setStdDev(e.target.value)} />
      </div>

      <div className="flex items-center justify-between text-sm text-secondaryText px-1">
        <span>PnL</span>
        <PnlPulseValue value={pnlValue} className={`font-semibold ${pnlClass}`}>
          {pnlSign}${Math.abs(pnlValue).toFixed(2)}
        </PnlPulseValue>
      </div>

      <DragInteractionShell className="rounded">
        <div className="h-64 border border-border rounded p-2 bg-panel" data-drag-ui>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#2A3441" />
              <XAxis dataKey="index" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DragInteractionShell>
    </div>
  )
}
