import type { FVGZone, StructureBreak } from './types'

type ChartLike = {
  removeSeries?: (series: unknown) => void
  addLineSeries?: (options?: Record<string, unknown>) => { setData: (data: unknown[]) => void }
  addAreaSeries?: (options?: Record<string, unknown>) => { setData: (data: unknown[]) => void }
}

type CandlestickSeriesLike = {
  createPriceLine?: (options: Record<string, unknown>) => unknown
}

export class OverlayManager {
  private chart: ChartLike

  private series: unknown[] = []

  constructor(chartInstance: ChartLike) {
    this.chart = chartInstance
  }

  clear() {
    if (!this.chart.removeSeries) return
    this.series.forEach((series) => this.chart.removeSeries?.(series))
    this.series = []
  }

  addLine(data: Array<{ time: string; value: number }>, options: Record<string, unknown>) {
    if (!this.chart.addLineSeries) return null
    const line = this.chart.addLineSeries(options)
    line.setData(data)
    this.series.push(line)
    return line
  }

  addArea(data: Array<{ time: string; value: number }>, options: Record<string, unknown>) {
    if (!this.chart.addAreaSeries) return null
    const area = this.chart.addAreaSeries(options)
    area.setData(data)
    this.series.push(area)
    return area
  }

  addPriceLine(series: CandlestickSeriesLike, level: number, options: Record<string, unknown>) {
    return series.createPriceLine?.({
      price: level,
      ...options,
    })
  }

  renderFVGZones(data: Array<{ time: string }>, zones: FVGZone[]) {
    zones.forEach((zone) => {
      const opacity = zone.mitigated ? 0.07 : 0.15
      const lineColor = zone.direction === 'bullish' ? `rgba(96, 165, 250, ${opacity + 0.2})` : `rgba(168, 85, 247, ${opacity + 0.2})`
      const topData = [
        { time: data[zone.startIndex].time, value: zone.top },
        { time: data[zone.endIndex].time, value: zone.top },
      ]
      const bottomData = [
        { time: data[zone.startIndex].time, value: zone.bottom },
        { time: data[zone.endIndex].time, value: zone.bottom },
      ]

      this.addLine(topData, { color: lineColor, lineWidth: 1, priceLineVisible: false, lastValueVisible: false })
      this.addLine(bottomData, { color: lineColor, lineWidth: 1, priceLineVisible: false, lastValueVisible: false })
      this.addArea(topData, {
        lineColor: `rgba(0, 0, 0, 0)`,
        topColor: zone.direction === 'bullish' ? `rgba(96, 165, 250, ${opacity})` : `rgba(168, 85, 247, ${opacity})`,
        bottomColor: zone.direction === 'bullish' ? `rgba(96, 165, 250, ${opacity})` : `rgba(168, 85, 247, ${opacity})`,
        priceLineVisible: false,
        lastValueVisible: false,
      })
    })
  }

  renderBOS(data: Array<{ time: string }>, breaks: StructureBreak[]) {
    breaks.forEach((item) => {
      const color = item.direction === 'bullish' ? '#22C55E' : '#EF4444'
      const start = Math.max(0, item.index - 10)
      const end = Math.min(data.length - 1, item.index + 25)
      this.addLine(
        [
          { time: data[start].time, value: item.price },
          { time: data[end].time, value: item.price },
        ],
        {
          color,
          lineStyle: 2,
          lineWidth: 1,
          title: item.direction === 'bullish' ? 'BOS ↑' : 'BOS ↓',
          priceLineVisible: false,
        }
      )
    })
  }
}