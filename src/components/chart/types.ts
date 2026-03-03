export type Candle = {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

export type TrendDirection = 'bullish' | 'bearish'

export type SwingPoint = {
  index: number
  price: number
  kind: 'high' | 'low'
}

export type StructureBreak = {
  index: number
  price: number
  direction: TrendDirection
  label: 'BOS'
}

export type FVGZone = {
  id: string
  direction: TrendDirection
  startIndex: number
  endIndex: number
  top: number
  bottom: number
  mitigated: boolean
  mitigatedIndex?: number
}

export type CandlePatternCategory =
  | 'Bullish Reversal'
  | 'Bearish Reversal'
  | 'Continuation'
  | 'Neutral'

export type CandlePattern = {
  index: number
  type: string
  category: CandlePatternCategory
}

export type TradeDirection = 'long' | 'short'

export type TradeStatus = 'open' | 'closed'

export type Trade = {
  id: string
  direction: TradeDirection
  entry: number
  stop: number
  target: number
  positionSize: number
  status: TradeStatus
  pnl: number
  openedAtIndex: number
  closedAtIndex?: number
  exitPrice?: number
}