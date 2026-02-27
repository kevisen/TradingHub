import { AnimatePresence, motion } from 'framer-motion'
import type { PatternDefinition } from '../../../data/patternDefinitions'

type QuizChoice = 'Doji' | 'Hammer' | 'Engulfing' | 'Shooting Star'

type PatternInfoPanelProps = {
  isOpen: boolean
  selectedPattern: PatternDefinition | null
  testMode: boolean
  showHint: boolean
  streak: number
  quizResult: { status: 'correct' | 'wrong'; message: string } | null
  onClose: () => void
  onToggleHint: () => void
  onToggleTestMode: () => void
  onSelectAnswer: (choice: QuizChoice) => void
}

const quizChoices: QuizChoice[] = ['Doji', 'Hammer', 'Engulfing', 'Shooting Star']

export default function PatternInfoPanel({
  isOpen,
  selectedPattern,
  testMode,
  showHint,
  streak,
  quizResult,
  onClose,
  onToggleHint,
  onToggleTestMode,
  onSelectAnswer,
}: PatternInfoPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 28 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-400">Interactive Candle Mindmap</p>
              <h3 className="text-xl font-semibold">{testMode ? 'Test Me Mode' : 'Pattern Details'}</h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border border-white/20 px-3 py-1 text-sm text-gray-200 transition hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-gray-300">
            Education only. This is a learning simulation, not a live trading signal.
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={onToggleHint}
              className="rounded-lg bg-purple-600/80 px-3 py-2 text-sm font-medium text-white transition hover:bg-purple-500"
            >
              {showHint ? 'Hide Quick Hint' : 'Show Quick Hint'}
            </button>
            <button
              onClick={onToggleTestMode}
              className="rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
            >
              {testMode ? 'Disable Test Mode' : 'Toggle Test Mode'}
            </button>
          </div>

          {testMode ? (
            <div className="space-y-3">
              <p className="text-lg font-semibold">What pattern is this?</p>
              <div className="grid grid-cols-2 gap-2">
                {quizChoices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => onSelectAnswer(choice)}
                    className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-sm text-gray-100 transition hover:bg-white/10"
                  >
                    {choice}
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-300">Current streak: {streak}</p>

              {quizResult && (
                <div
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    quizResult.status === 'correct'
                      ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                      : 'border-red-400/40 bg-red-500/10 text-red-200'
                  }`}
                >
                  {quizResult.message}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2 text-sm text-gray-200">
              <p className="text-lg font-semibold">{selectedPattern?.name ?? 'No pattern detected'}</p>
              <p>Type: {selectedPattern?.type ?? 'N/A'}</p>
              <p>Bias: {selectedPattern?.bias ?? 'N/A'}</p>
              <p className="text-gray-300">{selectedPattern?.description ?? 'Click a candle to inspect details.'}</p>
              {showHint && (
                <div className="mt-2 rounded-lg border border-white/10 bg-black/30 p-3">
                  <p className="font-medium text-purple-200">Quick Hint</p>
                  <p>{selectedPattern?.hint ?? 'No hint available for this candle.'}</p>
                  {selectedPattern?.shortTerm && <p className="mt-1 text-gray-300">{selectedPattern.shortTerm}</p>}
                </div>
              )}
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
