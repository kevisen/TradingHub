import type { Candle, StructureBreak, SwingPoint } from '@/components/chart/types'

type StructureAnalysis = {
  swingHighs: SwingPoint[]
  swingLows: SwingPoint[]
  breaks: StructureBreak[]
}

type AnalyzeStructureOptions = {
  pivotWindow?: number
}

function isSwingHigh(data: Candle[], index: number, pivotWindow: number) {
  const candidate = data[index].high
  for (let cursor = index - pivotWindow; cursor <= index + pivotWindow; cursor += 1) {
    if (cursor === index) continue
    if (data[cursor].high >= candidate) return false
  }
  return true
}

function isSwingLow(data: Candle[], index: number, pivotWindow: number) {
  const candidate = data[index].low
  for (let cursor = index - pivotWindow; cursor <= index + pivotWindow; cursor += 1) {
    if (cursor === index) continue
    if (data[cursor].low <= candidate) return false
  }
  return true
}

export function analyzeStructure(data: Candle[], options: AnalyzeStructureOptions = {}): StructureAnalysis {
  const pivotWindow = options.pivotWindow ?? 2
  if (data.length < pivotWindow * 2 + 3) {
    return { swingHighs: [], swingLows: [], breaks: [] }
  }

  const swingHighs: SwingPoint[] = []
  const swingLows: SwingPoint[] = []
  const breaks: StructureBreak[] = []
  let activeSwingHigh: SwingPoint | null = null
  let activeSwingLow: SwingPoint | null = null

  for (let index = pivotWindow; index < data.length - pivotWindow; index += 1) {
    if (isSwingHigh(data, index, pivotWindow)) {
      const swing = { index, price: data[index].high, kind: 'high' as const }
      swingHighs.push(swing)
      activeSwingHigh = swing
    }

    if (isSwingLow(data, index, pivotWindow)) {
      const swing = { index, price: data[index].low, kind: 'low' as const }
      swingLows.push(swing)
      activeSwingLow = swing
    }

    const candle = data[index]
    if (activeSwingHigh && candle.close > activeSwingHigh.price && index > activeSwingHigh.index) {
      breaks.push({ index, price: activeSwingHigh.price, direction: 'bullish', label: 'BOS' })
      activeSwingHigh = null
    }

    if (activeSwingLow && candle.close < activeSwingLow.price && index > activeSwingLow.index) {
      breaks.push({ index, price: activeSwingLow.price, direction: 'bearish', label: 'BOS' })
      activeSwingLow = null
    }
  }

  return { swingHighs, swingLows, breaks }
}