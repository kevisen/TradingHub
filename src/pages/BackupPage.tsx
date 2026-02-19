import React from 'react'
import { exportAll, importAll } from '../lib/storage'

export default function BackupPage() {
  function handleExport() {
    const payload = exportAll()
    const a = document.createElement('a')
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    a.href = url
    a.download = 'pltb-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const txt = await f.text()
    const ok = importAll(txt)
    if (!ok) alert('Import failed')
    else alert('Import complete')
  }

  return (
    <div className="bg-panel border border-border rounded p-4 space-y-3">
      <h2 className="font-semibold">Backup & Restore</h2>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-accent text-black rounded" onClick={handleExport}>Export All</button>
        <label className="px-3 py-1 border border-border rounded text-secondaryText cursor-pointer">
          Import JSON
          <input type="file" accept="application/json" onChange={handleImportFile} className="hidden" />
        </label>
      </div>
    </div>
  )
}
