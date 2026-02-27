type CandleLike = {
  open: number
  high: number
  low: number
  close: number
}

export function detectPattern(data: unknown[], index: number) {
  const candles = data as CandleLike[]
  const current = candles[index]
  const prev1 = candles[index - 1]
  const prev2 = candles[index - 2]

  if (!current) return null

  const body = Math.abs(current.close - current.open)
  const range = current.high - current.low
  const upperWick = current.high - Math.max(current.open, current.close)
  const lowerWick = Math.min(current.open, current.close) - current.low

  const isBullish = current.close > current.open
  const isBearish = current.close < current.open

  // =========================
  // SINGLE CANDLE PATTERNS
  // =========================

  if (body < range * 0.1) return 'doji'

  if (lowerWick > body * 2 && upperWick < body)
    return 'hammer'

  if (upperWick > body * 2 && lowerWick < body)
    return 'shooting_star'

  // =========================
  // TWO CANDLE PATTERNS
  // =========================

  if (prev1) {
    const prevBullish = prev1.close > prev1.open
    const prevBearish = prev1.close < prev1.open

    // Bullish Engulfing
    if (
      prevBearish &&
      isBullish &&
      current.open < prev1.close &&
      current.close > prev1.open
    ) {
      return 'bullish_engulfing'
    }

    // Bearish Engulfing
    if (
      prevBullish &&
      isBearish &&
      current.open > prev1.close &&
      current.close < prev1.open
    ) {
      return 'bearish_engulfing'
    }
  }

  // =========================
  // THREE CANDLE PATTERNS
  // =========================

  if (prev1 && prev2) {
    const prev2Bullish = prev2.close > prev2.open
    const prev2Bearish = prev2.close < prev2.open
    const prev1SmallBody =
      Math.abs(prev1.close - prev1.open) <
      (prev2.high - prev2.low) * 0.4

    // Morning Star
    if (
      prev2Bearish &&
      prev1SmallBody &&
      isBullish &&
      current.close > (prev2.open + prev2.close) / 2
    ) {
      return 'morning_star'
    }

    // Evening Star
    if (
      prev2Bullish &&
      prev1SmallBody &&
      isBearish &&
      current.close < (prev2.open + prev2.close) / 2
    ) {
      return 'evening_star'
    }

    // Three White Soldiers
    if (
      prev2Bullish &&
      prev1.close > prev1.open &&
      isBullish &&
      prev1.close > prev2.close &&
      current.close > prev1.close
    ) {
      return 'three_white_soldiers'
    }

    // Three Black Crows
    if (
      prev2Bearish &&
      prev1.close < prev1.open &&
      isBearish &&
      prev1.close < prev2.close &&
      current.close < prev1.close
    ) {
      return 'three_black_crows'
    }
  }

  return null
}
