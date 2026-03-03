import { create } from 'zustand'

type ReplayState = {
  enabled: boolean
  pointer: number
  playing: boolean
  speedMs: number
}

type OverlayToggles = {
  structure: boolean
  fvg: boolean
  liquidity: boolean
  patterns: boolean
}

type SimulationState = {
  enabled: boolean
  positionSize: number
  balance: number
}

type ChartState = {
  timeframe: string
  scenario: string
  replay: ReplayState
  overlays: OverlayToggles
  simulation: SimulationState
  setTimeframe: (timeframe: string) => void
  setScenario: (scenario: string) => void
  setReplay: (partial: Partial<ReplayState>) => void
  setOverlay: (overlay: keyof OverlayToggles, value: boolean) => void
  setSimulation: (partial: Partial<SimulationState>) => void
}

export const useChartStore = create<ChartState>((set) => ({
  timeframe: 'M15',
  scenario: 'bullish_trend',
  replay: {
    enabled: false,
    pointer: 50,
    playing: false,
    speedMs: 600,
  },
  overlays: {
    structure: true,
    fvg: true,
    liquidity: false,
    patterns: false,
  },
  simulation: {
    enabled: false,
    positionSize: 1,
    balance: 10000,
  },
  setTimeframe: (timeframe) => set(() => ({ timeframe })),
  setScenario: (scenario) => set(() => ({ scenario })),
  setReplay: (partial) => set((state) => ({ replay: { ...state.replay, ...partial } })),
  setOverlay: (overlay, value) =>
    set((state) => ({
      overlays: {
        ...state.overlays,
        [overlay]: value,
      },
    })),
  setSimulation: (partial) => set((state) => ({ simulation: { ...state.simulation, ...partial } })),
}))