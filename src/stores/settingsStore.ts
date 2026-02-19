import { create } from 'zustand'
import { getItem, setItem } from '../lib/storage'

type SettingsState = {
  theme: 'dark' | 'light'
  unlocked: boolean
  setTheme: (t: 'dark' | 'light') => void
  setUnlocked: (v: boolean) => void
}

const STORAGE_KEY = 'settings'

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: getItem(STORAGE_KEY)?.theme ?? 'dark',
  unlocked: getItem(STORAGE_KEY)?.unlocked ?? false,
  setTheme: (t) => {
    set((s: any) => {
      const next = { ...s, theme: t }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
  setUnlocked: (v) => {
    set((s: any) => {
      const next = { ...s, unlocked: v }
      setItem(STORAGE_KEY, next)
      return next
    })
  }
}))
