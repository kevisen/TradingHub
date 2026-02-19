import { create } from 'zustand'
import { getItem, setItem } from '../lib/storage'

export type TradeEntry = {
  id: string
  market: string
  strategy: string
  entry: number
  stop: number
  target: number
  resultR?: number
  notes?: string
  emotionalState?: string
  mistakes?: string[]
  createdAt: string
}

type JournalState = {
  entries: TradeEntry[]
  addEntry: (e: TradeEntry) => void
  exportJSON: () => string
  exportCSV: () => string
  importFromJSON: (jsonStr: string) => boolean
  removeEntry: (id: string) => void
}

const STORAGE_KEY = 'journal'

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: getItem(STORAGE_KEY)?.entries ?? [],
  addEntry: (e) => {
    set((s: any) => {
      const next = { ...s, entries: [e, ...s.entries] }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
  exportJSON: () => {
    const data = get().entries
    return JSON.stringify({ exportedAt: new Date().toISOString(), entries: data })
  }
  ,
  exportCSV: () => {
    const entries = get().entries
    if (!entries || entries.length === 0) return ''
    const headers = ['id','createdAt','market','strategy','entry','stop','target','resultR','emotionalState','mistakes','notes']
    const rows = entries.map((e) => {
      const safe = (v: any) => {
        if (v === undefined || v === null) return ''
        const s = typeof v === 'string' ? v : JSON.stringify(v)
        return '"' + s.replace(/"/g,'""') + '"'
      }
      return [e.id, e.createdAt, e.market, e.strategy, e.entry, e.stop, e.target, e.resultR ?? '', e.emotionalState ?? '', (e.mistakes || []).join('|'), e.notes ?? ''].map(safe).join(',')
    })
    return [headers.join(','), ...rows].join('\n')
  },
  importFromJSON: (jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr)
      const entries = parsed?.entries ?? parsed
      if (!Array.isArray(entries)) return false
      set((s: any) => {
        const next = { ...s, entries: [...entries, ...s.entries] }
        setItem(STORAGE_KEY, next)
        return next
      })
      return true
    } catch (e) {
      console.error('journal import error', e)
      return false
    }
  },
  removeEntry: (id) => {
    set((s: any) => {
      const nextEntries = s.entries.filter((x: any) => x.id !== id)
      const next = { ...s, entries: nextEntries }
      setItem(STORAGE_KEY, next)
      return next
    })
  }
}))
