import rawLabData from './tradingLanguageLabData.json'
import { candleSampleData, type CandleSample } from '../../data/candleSampleData'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'
export type CategoryId =
  | 'candlestick_patterns'
  | 'market_structure'
  | 'liquidity_concepts'
  | 'timeframes'
  | 'entry_models'
  | 'trading_abbreviations'
  | 'risk_management'

export type LabConcept = {
  id: string
  title: string
  category: CategoryId
  difficulty: DifficultyLevel
  bias: string
  definition: string
  idealContext: string
  beginnerMistake: string
  timeframePreference: string
  timeframeRelevance: string
  practicalUsage: string
  chartKey: string
  abbreviation: string
  premiumOnly: boolean
}

export type LabCategory = {
  id: CategoryId
  label: string
  description: string
}

export type GlossaryItem = {
  term: string
  conceptId: string
  category: string
  skillLevel: DifficultyLevel
}

export type GuidedFlowStep = {
  id: string
  label: string
  instruction: string
  targetAnnotationId: string
}

export type GuidedFlow = {
  id: string
  title: string
  steps: GuidedFlowStep[]
}

export type TimeframeProfile = {
  id: 'scalp' | 'intraday' | 'swing'
  label: string
  htf: string
  ltf: string
  entryExample: string
  biasNote: string
}

export type ChartAnnotation = {
  id: string
  label: string
  x: number
  y: number
  style: 'line' | 'zone' | 'point'
  targetConceptIds?: string[]
}

type LabData = {
  categories: LabCategory[]
  concepts: LabConcept[]
  glossary: GlossaryItem[]
  guidedFlows: GuidedFlow[]
  timeframeProfiles: TimeframeProfile[]
}

export const tradingLanguageLabData = rawLabData as LabData

export const conceptById = tradingLanguageLabData.concepts.reduce<Record<string, LabConcept>>((acc, concept) => {
  acc[concept.id] = concept
  return acc
}, {})

export const chartAnnotationsByKey: Record<string, ChartAnnotation[]> = {
  candles_reversal: [
    { id: 'structure-leg', label: 'Impulse Leg', x: 15, y: 22, style: 'line' },
    { id: 'liquidity-pool', label: 'Rejection Zone', x: 62, y: 16, style: 'zone' },
    { id: 'entry-zone', label: 'Entry Trigger', x: 72, y: 52, style: 'point' },
  ],
  candles_sequence: [
    { id: 'structure-leg', label: 'Momentum Leg', x: 18, y: 24, style: 'line' },
    { id: 'choch-confirmation', label: 'Sequence Confirm', x: 60, y: 38, style: 'line' },
    { id: 'entry-zone', label: 'Pullback Entry', x: 75, y: 60, style: 'zone' },
  ],
  candles_consolidation: [
    { id: 'structure-leg', label: 'Compression Range', x: 28, y: 32, style: 'zone' },
    { id: 'sweep-zone', label: 'Breakout Sweep', x: 57, y: 26, style: 'point' },
    { id: 'entry-zone', label: 'Retest Entry', x: 76, y: 56, style: 'point' },
  ],
  market_structure: [
    { id: 'structure-leg', label: 'Swing Structure', x: 12, y: 18, style: 'line' },
    { id: 'choch-confirmation', label: 'CHoCH/MSS Confirm', x: 58, y: 42, style: 'line' },
    { id: 'entry-zone', label: 'Continuation Zone', x: 82, y: 58, style: 'zone' },
  ],
  liquidity_sweep: [
    { id: 'liquidity-pool', label: 'EQH/EQL Pool', x: 25, y: 22, style: 'zone' },
    { id: 'sweep-zone', label: 'Liquidity Sweep', x: 56, y: 24, style: 'point' },
    { id: 'choch-confirmation', label: 'Reaction CHoCH', x: 70, y: 46, style: 'line' },
    { id: 'entry-zone', label: 'Post-Sweep Entry', x: 82, y: 62, style: 'point' },
  ],
  ict_entry: [
    { id: 'structure-leg', label: 'Displacement Leg', x: 15, y: 24, style: 'line' },
    { id: 'liquidity-pool', label: 'PD Array Zone', x: 54, y: 33, style: 'zone' },
    { id: 'entry-zone', label: 'OB/FVG Entry', x: 76, y: 58, style: 'point' },
  ],
  risk_map: [
    { id: 'entry-zone', label: 'Entry', x: 70, y: 54, style: 'point' },
    { id: 'liquidity-pool', label: 'SL Zone', x: 58, y: 74, style: 'zone' },
    { id: 'sweep-zone', label: 'TP Objective', x: 82, y: 24, style: 'zone' },
  ],
}

export const conceptMarkersById: Record<string, number[]> = {
  doji: [7],
  hammer: [3],
  shooting_star: [6],
  bullish_engulfing: [3],
  bearish_engulfing: [1],
  inside_bar: [7],
  pin_bar: [6],
  morning_star: [3],
  evening_star: [6],
  three_white_soldiers: [2, 3, 5],
  three_black_crows: [0, 1, 2],
  tweezer_top: [5, 6],
  tweezer_bottom: [2, 3],
  order_block_candle: [2],
  mitigation_candle: [4],
  displacement_candle: [5],
  inducement_candle: [6],
  breaker_formation: [4],
}

export function getConceptsForCategory(categoryId: CategoryId): LabConcept[] {
  if (categoryId === 'trading_abbreviations') {
    const conceptIds = new Set(tradingLanguageLabData.glossary.map((item) => item.conceptId))
    return tradingLanguageLabData.concepts.filter((concept) => conceptIds.has(concept.id))
  }

  return tradingLanguageLabData.concepts.filter((concept) => concept.category === categoryId)
}

export function getScenarioData(scenario: TimeframeProfile['id']): CandleSample[] {
  if (scenario === 'scalp') return candleSampleData

  if (scenario === 'intraday') {
    return candleSampleData.map((candle, index) => ({
      ...candle,
      open: candle.open + index * 0.8,
      high: candle.high + index,
      low: candle.low + index * 0.6,
      close: candle.close + index * 0.9,
    }))
  }

  return candleSampleData.map((candle, index) => ({
    ...candle,
    open: candle.open + index * 2,
    high: candle.high + index * 2.2,
    low: candle.low + index * 1.8,
    close: candle.close + index * 2.1,
  }))
}

export type LearningTimeframe = 'M5' | 'M15' | 'H1' | 'H4' | 'D1'
export type ScenarioType =
  | 'bullish_trend'
  | 'bearish_trend'
  | 'range'
  | 'reversal'
  | 'accumulation'
  | 'distribution'

export type ConceptOverlayMode = 'structure' | 'liquidity' | 'entry'

export type VisualOverlay = {
  id: string
  group: ConceptOverlayMode
  kind: 'label' | 'line' | 'zone' | 'marker' | 'trendline'
  label: string
  x?: number
  y?: number
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  width?: number
  height?: number
  animated?: boolean
}

const timeframeConfig: Record<LearningTimeframe, { count: number; volatility: number; driftScale: number }> = {
  M5: { count: 64, volatility: 2.6, driftScale: 0.52 },
  M15: { count: 56, volatility: 2.2, driftScale: 0.6 },
  H1: { count: 44, volatility: 1.8, driftScale: 0.75 },
  H4: { count: 36, volatility: 1.4, driftScale: 0.95 },
  D1: { count: 28, volatility: 1.1, driftScale: 1.2 },
}

function scenarioDrift(index: number, count: number, scenario: ScenarioType): number {
  const half = Math.floor(count * 0.5)
  const third = Math.floor(count * 0.33)

  if (scenario === 'bullish_trend') return index * 0.9
  if (scenario === 'bearish_trend') return -index * 0.9
  if (scenario === 'range') return Math.sin(index / 2.3) * 6

  if (scenario === 'reversal') {
    if (index < half) return -index * 0.85
    return -(half * 0.85) + (index - half) * 1.25
  }

  if (scenario === 'accumulation') {
    if (index < third * 2) return Math.sin(index / 1.8) * 3.4
    return Math.sin(index / 2.4) * 2.4 + (index - third * 2) * 1.1
  }

  if (index < third * 2) return Math.sin(index / 2.6) * 3 + index * 0.45
  return third * 0.9 - (index - third * 2) * 1.3
}

function buildTimeLabel(index: number): string {
  const start = new Date(Date.UTC(2026, 0, 1))
  start.setUTCDate(start.getUTCDate() + index)
  return start.toISOString().slice(0, 10)
}

export function getChartDataForScenario(timeframe: LearningTimeframe, scenario: ScenarioType): CandleSample[] {
  const config = timeframeConfig[timeframe]

  return Array.from({ length: config.count }, (_, index) => {
    const wave = Math.sin(index / 1.7) * config.volatility
    const drift = scenarioDrift(index, config.count, scenario) * config.driftScale
    const basePrice = 100 + drift + wave
    const directionPush = Math.cos(index / 1.3) * (config.volatility * 0.8)

    const open = Number((basePrice + directionPush * 0.35).toFixed(2))
    const close = Number((basePrice - directionPush * 0.35).toFixed(2))
    const top = Math.max(open, close)
    const bottom = Math.min(open, close)
    const wickRange = config.volatility * 0.65 + Math.abs(Math.sin(index)) * 0.7

    return {
      time: buildTimeLabel(index),
      open,
      high: Number((top + wickRange).toFixed(2)),
      low: Number((bottom - wickRange).toFixed(2)),
      close,
    }
  })
}

function shifted(base: number, scenario: ScenarioType, timeframe: LearningTimeframe, scale = 1): number {
  const scenarioShift: Record<ScenarioType, number> = {
    bullish_trend: 0,
    bearish_trend: -2,
    range: 1,
    reversal: 3,
    accumulation: 2,
    distribution: -3,
  }

  const timeframeShift: Record<LearningTimeframe, number> = {
    M5: 2,
    M15: 1,
    H1: 0,
    H4: -1,
    D1: -2,
  }

  return base + (scenarioShift[scenario] + timeframeShift[timeframe]) * scale
}

export function getVisualOverlays(timeframe: LearningTimeframe, scenario: ScenarioType): VisualOverlay[] {
  return [
    { id: 'hh', group: 'structure', kind: 'label', label: 'HH', x: shifted(30, scenario, timeframe), y: shifted(24, scenario, timeframe, 0.5) },
    { id: 'hl', group: 'structure', kind: 'label', label: 'HL', x: shifted(44, scenario, timeframe), y: shifted(58, scenario, timeframe, 0.4) },
    { id: 'lh', group: 'structure', kind: 'label', label: 'LH', x: shifted(57, scenario, timeframe), y: shifted(33, scenario, timeframe, 0.35) },
    { id: 'll', group: 'structure', kind: 'label', label: 'LL', x: shifted(70, scenario, timeframe), y: shifted(66, scenario, timeframe, 0.4) },
    { id: 'bos', group: 'structure', kind: 'line', label: 'BOS Confirm', x1: shifted(48, scenario, timeframe), y1: shifted(35, scenario, timeframe, 0.3), x2: shifted(74, scenario, timeframe), y2: shifted(35, scenario, timeframe, 0.3) },
    { id: 'choch', group: 'structure', kind: 'marker', label: 'CHoCH', x: shifted(60, scenario, timeframe), y: shifted(48, scenario, timeframe, 0.4), animated: true },
    { id: 'structure_trendline', group: 'structure', kind: 'trendline', label: 'Trendline', x1: shifted(18, scenario, timeframe), y1: shifted(62, scenario, timeframe, 0.4), x2: shifted(78, scenario, timeframe), y2: shifted(30, scenario, timeframe, 0.4) },

    { id: 'eqh', group: 'liquidity', kind: 'line', label: 'EQH', x1: shifted(20, scenario, timeframe), y1: shifted(26, scenario, timeframe, 0.25), x2: shifted(42, scenario, timeframe), y2: shifted(26, scenario, timeframe, 0.25) },
    { id: 'eql', group: 'liquidity', kind: 'line', label: 'EQL', x1: shifted(20, scenario, timeframe), y1: shifted(72, scenario, timeframe, 0.25), x2: shifted(42, scenario, timeframe), y2: shifted(72, scenario, timeframe, 0.25) },
    { id: 'bsl_pool', group: 'liquidity', kind: 'zone', label: 'BSL Pool', x: shifted(28, scenario, timeframe), y: shifted(21, scenario, timeframe, 0.3), width: 26, height: 11 },
    { id: 'ssl_pool', group: 'liquidity', kind: 'zone', label: 'SSL Pool', x: shifted(28, scenario, timeframe), y: shifted(67, scenario, timeframe, 0.3), width: 26, height: 12 },
    { id: 'liquidity_sweep', group: 'liquidity', kind: 'marker', label: 'Sweep Wick', x: shifted(55, scenario, timeframe), y: shifted(19, scenario, timeframe, 0.25), animated: true },
    { id: 'inducement', group: 'liquidity', kind: 'line', label: 'Inducement', x1: shifted(46, scenario, timeframe), y1: shifted(45, scenario, timeframe, 0.3), x2: shifted(63, scenario, timeframe), y2: shifted(45, scenario, timeframe, 0.3) },

    { id: 'ob_zone', group: 'entry', kind: 'zone', label: 'Order Block', x: shifted(62, scenario, timeframe), y: shifted(54, scenario, timeframe, 0.3), width: 18, height: 15 },
    { id: 'fvg_box', group: 'entry', kind: 'zone', label: 'FVG', x: shifted(52, scenario, timeframe), y: shifted(38, scenario, timeframe, 0.3), width: 12, height: 10 },
    { id: 'ifvg_box', group: 'entry', kind: 'zone', label: 'IFVG', x: shifted(66, scenario, timeframe), y: shifted(34, scenario, timeframe, 0.3), width: 11, height: 9 },
    { id: 'mitigation_block', group: 'entry', kind: 'zone', label: 'Mitigation', x: shifted(72, scenario, timeframe), y: shifted(48, scenario, timeframe, 0.3), width: 12, height: 10 },
    { id: 'premium_zone', group: 'entry', kind: 'zone', label: 'Premium', x: shifted(48, scenario, timeframe, 0.2), y: shifted(18, scenario, timeframe, 0.2), width: 52, height: 16 },
    { id: 'discount_zone', group: 'entry', kind: 'zone', label: 'Discount', x: shifted(48, scenario, timeframe, 0.2), y: shifted(70, scenario, timeframe, 0.2), width: 52, height: 16 },
  ]
}

const abbreviationToMode: Record<string, { mode: ConceptOverlayMode; overlayId: string; hint: string }> = {
  BOS: { mode: 'structure', overlayId: 'bos', hint: 'Break confirmed by close through prior swing.' },
  CHOCH: { mode: 'structure', overlayId: 'choch', hint: 'Character shift hints trend transition.' },
  MSS: { mode: 'structure', overlayId: 'choch', hint: 'Watch displacement through protected swing.' },
  HH: { mode: 'structure', overlayId: 'hh', hint: 'Higher high confirms bullish structure leg.' },
  HL: { mode: 'structure', overlayId: 'hl', hint: 'Higher low supports continuation bias.' },
  LH: { mode: 'structure', overlayId: 'lh', hint: 'Lower high validates bearish pressure.' },
  LL: { mode: 'structure', overlayId: 'll', hint: 'Lower low confirms bearish continuation.' },
  EQH: { mode: 'liquidity', overlayId: 'eqh', hint: 'Equal highs are buy-side liquidity magnets.' },
  EQL: { mode: 'liquidity', overlayId: 'eql', hint: 'Equal lows are sell-side liquidity magnets.' },
  SSL: { mode: 'liquidity', overlayId: 'ssl_pool', hint: 'Sell-side liquidity often precedes reversals.' },
  BSL: { mode: 'liquidity', overlayId: 'bsl_pool', hint: 'Buy-side liquidity often gets swept first.' },
  OB: { mode: 'entry', overlayId: 'ob_zone', hint: 'Order block is the final opposite candle zone.' },
  FVG: { mode: 'entry', overlayId: 'fvg_box', hint: 'Imbalance zone between candle 1 and 3.' },
  IFVG: { mode: 'entry', overlayId: 'ifvg_box', hint: 'Invalidated FVG flips role in new direction.' },
  MITIGATION: { mode: 'entry', overlayId: 'mitigation_block', hint: 'Mitigation revisits unfilled orders before expansion.' },
  PREMIUM: { mode: 'entry', overlayId: 'premium_zone', hint: 'Short bias zones are stronger in premium area.' },
  DISCOUNT: { mode: 'entry', overlayId: 'discount_zone', hint: 'Long bias zones are stronger in discount area.' },
}

export function resolveAbbreviation(term: string) {
  return abbreviationToMode[term.toUpperCase()] ?? null
}

