'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CandlestickSeries, createChart } from 'lightweight-charts'
import PatternTooltip from './PatternTooltip'
import PatternInfoPanel from './PatternInfoPanel'
import { candleSampleData } from '../../../data/candleSampleData'
import { patternDefinitions, type PatternKey } from '../../../data/patternDefinitions'
import { detectPattern } from '../../../utils/detectPattern'

type QuizChoice = 'Doji' | 'Hammer' | 'Engulfing' | 'Shooting Star'

function normalizePatternToAnswer(pattern: PatternKey | null): QuizChoice | null {
  if (!pattern) return null
  if (pattern === 'doji') return 'Doji'
  if (pattern === 'hammer') return 'Hammer'
  if (pattern === 'shooting_star') return 'Shooting Star'
  if (pattern === 'bullish_engulfing' || pattern === 'bearish_engulfing') return 'Engulfing'
  return null
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

export default function CandleMindmapSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<unknown>(null)
  const seriesRef = useRef<unknown>(null)

  const [selectedPattern, setSelectedPattern] = useState<PatternKey | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [testMode, setTestMode] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [streak, setStreak] = useState(0)
  const [quizResult, setQuizResult] = useState<{ status: 'correct' | 'wrong'; message: string } | null>(null)
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; pattern: PatternKey | null }>({
    visible: false,
    x: 0,
    y: 0,
    pattern: null,
  })

  const patternByTime = useMemo(() => {
    return candleSampleData.reduce<Record<string, PatternKey | null>>((acc, candle, index) => {
      acc[candle.time] = detectPattern(candleSampleData, index)
      return acc
    }, {})
  }, [])

  const selectedDefinition = selectedPattern ? patternDefinitions[selectedPattern] : null
  const tooltipDefinition = tooltip.pattern ? patternDefinitions[tooltip.pattern] : null

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = createChart(container, {
      height: 420,
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
    })

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    })

    candleSeries.setData(candleSampleData)
    chart.timeScale().fitContent()
    chartRef.current = chart
    seriesRef.current = candleSeries

    const onMove = (param: unknown) => {
      const eventParam = param as { point?: { x: number; y: number }; time?: unknown }
      if (!eventParam.point || !containerRef.current) {
        setTooltip((prev) => ({ ...prev, visible: false }))
        return
      }

      const dateKey = getDateKey(eventParam.time)
      if (!dateKey) {
        setTooltip((prev) => ({ ...prev, visible: false }))
        return
      }

      const rect = containerRef.current.getBoundingClientRect()
      const nextPattern = patternByTime[dateKey] ?? null

      setTooltip({
        visible: true,
        x: Math.max(8, eventParam.point.x),
        y: Math.max(8, Math.min(eventParam.point.y, rect.height - 100)),
        pattern: nextPattern,
      })
    }

    const onClick = (param: unknown) => {
      const eventParam = param as { time?: unknown }
      const dateKey = getDateKey(eventParam.time)
      if (!dateKey) return

      const patternKey = patternByTime[dateKey] ?? null
      setSelectedPattern(patternKey)
      setIsPanelOpen(true)
      setShowHint(false)
      setQuizResult(null)
    }

    chart.subscribeCrosshairMove(onMove)
    chart.subscribeClick(onClick)

    return () => {
      chart.unsubscribeCrosshairMove(onMove)
      chart.unsubscribeClick(onClick)
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [patternByTime])

  const handleSelectAnswer = (choice: QuizChoice) => {
    const correctAnswer = normalizePatternToAnswer(selectedPattern)

    if (!correctAnswer) {
      setQuizResult({ status: 'wrong', message: 'No detectable pattern on this candle. Try another one.' })
      setStreak(0)
      return
    }

    if (choice === correctAnswer) {
      setStreak((prev) => prev + 1)
      setQuizResult({ status: 'correct', message: 'Correct. Nice read.' })
      return
    }

    setStreak(0)
    const explanation = selectedPattern ? patternDefinitions[selectedPattern].description : 'Pattern not found.'
    setQuizResult({ status: 'wrong', message: `Not quite. ${explanation}` })
  }

  return (
    <section data-gsap-reveal className="relative py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Interactive Candle Mindmap Explorer</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Hover candles for instant pattern labels, click to learn context, and use Test Me Mode to practice recognition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
            <div ref={containerRef} className="w-full" />

            <PatternTooltip
              x={tooltip.x}
              y={tooltip.y}
              visible={tooltip.visible}
              pattern={tooltipDefinition}
            />
          </div>

          <PatternInfoPanel
            isOpen={isPanelOpen}
            selectedPattern={selectedDefinition}
            testMode={testMode}
            showHint={showHint}
            streak={streak}
            quizResult={quizResult}
            onClose={() => setIsPanelOpen(false)}
            onToggleHint={() => setShowHint((prev) => !prev)}
            onToggleTestMode={() => {
              setTestMode((prev) => !prev)
              setQuizResult(null)
              setShowHint(false)
            }}
            onSelectAnswer={handleSelectAnswer}
          />
        </div>
      </div>
    </section>
  )
}
