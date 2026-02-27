import { create } from 'zustand'
import { getItem, setItem } from '../lib/storage'

type SettingsState = {
  theme: 'dark' | 'light'
  unlocked: boolean
  setTheme: (t: 'dark' | 'light') => void
  setUnlocked: (v: boolean) => void
}

const STORAGE_KEY = 'settings'
const storedSettings = (getItem(STORAGE_KEY) as Partial<Pick<SettingsState, 'theme' | 'unlocked'>>) ?? {}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: storedSettings.theme ?? 'dark',
  unlocked: storedSettings.unlocked ?? false,
  setTheme: (t) => {
    set((s) => {
      const next = { ...s, theme: t }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
  setUnlocked: (v) => {
    set((s) => {
      const next = { ...s, unlocked: v }
      setItem(STORAGE_KEY, next)
      return next
    })
  }
}))
