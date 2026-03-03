'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AreaSeries, CandlestickSeries, LineSeries, createChart } from 'lightweight-charts'
import { OverlayManager } from './OverlayManager'
import type { Candle, CandlePattern } from './types'
import { analyzeStructure } from '@/lib/analysis/structure'
import { analyzeFVG } from '@/lib/analysis/fvg'
import { PatternEngine } from './PatternEngine'

type ChartCoreProps = {
  data: Candle[]
  className?: string
  height?: number
  showFVG?: boolean
  showBOS?: boolean
  simulatorLevels?: Array<{ price: number; label: string; color: string }>
  onPriceClick?: (payload: { index: number; time: string; price: number }) => void
}

type ChartWithCompatMethods = {
  removeSeries?: (series: unknown) => void
  addSeries: (seriesType: unknown, options?: Record<string, unknown>) => { setData: (data: unknown[]) => void }
  addLineSeries?: (options?: Record<string, unknown>) => { setData: (data: unknown[]) => void }
  addAreaSeries?: (options?: Record<string, unknown>) => { setData: (data: unknown[]) => void }
  timeScale: () => { fitContent: () => void }
  subscribeCrosshairMove?: (handler: (param: unknown) => void) => void
  unsubscribeCrosshairMove?: (handler: (param: unknown) => void) => void
  subscribeClick?: (handler: (param: unknown) => void) => void
  unsubscribeClick?: (handler: (param: unknown) => void) => void
  remove: () => void
  applyOptions: (options: Record<string, unknown>) => void
}

type HoverState = {
  visible: boolean
  x: number
  y: number
  pattern: CandlePattern | null
}

function getDateKey(value: unknown): string | null {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null) {
    const maybeBusinessDay = value as { year?: number; month?: number; day?: number }
    if (maybeBusinessDay.year && maybeBusinessDay.month && maybeBusinessDay.day) {
      return `${maybeBusinessDay.year}-${String(maybeBusinessDay.month).padStart(2, '0')}-${String(maybeBusinessDay.day).padStart(2, '0')}`
    }
  }
  return null
}

export default function ChartCore({
  data,
  className,
  height = 470,
  showFVG = true,
  showBOS = true,
  simulatorLevels = [],
  onPriceClick,
}: ChartCoreProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<ChartWithCompatMethods | null>(null)
  const candleSeriesRef = useRef<{ setData: (value: unknown[]) => void } | null>(null)
  const overlayManagerRef = useRef<OverlayManager | null>(null)
  const dataRef = useRef<Candle[]>(data)
  const onPriceClickRef = useRef<ChartCoreProps['onPriceClick']>(onPriceClick)
  const patternIndexMapRef = useRef<Map<number, CandlePattern>>(new Map())
  const dateIndexMapRef = useRef<Record<string, number>>({})
  const [hoverState, setHoverState] = useState<HoverState>({
    visible: false,
    x: 0,
    y: 0,
    pattern: null,
  })

  const structure = useMemo(() => analyzeStructure(data), [data])
  const fvgZones = useMemo(() => analyzeFVG(data), [data])
  const patternEngine = useMemo(() => new PatternEngine(), [])
  const patternIndexMap = useMemo(() => {
    const detections = patternEngine.detectPatterns(data)
    const merged = [...detections.bullish, ...detections.bearish, ...detections.neutral].sort((a, b) => a.index - b.index)
    const map = new Map<number, CandlePattern>()
    merged.forEach((pattern) => {
      if (!map.has(pattern.index)) {
        map.set(pattern.index, pattern)
      }
    })
    return map
  }, [data, patternEngine])
  const dateIndexMap = useMemo(() => {
    return data.reduce<Record<string, number>>((acc, candle, index) => {
      acc[candle.time] = index
      return acc
    }, {})
  }, [data])

  useEffect(() => {
    dataRef.current = data
    onPriceClickRef.current = onPriceClick
  }, [data, onPriceClick])

  useEffect(() => {
    patternIndexMapRef.current = patternIndexMap
    dateIndexMapRef.current = dateIndexMap
  }, [dateIndexMap, patternIndexMap])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = createChart(container, {
      height,
      autoSize: true,
      layout: {
        background: { color: '#05070D' },
        textColor: '#D1D5DB',
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.06)' },
        horzLines: { color: 'rgba(255,255,255,0.06)' },
      },
      rightPriceScale: { borderColor: 'rgba(255,255,255,0.2)' },
      timeScale: { borderColor: 'rgba(255,255,255,0.2)' },
      crosshair: {
        vertLine: { color: 'rgba(168,85,247,0.5)', labelBackgroundColor: '#7E22CE' },
        horzLine: { color: 'rgba(168,85,247,0.25)', labelBackgroundColor: '#7E22CE' },
      },
      handleScale: true,
      handleScroll: true,
    }) as unknown as ChartWithCompatMethods

    chart.addLineSeries = (options = {}) => chart.addSeries(LineSeries, options)
    chart.addAreaSeries = (options = {}) => chart.addSeries(AreaSeries, options)

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    })

    candleSeries.setData(data)
    chart.timeScale().fitContent()

    chartRef.current = chart
    candleSeriesRef.current = candleSeries
    overlayManagerRef.current = new OverlayManager(chart)

    const onMove = (param: unknown) => {
      const eventParam = param as { point?: { x: number; y: number }; time?: unknown }
      if (!eventParam.point || !containerRef.current) {
        setHoverState((previous) => ({ ...previous, visible: false }))
        return
      }

      const dateKey = getDateKey(eventParam.time)
      if (!dateKey) {
        setHoverState((previous) => ({ ...previous, visible: false }))
        return
      }

      const index = dateIndexMapRef.current[dateKey]
      if (typeof index !== 'number') {
        setHoverState((previous) => ({ ...previous, visible: false }))
        return
      }

      const pattern = patternIndexMapRef.current.get(index) ?? null
      const bounds = containerRef.current.getBoundingClientRect()
      setHoverState({
        visible: true,
        x: Math.max(12, Math.min(eventParam.point.x + 12, bounds.width - 210)),
        y: Math.max(12, Math.min(eventParam.point.y + 12, bounds.height - 90)),
        pattern,
      })
    }

    chart.subscribeCrosshairMove?.(onMove)

    const onClick = (param: unknown) => {
      const clickHandler = onPriceClickRef.current
      if (!clickHandler) return

      const eventParam = param as { time?: unknown }
      const dateKey = getDateKey(eventParam.time)
      if (!dateKey) return

      const index = dateIndexMapRef.current[dateKey]
      if (typeof index !== 'number') return

      const candle = dataRef.current[index]
      if (!candle) return

      clickHandler({
        index,
        time: candle.time,
        price: candle.close,
      })
    }

    chart.subscribeClick?.(onClick)

    return () => {
      chart.unsubscribeCrosshairMove?.(onMove)
      chart.unsubscribeClick?.(onClick)
      overlayManagerRef.current?.clear()
      overlayManagerRef.current = null
      candleSeriesRef.current = null
      chartRef.current?.remove()
      chartRef.current = null
    }
  }, [height])

  useEffect(() => {
    candleSeriesRef.current?.setData(data)
    chartRef.current?.timeScale().fitContent()
  }, [data])

  useEffect(() => {
    const overlayManager = overlayManagerRef.current
    if (!overlayManager || !data.length) return

    overlayManager.clear()

    if (showFVG) {
      overlayManager.renderFVGZones(data, fvgZones)
    }
    if (showBOS) {
      overlayManager.renderBOS(data, structure.breaks)
    }

    simulatorLevels.forEach((level) => {
      overlayManager.addLine(
        [
          { time: data[0].time, value: level.price },
          { time: data[data.length - 1].time, value: level.price },
        ],
        {
          color: level.color,
          lineWidth: 1,
          lineStyle: 2,
          title: level.label,
          priceLineVisible: false,
          lastValueVisible: false,
        }
      )
    })
  }, [data, fvgZones, showBOS, showFVG, simulatorLevels, structure.breaks])

  return (
    <div className="relative">
      <div ref={containerRef} className={className} />
      {hoverState.visible && (
        <div
          className="pointer-events-none absolute z-20 min-w-52 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur-lg shadow-xl"
          style={{ left: hoverState.x, top: hoverState.y }}
          aria-live="polite"
        >
          {hoverState.pattern ? (
            <>
              <p className="font-semibold text-sm">{hoverState.pattern.type}</p>
              <p className="text-gray-200">Category: {hoverState.pattern.category}</p>
              <p className="text-gray-200">
                Context:{' '}
                {hoverState.pattern.category === 'Bullish Reversal'
                  ? 'Strong when formed after downside pressure.'
                  : hoverState.pattern.category === 'Bearish Reversal'
                    ? 'Stronger near premium or buy-side sweep.'
                    : 'Needs additional structure confirmation.'}
              </p>
            </>
          ) : (
            <p className="font-medium">No pattern detected</p>
          )}
        </div>
      )}
    </div>
  )
}