import React, { useState } from 'react'
import { useSettingsStore } from '../stores/settingsStore'

// Simple SHA-256 hash function (lightweight alternative)
async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(code)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  const arr = Array.from(new Uint8Array(buffer))
  return arr.map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Hardcoded hash of "mastan"
const EXPECTED_HASH = 'dad8662e8cbe1b7256b7d18dea2f1ec889a2d34fb5f5ce9c4d0e9e751d447bbf'

export default function AccessCodeGate({ children }: { children: React.ReactNode }) {
  const unlocked = useSettingsStore((s) => s.unlocked)
  const setUnlocked = useSettingsStore((s) => s.setUnlocked)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setError('')
    setLoading(true)
    try {
      const hash = await hashCode(code)
      if (hash === EXPECTED_HASH) {
        setUnlocked(true)
        setCode('')
      } else {
        setError('Invalid access code.')
      }
    } catch (err) {
      setError('Error verifying code.')
    } finally {
      setLoading(false)
    }
  }

  if (unlocked) return <>{children}</>

  return (
    <div className="min-h-screen bg-background text-primaryText font-ui flex items-center justify-center">
      <div className="w-96 border border-border rounded bg-panel p-6">
        <h1 className="text-2xl font-semibold mb-4">Premium Local Trading Bootcamp</h1>
        <p className="text-sm text-secondaryText mb-4">Enter access code to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access Code"
            className="w-full p-2 bg-panel border border-border rounded"
          />
          {error && <div className="text-loss text-sm">{error}</div>}
          <button className="w-full px-3 py-2 bg-accent text-black rounded" type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  )
}
