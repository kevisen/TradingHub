import type { Candle, FVGZone } from '@/components/chart/types'

type AnalyzeFVGOptions = {
  minGapSize?: number
}

function resolveMitigatedState(data: Candle[], zone: FVGZone) {
  for (let index = zone.startIndex + 1; index < data.length; index += 1) {
    const candle = data[index]
    if (zone.direction === 'bullish' && candle.low <= zone.top) {
      return { mitigated: true, mitigatedIndex: index }
    }
    if (zone.direction === 'bearish' && candle.high >= zone.bottom) {
      return { mitigated: true, mitigatedIndex: index }
    }
  }
  return { mitigated: false as const, mitigatedIndex: undefined }
}

export function analyzeFVG(data: Candle[], options: AnalyzeFVGOptions = {}): FVGZone[] {
  const minGapSize = options.minGapSize ?? 0
  if (data.length < 3) return []

  const zones: FVGZone[] = []

  for (let index = 2; index < data.length; index += 1) {
    const previous = data[index - 2]
    const current = data[index]

    if (current.low > previous.high) {
      const top = current.low
      const bottom = previous.high
      if (top - bottom >= minGapSize) {
        const base: FVGZone = {
          id: `fvg-bull-${index}`,
          direction: 'bullish',
          startIndex: index - 2,
          endIndex: data.length - 1,
          top,
          bottom,
          mitigated: false,
        }
        const mitigatedState = resolveMitigatedState(data, base)
        zones.push({ ...base, ...mitigatedState })
      }
    }

    if (current.high < previous.low) {
      const top = previous.low
      const bottom = current.high
      if (top - bottom >= minGapSize) {
        const base: FVGZone = {
          id: `fvg-bear-${index}`,
          direction: 'bearish',
          startIndex: index - 2,
          endIndex: data.length - 1,
          top,
          bottom,
          mitigated: false,
        }
        const mitigatedState = resolveMitigatedState(data, base)
        zones.push({ ...base, ...mitigatedState })
      }
    }
  }

  return zones
}