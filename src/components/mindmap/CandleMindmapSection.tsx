'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import ChartCore from '@/components/chart/ChartCore'
import { ReplayController } from '@/components/chart/ReplayController'
import { SimulatorEngine } from '@/components/chart/SimulatorEngine'
import type { Trade, TradeDirection } from '@/components/chart/types'
import {
  getChartDataForScenario,
  getVisualOverlays,
  resolveAbbreviation,
  tradingLanguageLabData,
  type ConceptOverlayMode,
  type LearningTimeframe,
  type ScenarioType,
  type VisualOverlay,
} from '@/data/tradingLanguageLab'
import { useChartStore } from '@/store/useChartStore'

type LearningMode = 'beginner' | 'intermediate' | 'advanced'

const timeframeOptions: LearningTimeframe[] = ['M5', 'M15', 'H1', 'H4', 'D1']

const scenarioOptions: Array<{ value: ScenarioType; label: string }> = [
  { value: 'bullish_trend', label: 'Bullish Trend' },
  { value: 'bearish_trend', label: 'Bearish Trend' },
  { value: 'range', label: 'Range' },
  { value: 'reversal', label: 'Reversal' },
  { value: 'accumulation', label: 'Accumulation' },
  { value: 'distribution', label: 'Distribution' },
]

const conceptOptions: Array<{ value: ConceptOverlayMode; label: string }> = [
  { value: 'structure', label: 'Structure' },
  { value: 'liquidity', label: 'Liquidity' },
  { value: 'entry', label: 'Entry' },
]

function overlayLineStyle(overlay: VisualOverlay) {
  const x1 = overlay.x1 ?? 0
  const y1 = overlay.y1 ?? 0
  const x2 = overlay.x2 ?? x1
  const y2 = overlay.y2 ?? y1
  const dx = x2 - x1
  const dy = y2 - y1
  const width = Math.sqrt(dx * dx + dy * dy)
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI

  return {
    left: `${x1}%`,
    top: `${y1}%`,
    width: `${width}%`,
    transform: `rotate(${angle}deg)`,
    transformOrigin: '0 0',
  }
}

function scenarioBlurb(scenario: ScenarioType) {
  if (scenario === 'bullish_trend') return 'Trend continuation focus. Watch HL to BOS progression.'
  if (scenario === 'bearish_trend') return 'Bearish continuation focus. Track LH to LL sequence.'
  if (scenario === 'range') return 'Range behavior focus. Liquidity hunts around EQH and EQL dominate.'
  if (scenario === 'reversal') return 'Reversal focus. Wait for sweep then CHoCH confirmation.'
  if (scenario === 'accumulation') return 'Accumulation focus. Compression before displacement.'
  return 'Distribution focus. Upside bait then markdown leg.'
}

export default function CandleMindmapSection() {
  const [learningMode, setLearningMode] = useState<LearningMode>('beginner')
  const [timeframe, setTimeframe] = useState<LearningTimeframe>('M15')
  const [scenario, setScenario] = useState<ScenarioType>('bullish_trend')
  const [focusedConcept, setFocusedConcept] = useState<ConceptOverlayMode>('structure')
  const [showAdvancedControls, setShowAdvancedControls] = useState(false)
  const [overlayToggles, setOverlayToggles] = useState<Record<ConceptOverlayMode, boolean>>({
    structure: true,
    liquidity: false,
    entry: false,
  })
  const [hideLabels, setHideLabels] = useState(true)
  const [revealedIds, setRevealedIds] = useState<string[]>([])
  const [abbreviationQuery, setAbbreviationQuery] = useState('')
  const [focusOverlayId, setFocusOverlayId] = useState<string | null>(null)
  const [hintText, setHintText] = useState('Select a concept to see one clean visual lesson on-chart.')
  const replay = useChartStore((state) => state.replay)
  const setReplay = useChartStore((state) => state.setReplay)
  const simulation = useChartStore((state) => state.simulation)
  const setSimulation = useChartStore((state) => state.setSimulation)
  const replayControllerRef = useRef<ReplayController | null>(null)
  const simulatorRef = useRef(new SimulatorEngine())
  const [trades, setTrades] = useState<Trade[]>([])
  const [tradeDraft, setTradeDraft] = useState<{
    direction: TradeDirection
    entry?: number
    stop?: number
    target?: number
  }>({
    direction: 'long',
  })
  const [journalFilter, setJournalFilter] = useState<'all' | 'open' | 'closed'>('all')

  const chartData = useMemo(() => getChartDataForScenario(timeframe, scenario), [scenario, timeframe])
  const replayStartPointer = useMemo(() => Math.min(50, chartData.length), [chartData.length])
  const [visibleChartData, setVisibleChartData] = useState(chartData)
  const overlays = useMemo(() => getVisualOverlays(timeframe, scenario), [scenario, timeframe])

  const visibleGroups = useMemo(() => {
    if (learningMode === 'beginner') return [focusedConcept]
    const selected = conceptOptions.map((option) => option.value).filter((value) => overlayToggles[value])
    if (learningMode === 'advanced') return selected.length ? selected : ['structure', 'liquidity', 'entry']
    return selected.length ? selected : [focusedConcept]
  }, [focusedConcept, learningMode, overlayToggles])

  const visibleOverlays = useMemo(() => overlays.filter((overlay) => visibleGroups.includes(overlay.group)), [overlays, visibleGroups])

  const glossaryTerms = useMemo(() => {
    const query = abbreviationQuery.trim().toLowerCase()
    const terms = tradingLanguageLabData.glossary.map((item) => item.term)
    const uniqueTerms = Array.from(new Set(terms))
    if (!query) return uniqueTerms.slice(0, 16)
    return uniqueTerms.filter((term) => term.toLowerCase().includes(query)).slice(0, 16)
  }, [abbreviationQuery])

  useEffect(() => {
    if (learningMode === 'beginner') {
      setOverlayToggles({ structure: false, liquidity: false, entry: false, [focusedConcept]: true })
    }

    if (learningMode === 'advanced') {
      setHideLabels(true)
    } else {
      setHideLabels(false)
      setRevealedIds([])
    }
  }, [focusedConcept, learningMode])

  useEffect(() => {
    setHintText(scenarioBlurb(scenario))
  }, [scenario])

  useEffect(() => {
    replayControllerRef.current = new ReplayController(chartData, replayStartPointer)
    if (replay.enabled) {
      setVisibleChartData(replayControllerRef.current.getVisibleData())
      setReplay({ pointer: replayStartPointer, playing: false })
      return
    }
    setVisibleChartData(chartData)
    setReplay({ pointer: chartData.length, playing: false })
  }, [chartData, replay.enabled, replayStartPointer, setReplay])

  useEffect(() => {
    if (!replay.enabled || !replay.playing) return

    const timer = window.setInterval(() => {
      const controller = replayControllerRef.current
      if (!controller) return
      const nextVisible = controller.stepForward()
      const nextPointer = controller.getPointer()
      setVisibleChartData(nextVisible)
      setReplay({ pointer: nextPointer })
      const latest = nextVisible[nextVisible.length - 1]
      if (latest) {
        const nextTrades = simulatorRef.current.evaluateAtCandle(latest, nextPointer - 1)
        setTrades([...nextTrades])
      }
      if (nextPointer >= chartData.length) {
        setReplay({ playing: false })
      }
    }, replay.speedMs)

    return () => {
      window.clearInterval(timer)
    }
  }, [chartData.length, replay.enabled, replay.playing, replay.speedMs, setReplay])

  const handleToggleReplay = () => {
    if (!replay.enabled) {
      const controller = replayControllerRef.current ?? new ReplayController(chartData, replayStartPointer)
      replayControllerRef.current = controller
      setVisibleChartData(controller.reset(replayStartPointer))
      setReplay({ enabled: true, pointer: replayStartPointer, playing: false })
      return
    }

    setReplay({ enabled: false, playing: false, pointer: chartData.length })
    setVisibleChartData(chartData)
  }

  const handleStepForward = () => {
    const controller = replayControllerRef.current
    if (!controller) return
    const nextVisible = controller.stepForward()
    setVisibleChartData(nextVisible)
    const nextPointer = controller.getPointer()
    setReplay({ pointer: nextPointer })
    const latest = nextVisible[nextVisible.length - 1]
    if (latest) {
      const nextTrades = simulatorRef.current.evaluateAtCandle(latest, nextPointer - 1)
      setTrades([...nextTrades])
    }
  }

  const handleStepBackward = () => {
    const controller = replayControllerRef.current
    if (!controller) return
    const nextVisible = controller.stepBackward()
    setVisibleChartData(nextVisible)
    setReplay({ pointer: controller.getPointer() })
  }

  const handleResetReplay = () => {
    const controller = replayControllerRef.current
    if (!controller) return
    const nextVisible = controller.reset(replayStartPointer)
    setVisibleChartData(nextVisible)
    setReplay({ pointer: replayStartPointer, playing: false })
  }

  const handleChartPriceClick = ({ index, price }: { index: number; time: string; price: number }) => {
    if (!simulation.enabled) return

    if (typeof tradeDraft.entry !== 'number') {
      setTradeDraft((previous) => ({ ...previous, entry: price }))
      return
    }

    if (typeof tradeDraft.stop !== 'number') {
      setTradeDraft((previous) => ({ ...previous, stop: price }))
      return
    }

    if (typeof tradeDraft.target !== 'number') {
      const nextDraft = { ...tradeDraft, target: price }
      const entryPrice = nextDraft.entry
      const stopPrice = nextDraft.stop
      const targetPrice = nextDraft.target
      if (typeof entryPrice !== 'number' || typeof stopPrice !== 'number' || typeof targetPrice !== 'number') return
      setTradeDraft(nextDraft)
      const trade = simulatorRef.current.placeTrade({
        direction: nextDraft.direction,
        entry: entryPrice,
        stop: stopPrice,
        target: targetPrice,
        positionSize: simulation.positionSize,
        openedAtIndex: index,
      })
      setTrades((previous) => [...previous, trade])
      setTradeDraft({ direction: tradeDraft.direction })
    }
  }

  const handleClearDraft = () => {
    setTradeDraft({ direction: tradeDraft.direction })
  }

  const handleResetSimulation = () => {
    simulatorRef.current = new SimulatorEngine()
    setTrades([])
    setTradeDraft({ direction: tradeDraft.direction })
  }

  const simulatorLevels = useMemo(() => {
    const levels: Array<{ price: number; label: string; color: string }> = []

    if (typeof tradeDraft.entry === 'number') {
      levels.push({ price: tradeDraft.entry, label: 'Draft Entry', color: '#22C55E' })
    }
    if (typeof tradeDraft.stop === 'number') {
      levels.push({ price: tradeDraft.stop, label: 'Draft Stop', color: '#EF4444' })
    }
    if (typeof tradeDraft.target === 'number') {
      levels.push({ price: tradeDraft.target, label: 'Draft Target', color: '#60A5FA' })
    }

    const openTrades = trades.filter((trade) => trade.status === 'open')
    openTrades.forEach((trade, tradeIndex) => {
      levels.push({ price: trade.entry, label: `Entry ${tradeIndex + 1}`, color: '#22C55E' })
      levels.push({ price: trade.stop, label: `Stop ${tradeIndex + 1}`, color: '#EF4444' })
      levels.push({ price: trade.target, label: `Target ${tradeIndex + 1}`, color: '#60A5FA' })
    })

    return levels
  }, [tradeDraft, trades])

  const simulationMetrics = useMemo(() => simulatorRef.current.getMetrics(), [trades])
  const tradeJournalRows = useMemo(() => {
    return trades.map((trade) => {
      const riskPerUnit = Math.abs(trade.entry - trade.stop)
      const rewardPerUnit = Math.abs(trade.target - trade.entry)
      const rr = riskPerUnit > 0 ? rewardPerUnit / riskPerUnit : 0
      const exitType =
        typeof trade.exitPrice === 'number'
          ? Math.abs(trade.exitPrice - trade.target) <= Math.abs(trade.exitPrice - trade.stop)
            ? 'TP'
            : 'SL'
          : '-'

      return {
        id: trade.id,
        direction: trade.direction,
        status: trade.status,
        entry: trade.entry,
        stop: trade.stop,
        target: trade.target,
        exit: trade.exitPrice,
        rr,
        pnl: trade.pnl,
        exitType,
      }
    })
  }, [trades])
  const filteredTradeRows = useMemo(() => {
    if (journalFilter === 'all') return tradeJournalRows
    if (journalFilter === 'open') return tradeJournalRows.filter((row) => row.status === 'open')
    return tradeJournalRows.filter((row) => row.status === 'closed')
  }, [journalFilter, tradeJournalRows])

  const handleExportJournalCsv = () => {
    if (!filteredTradeRows.length) return

    const headers = ['id', 'direction', 'status', 'entry', 'stop', 'target', 'exit', 'exitType', 'rr', 'pnl']
    const rows = filteredTradeRows.map((row) => [
      row.id,
      row.direction,
      row.status,
      row.entry.toFixed(2),
      row.stop.toFixed(2),
      row.target.toFixed(2),
      typeof row.exit === 'number' ? row.exit.toFixed(2) : '',
      row.exitType,
      row.rr.toFixed(2),
      row.pnl.toFixed(2),
    ])

    const csv = [headers, ...rows].map((line) => line.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `trade-journal-${journalFilter}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleOverlayInteract = (overlay: VisualOverlay) => {
    if (learningMode === 'advanced' && hideLabels && !revealedIds.includes(overlay.id)) {
      setRevealedIds((prev) => [...prev, overlay.id])
    }

    setFocusOverlayId(overlay.id)
    setHintText(`${overlay.label}: visual context now focused on chart.`)
  }

  const handleAbbreviationClick = (term: string) => {
    const resolved = resolveAbbreviation(term)
    if (!resolved) return

    setFocusedConcept(resolved.mode)

    if (learningMode !== 'beginner') {
      setOverlayToggles((prev) => ({ ...prev, [resolved.mode]: true }))
    }

    setFocusOverlayId(resolved.overlayId)
    setHintText(resolved.hint)
  }

  return (
    <section data-gsap-reveal className="relative py-24 px-4 bg-black">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-7">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Real Chart Learning Engine</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Chart first. Visual overlays teach structure, liquidity, and entries with scenario-driven context.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <select
              value={timeframe}
              onChange={(event) => setTimeframe(event.target.value as LearningTimeframe)}
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-gray-100 outline-none"
            >
              {timeframeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={scenario}
              onChange={(event) => setScenario(event.target.value as ScenarioType)}
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-gray-100 outline-none"
            >
              {scenarioOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={focusedConcept}
              onChange={(event) => setFocusedConcept(event.target.value as ConceptOverlayMode)}
              className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-gray-100 outline-none"
            >
              {conceptOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAdvancedControls((prev) => !prev)}
              className="rounded-lg border border-purple-400/40 bg-purple-500/10 px-3 py-2 text-xs text-purple-100 transition hover:bg-purple-500/20"
            >
              {showAdvancedControls ? 'Hide Advanced Controls' : 'Show Advanced Controls'}
            </button>

            <button
              onClick={handleToggleReplay}
              className={`rounded-lg border px-3 py-2 text-xs transition ${
                replay.enabled
                  ? 'border-amber-300/50 bg-amber-500/10 text-amber-100'
                  : 'border-white/20 bg-black/30 text-gray-100 hover:bg-white/10'
              }`}
            >
              {replay.enabled ? 'Replay On' : 'Replay Off'}
            </button>

            {replay.enabled && (
              <>
                <button
                  onClick={() => setReplay({ playing: !replay.playing })}
                  className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs text-gray-100 transition hover:bg-white/10"
                >
                  {replay.playing ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={handleStepBackward}
                  className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs text-gray-100 transition hover:bg-white/10"
                >
                  Step -
                </button>
                <button
                  onClick={handleStepForward}
                  className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs text-gray-100 transition hover:bg-white/10"
                >
                  Step +
                </button>
                <button
                  onClick={handleResetReplay}
                  className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs text-gray-100 transition hover:bg-white/10"
                >
                  Reset
                </button>
                <span className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-[11px] text-gray-200">
                  {replay.pointer}/{chartData.length}
                </span>
              </>
            )}

            <button
              onClick={() => setSimulation({ enabled: !simulation.enabled })}
              className={`rounded-lg border px-3 py-2 text-xs transition ${
                simulation.enabled
                  ? 'border-cyan-300/50 bg-cyan-500/10 text-cyan-100'
                  : 'border-white/20 bg-black/30 text-gray-100 hover:bg-white/10'
              }`}
            >
              {simulation.enabled ? 'Simulator On' : 'Simulator Off'}
            </button>

            {simulation.enabled && (
              <>
                <button
                  onClick={() => setTradeDraft((previous) => ({ ...previous, direction: 'long' }))}
                  className={`rounded-lg border px-3 py-2 text-xs transition ${
                    tradeDraft.direction === 'long'
                      ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-100'
                      : 'border-white/20 bg-black/30 text-gray-100 hover:bg-white/10'
                  }`}
                >
                  Long
                </button>
                <button
                  onClick={() => setTradeDraft((previous) => ({ ...previous, direction: 'short' }))}
                  className={`rounded-lg border px-3 py-2 text-xs transition ${
                    tradeDraft.direction === 'short'
                      ? 'border-rose-400/50 bg-rose-500/10 text-rose-100'
                      : 'border-white/20 bg-black/30 text-gray-100 hover:bg-white/10'
                  }`}
                >
                  Short
                </button>
                <button
                  onClick={handleClearDraft}
                  className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs text-gray-100 transition hover:bg-white/10"
                >
                  Clear Draft
                </button>
                <button
                  onClick={handleResetSimulation}
                  className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs text-gray-100 transition hover:bg-white/10"
                >
                  Reset Sim
                </button>
                <span className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-[11px] text-gray-200">
                  Clicks: {typeof tradeDraft.entry === 'number' ? (typeof tradeDraft.stop === 'number' ? 2 : 1) : 0}/3
                </span>
              </>
            )}
          </div>

          {showAdvancedControls && (
            <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-3">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {(['beginner', 'intermediate', 'advanced'] as LearningMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setLearningMode(mode)}
                    className={`rounded-lg border px-3 py-1.5 text-xs capitalize transition ${
                      learningMode === mode
                        ? 'border-emerald-400/50 bg-emerald-500/10 text-white'
                        : 'border-white/20 text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    {mode}
                  </button>
                ))}

                <button
                  onClick={() => setHideLabels((prev) => !prev)}
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-gray-200 transition hover:bg-white/10"
                >
                  {hideLabels ? 'Reveal Labels' : 'Hide Labels'}
                </button>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {conceptOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setOverlayToggles((prev) => ({ ...prev, [option.value]: !prev[option.value] }))}
                    className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                      overlayToggles[option.value]
                        ? 'border-purple-400/50 bg-purple-500/10 text-white'
                        : 'border-white/20 text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div>
                <input
                  value={abbreviationQuery}
                  onChange={(event) => setAbbreviationQuery(event.target.value)}
                  placeholder="Search abbreviation (BOS, FVG, IFVG...)"
                  className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-gray-100 outline-none"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {glossaryTerms.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleAbbreviationClick(term)}
                      className="rounded-md border border-white/20 bg-black/30 px-2 py-1 text-[11px] text-gray-100 hover:bg-white/10"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40">
            <ChartCore
              data={visibleChartData}
              className="w-full"
              showFVG
              showBOS
              simulatorLevels={simulation.enabled ? simulatorLevels : []}
              onPriceClick={handleChartPriceClick}
            />

            <div className="absolute inset-0">
              {visibleOverlays.map((overlay) => {
                const hiddenInAdvanced = learningMode === 'advanced' && hideLabels && !revealedIds.includes(overlay.id)
                const hiddenLabel = hiddenInAdvanced ? '●' : overlay.label
                const focused = focusOverlayId === overlay.id

                if (overlay.kind === 'zone') {
                  return (
                    <button
                      key={overlay.id}
                      onClick={() => handleOverlayInteract(overlay)}
                      onMouseEnter={() => setHintText(`${overlay.label}: visual area highlighted.`)}
                      className={`absolute rounded-md border text-[10px] transition ${
                        focused
                          ? 'border-amber-300/70 bg-amber-400/15 text-amber-100'
                          : 'border-purple-300/40 bg-purple-500/10 text-gray-100 hover:bg-purple-500/20'
                      }`}
                      style={{
                        left: `${overlay.x}%`,
                        top: `${overlay.y}%`,
                        width: `${overlay.width}%`,
                        height: `${overlay.height}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {!hiddenInAdvanced && <span className="absolute top-1 left-1">{hiddenLabel}</span>}
                    </button>
                  )
                }

                if (overlay.kind === 'line' || overlay.kind === 'trendline') {
                  return (
                    <button
                      key={overlay.id}
                      onClick={() => handleOverlayInteract(overlay)}
                      onMouseEnter={() => setHintText(`${overlay.label}: follow this line to read intent.`)}
                      className="absolute h-0.5"
                      style={overlayLineStyle(overlay)}
                    >
                      <span
                        className={`absolute inset-0 rounded-full ${
                          focused ? 'bg-amber-300/90' : overlay.kind === 'trendline' ? 'bg-emerald-300/85' : 'bg-cyan-300/85'
                        }`}
                      />
                      <span className="absolute -top-4 left-0 text-[10px] text-gray-200">{hiddenLabel}</span>
                    </button>
                  )
                }

                return (
                  <button
                    key={overlay.id}
                    onClick={() => handleOverlayInteract(overlay)}
                    onMouseEnter={() => setHintText(`${overlay.label}: inspect this point for context.`)}
                    className={`absolute rounded-full border px-2 py-1 text-[10px] transition ${
                      focused
                        ? 'border-amber-300/70 bg-amber-500/15 text-amber-100'
                        : 'border-white/30 bg-black/50 text-gray-100 hover:bg-white/10'
                    } ${overlay.animated ? 'animate-pulse' : ''}`}
                    style={{ left: `${overlay.x}%`, top: `${overlay.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {hiddenLabel}
                  </button>
                )
              })}
            </div>

            <div className="absolute bottom-3 right-3 w-[280px] rounded-xl border border-white/10 bg-black/70 p-3 text-sm backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-wide text-purple-200 mb-1">{learningMode} mode</p>
              <p className="text-gray-100 leading-snug">{hintText}</p>
              {simulation.enabled && (
                <div className="mt-2 border-t border-white/10 pt-2 text-[11px] text-gray-200">
                  <p>Trades: {simulationMetrics.totalTrades} | Closed: {simulationMetrics.closedTrades}</p>
                  <p>Win Rate: {simulationMetrics.winRate.toFixed(1)}%</p>
                  <p>
                    PnL: {simulationMetrics.totalPnL >= 0 ? '+' : ''}
                    {simulationMetrics.totalPnL.toFixed(2)}
                  </p>
                  <p>
                    Balance: {(simulation.balance + simulationMetrics.totalPnL).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {simulation.enabled && (
            <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-3">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-wide text-cyan-200">Trade Journal</p>
                <div className="flex flex-wrap items-center gap-2">
                  {(['all', 'open', 'closed'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setJournalFilter(filter)}
                      className={`rounded-md border px-2 py-1 text-[11px] transition ${
                        journalFilter === filter
                          ? 'border-cyan-300/50 bg-cyan-500/10 text-cyan-100'
                          : 'border-white/20 bg-black/30 text-gray-200 hover:bg-white/10'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                  <button
                    onClick={handleExportJournalCsv}
                    disabled={!filteredTradeRows.length}
                    className="rounded-md border border-white/20 bg-black/30 px-2 py-1 text-[11px] text-gray-200 transition enabled:hover:bg-white/10 disabled:opacity-40"
                  >
                    Export CSV
                  </button>
                  <p className="text-[11px] text-gray-300">{filteredTradeRows.length} row(s)</p>
                </div>
              </div>

              {filteredTradeRows.length === 0 ? (
                <p className="text-xs text-gray-400">Place trades with 3 clicks on chart: entry, stop, target.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-[11px] text-gray-200">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400">
                        <th className="px-2 py-1">ID</th>
                        <th className="px-2 py-1">Dir</th>
                        <th className="px-2 py-1">Status</th>
                        <th className="px-2 py-1">Entry</th>
                        <th className="px-2 py-1">Stop</th>
                        <th className="px-2 py-1">Target</th>
                        <th className="px-2 py-1">Exit</th>
                        <th className="px-2 py-1">ExitType</th>
                        <th className="px-2 py-1">RR</th>
                        <th className="px-2 py-1">PnL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTradeRows.map((row) => (
                        <tr key={row.id} className="border-b border-white/5 last:border-0">
                          <td className="px-2 py-1.5 text-gray-300">{row.id}</td>
                          <td className={`px-2 py-1.5 ${row.direction === 'long' ? 'text-emerald-300' : 'text-rose-300'}`}>
                            {row.direction}
                          </td>
                          <td className={`px-2 py-1.5 ${row.status === 'open' ? 'text-amber-300' : 'text-gray-200'}`}>{row.status}</td>
                          <td className="px-2 py-1.5">{row.entry.toFixed(2)}</td>
                          <td className="px-2 py-1.5">{row.stop.toFixed(2)}</td>
                          <td className="px-2 py-1.5">{row.target.toFixed(2)}</td>
                          <td className="px-2 py-1.5">{typeof row.exit === 'number' ? row.exit.toFixed(2) : '-'}</td>
                          <td className="px-2 py-1.5">{row.exitType}</td>
                          <td className="px-2 py-1.5">1:{row.rr.toFixed(2)}</td>
                          <td className={`px-2 py-1.5 ${row.pnl >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                            {row.pnl >= 0 ? '+' : ''}
                            {row.pnl.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {!showAdvancedControls && (
            <div className="mt-3 flex flex-wrap gap-2">
              {['BOS', 'CHoCH', 'EQH', 'EQL', 'OB', 'FVG', 'IFVG', 'Mitigation'].map((term) => (
                <button
                  key={term}
                  onClick={() => handleAbbreviationClick(term)}
                  className="rounded-md border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] text-gray-100 transition hover:bg-white/10"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
