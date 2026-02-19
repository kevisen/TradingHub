import React, { useRef } from 'react'
import { useJournalStore } from '../../stores/journalStore'
import TradeForm from './TradeForm'

export default function JournalView() {
  const entries = useJournalStore((s) => s.entries)
  const exportJSON = useJournalStore((s) => s.exportJSON)
  const exportCSV = useJournalStore((s) => s.exportCSV)
  const importFromJSON = useJournalStore((s) => s.importFromJSON)
  const removeEntry = useJournalStore((s) => s.removeEntry)
  const fileRef = useRef<HTMLInputElement | null>(null)

  function download(filename: string, content: string, mime = 'application/json') {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Trader Journal</h3>
        <div className="flex gap-2">
          <button className="px-2 py-1 border border-border rounded text-secondaryText" onClick={() => download('journal.json', exportJSON(), 'application/json')}>Export JSON</button>
          <button className="px-2 py-1 border border-border rounded text-secondaryText" onClick={() => download('journal.csv', exportCSV(), 'text/csv')}>Export CSV</button>
          <button className="px-2 py-1 border border-border rounded text-secondaryText" onClick={() => fileRef.current?.click()}>Import JSON</button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={async (e) => {
            const f = e.target.files?.[0]
            if (!f) return
            const txt = await f.text()
            const ok = importFromJSON(txt)
            if (!ok) alert('Import failed')
          }} />
        </div>
      </div>

      <TradeForm />

      <div className="space-y-2">
        {entries.length === 0 && <div className="text-secondaryText">No entries yet.</div>}
        {entries.map((e) => (
          <div key={e.id} className="p-2 border border-border rounded bg-panel flex items-start justify-between">
            <div>
              <div className="font-medium">{e.market} — {e.strategy}</div>
              <div className="text-xs text-secondaryText">{new Date(e.createdAt).toLocaleString()}</div>
              <div className="mt-2 text-sm">Entry: <span className="mono">{e.entry}</span> Stop: <span className="mono">{e.stop}</span> Target: <span className="mono">{e.target}</span></div>
              <div className="mt-2 text-sm text-secondaryText">R: <span className="mono">{e.resultR}</span> Emotion: {e.emotionalState}</div>
              {e.notes && <div className="mt-2 text-sm">Notes: {e.notes}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <button className="px-2 py-1 border border-border rounded text-secondaryText" onClick={() => download(`${e.id}.json`, JSON.stringify(e, null, 2))}>Export</button>
              <button className="px-2 py-1 border border-border rounded text-loss" onClick={() => removeEntry(e.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
