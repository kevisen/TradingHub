import type { PatternDefinition } from '../../../data/patternDefinitions'

type PatternTooltipProps = {
  x: number
  y: number
  pattern: PatternDefinition | null
  visible: boolean
}

export default function PatternTooltip({ x, y, pattern, visible }: PatternTooltipProps) {
  if (!visible) return null

  return (
    <div
      className="pointer-events-none absolute z-20 min-w-52 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur-lg shadow-xl"
      style={{ left: x + 12, top: y + 12 }}
      aria-live="polite"
    >
      {pattern ? (
        <>
          <p className="font-semibold text-sm">{pattern.name}</p>
          <p className="text-gray-200">Type: {pattern.type}</p>
          <p className="text-gray-200">Bias: {pattern.bias}</p>
        </>
      ) : (
        <p className="font-medium">No pattern detected</p>
      )}
    </div>
  )
}
