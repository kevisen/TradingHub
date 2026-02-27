export type CandleSample = {
  time: string
  open: number
  high: number
  low: number
  close: number
}

export const candleSampleData: CandleSample[] = [
  { time: '2026-02-01', open: 100, high: 110, low: 95, close: 108 },
  { time: '2026-02-02', open: 108, high: 112, low: 101, close: 102 },
  { time: '2026-02-03', open: 102, high: 103, low: 90, close: 91 },
  { time: '2026-02-04', open: 90, high: 105, low: 88, close: 104 },
  { time: '2026-02-05', open: 104, high: 106, low: 100, close: 101 },
  { time: '2026-02-06', open: 101, high: 115, low: 99, close: 114 },
  { time: '2026-02-07', open: 114, high: 116, low: 105, close: 107 },
  { time: '2026-02-08', open: 107, high: 108, low: 106, close: 107 },
]
