import type { Candle, CandlePattern } from '@/components/chart/types'

function candleBody(candle: Candle) {
  return Math.abs(candle.close - candle.open)
}

function candleRange(candle: Candle) {
  return Math.max(0.000001, candle.high - candle.low)
}

export function isBullishEngulfing(previous: Candle, current: Candle) {
  return (
    previous.close < previous.open &&
    current.close > current.open &&
    current.open < previous.close &&
    current.close > previous.open
  )
}

export function isBearishEngulfing(previous: Candle, current: Candle) {
  return (
    previous.close > previous.open &&
    current.close < current.open &&
    current.open > previous.close &&
    current.close < previous.open
  )
}

export function isHammer(candle: Candle) {
  const body = candleBody(candle)
  const lowerWick = Math.min(candle.open, candle.close) - candle.low
  const upperWick = candle.high - Math.max(candle.open, candle.close)
  return lowerWick > body * 2 && upperWick <= body
}

export function isShootingStar(candle: Candle) {
  const body = candleBody(candle)
  const upperWick = candle.high - Math.max(candle.open, candle.close)
  const lowerWick = Math.min(candle.open, candle.close) - candle.low
  return upperWick > body * 2 && lowerWick <= body
}

export function isDoji(candle: Candle) {
  return candleBody(candle) / candleRange(candle) <= 0.1
}

export function detectCandlestickPatterns(data: Candle[]): CandlePattern[] {
  if (data.length < 2) return []

  const patterns: CandlePattern[] = []

  for (let index = 1; index < data.length; index += 1) {
    const previous = data[index - 1]
    const current = data[index]

    if (isBullishEngulfing(previous, current)) {
      patterns.push({ index, type: 'Bullish Engulfing', category: 'Bullish Reversal' })
    }
    if (isBearishEngulfing(previous, current)) {
      patterns.push({ index, type: 'Bearish Engulfing', category: 'Bearish Reversal' })
    }
    if (isHammer(current)) {
      patterns.push({ index, type: 'Hammer', category: 'Bullish Reversal' })
    }
    if (isShootingStar(current)) {
      patterns.push({ index, type: 'Shooting Star', category: 'Bearish Reversal' })
    }
    if (isDoji(current)) {
      patterns.push({ index, type: 'Doji', category: 'Neutral' })
    }
  }

  return patterns
}