import type { Candle } from '@/components/chart/types'

export type LiquidityLevel = {
  index: number
  price: number
  kind: 'EQH' | 'EQL'
}

export function analyzeLiquidity(data: Candle[], tolerance = 0.001): LiquidityLevel[] {
  const levels: LiquidityLevel[] = []
  if (data.length < 3) return levels

  for (let index = 1; index < data.length; index += 1) {
    const previous = data[index - 1]
    const current = data[index]
    const highSpread = Math.abs(current.high - previous.high) / Math.max(1, previous.high)
    const lowSpread = Math.abs(current.low - previous.low) / Math.max(1, previous.low)

    if (highSpread <= tolerance) {
      levels.push({ index, price: Math.max(current.high, previous.high), kind: 'EQH' })
    }
    if (lowSpread <= tolerance) {
      levels.push({ index, price: Math.min(current.low, previous.low), kind: 'EQL' })
    }
  }

  return levels
}