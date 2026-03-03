import type { Candle, CandlePattern } from './types'
import { detectCandlestickPatterns } from '@/lib/analysis/candlestickPatterns'

type PatternDetectionResult = {
  bullish: CandlePattern[]
  bearish: CandlePattern[]
  neutral: CandlePattern[]
}

export class PatternEngine {
  detectPatterns(data: Candle[]): PatternDetectionResult {
    const patterns = detectCandlestickPatterns(data)
    return {
      bullish: patterns.filter((pattern) => pattern.category === 'Bullish Reversal'),
      bearish: patterns.filter((pattern) => pattern.category === 'Bearish Reversal'),
      neutral: patterns.filter((pattern) => pattern.category === 'Neutral' || pattern.category === 'Continuation'),
    }
  }
}