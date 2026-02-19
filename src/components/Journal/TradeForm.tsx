import React, { useState } from 'react'
import { useJournalStore } from '../../stores/journalStore'

function uid() {
  return 't-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,8)
}

export default function TradeForm() {
  const addEntry = useJournalStore((s) => s.addEntry)

  const [market, setMarket] = useState('')
  const [strategy, setStrategy] = useState('')
  const [entry, setEntry] = useState('')
  const [stop, setStop] = useState('')
  const [target, setTarget] = useState('')
  const [notes, setNotes] = useState('')
  const [emotionalState, setEmotionalState] = useState('neutral')
  const [mistakes, setMistakes] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const en = parseFloat(entry)
    const st = parseFloat(stop)
    const ta = parseFloat(target)
    const risk = Math.abs(en - st)
    const reward = Math.abs(ta - en)
    const r = risk === 0 ? undefined : +(reward / risk)

    const obj = {
      id: uid(),
      market,
      strategy,
      entry: isFinite(en) ? en : 0,
      stop: isFinite(st) ? st : 0,
      target: isFinite(ta) ? ta : 0,
      resultR: r,
      notes,
      emotionalState,
      mistakes: mistakes ? mistakes.split(',').map((s) => s.trim()) : [],
      createdAt: new Date().toISOString()
    }

    addEntry(obj)

    // reset form (keep market/strategy for convenience)
    setEntry('')
    setStop('')
    setTarget('')
    setNotes('')
    setMistakes('')
  }

  return (
    <form onSubmit={submit} className="space-y-3 p-3 border border-border rounded bg-panel">
      <div className="grid grid-cols-2 gap-2">
        <input placeholder="Market" value={market} onChange={(e) => setMarket(e.target.value)} className="p-2 bg-panel border border-border rounded" />
        <input placeholder="Strategy" value={strategy} onChange={(e) => setStrategy(e.target.value)} className="p-2 bg-panel border border-border rounded" />
        <input placeholder="Entry" value={entry} onChange={(e) => setEntry(e.target.value)} className="p-2 bg-panel border border-border rounded" />
        <input placeholder="Stop" value={stop} onChange={(e) => setStop(e.target.value)} className="p-2 bg-panel border border-border rounded" />
        <input placeholder="Target" value={target} onChange={(e) => setTarget(e.target.value)} className="p-2 bg-panel border border-border rounded" />
        <select value={emotionalState} onChange={(e) => setEmotionalState(e.target.value)} className="p-2 bg-panel border border-border rounded">
          <option value="calm">Calm</option>
          <option value="focused">Focused</option>
          <option value="anxious">Anxious</option>
          <option value="frustrated">Frustrated</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>

      <div>
        <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 bg-panel border border-border rounded" />
      </div>

      <div>
        <input placeholder="Mistakes (comma separated)" value={mistakes} onChange={(e) => setMistakes(e.target.value)} className="w-full p-2 bg-panel border border-border rounded" />
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1 bg-accent text-black rounded" type="submit">Add Trade</button>
        <button type="button" className="px-3 py-1 border border-border rounded text-secondaryText" onClick={() => {
          setMarket('')
          setStrategy('')
          setEntry('')
          setStop('')
          setTarget('')
          setNotes('')
          setMistakes('')
          setEmotionalState('neutral')
        }}>Reset</button>
      </div>
    </form>
  )
}
