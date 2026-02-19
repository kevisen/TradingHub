import React, { useState, useEffect } from 'react'
import type { Lesson } from '../lib/types'
import RiskRewardCalculator from './tools/RiskRewardCalculator'
import PositionSizeCalculator from './tools/PositionSizeCalculator'
import PLSimulator from './tools/PLSimulator'
const ChartPanel = React.lazy(() => import('./charts/ChartPanel'))
import { useUserProgressStore } from '../stores/userProgressStore'

type Props = {
  lesson: Lesson
}

export default function LessonPlayer({ lesson }: Props) {
  const [tab, setTab] = useState<'overview' | 'notes' | 'quiz' | 'tools'>('overview')
  const addTime = useUserProgressStore((s) => s.addTime)

  useEffect(() => {
    // simple time tracking placeholder
    const id = setInterval(() => addTime(lesson.id, 1), 60_000)
    return () => clearInterval(id)
  }, [lesson.id, addTime])

  return (
    <div>
      <div className="mb-3">
        <div role="tablist" aria-label="Lesson Tabs" className="flex gap-2">
          <button role="tab" aria-selected={tab === 'overview'} aria-controls="tabpanel-overview" onClick={() => setTab('overview')} className={`px-2 py-1 ${tab === 'overview' ? 'border-b-2 border-accent' : 'text-secondaryText'}`}>
            Overview
          </button>
          <button role="tab" aria-selected={tab === 'notes'} aria-controls="tabpanel-notes" onClick={() => setTab('notes')} className={`px-2 py-1 ${tab === 'notes' ? 'border-b-2 border-accent' : 'text-secondaryText'}`}>Notes</button>
          <button role="tab" aria-selected={tab === 'quiz'} aria-controls="tabpanel-quiz" onClick={() => setTab('quiz')} className={`px-2 py-1 ${tab === 'quiz' ? 'border-b-2 border-accent' : 'text-secondaryText'}`}>Quiz</button>
          <button role="tab" aria-selected={tab === 'tools'} aria-controls="tabpanel-tools" onClick={() => setTab('tools')} className={`px-2 py-1 ${tab === 'tools' ? 'border-b-2 border-accent' : 'text-secondaryText'}`}>Tools</button>
        </div>
      </div>

      <div>
        <div id="tabpanel-overview" role="tabpanel" hidden={tab !== 'overview'} aria-labelledby="overview">
          {tab === 'overview' && <div className="text-sm text-secondaryText">{lesson.description}</div>}
        </div>

        <div id="tabpanel-notes" role="tabpanel" hidden={tab !== 'notes'} aria-labelledby="notes">
          {tab === 'notes' && <div className="text-sm text-secondaryText">Notes area (structured notes saved in journal later).</div>}
        </div>

        <div id="tabpanel-quiz" role="tabpanel" hidden={tab !== 'quiz'} aria-labelledby="quiz">
          {tab === 'quiz' && (
            <div className="space-y-4">
              {(lesson.quiz?.length || 0) === 0 ? (
                <div className="text-secondaryText">No quiz for this lesson.</div>
              ) : (
                <div className="text-secondaryText">Quiz (managed by main component)</div>
              )}
            </div>
          )}
        </div>

        <div id="tabpanel-tools" role="tabpanel" hidden={tab !== 'tools'} aria-labelledby="tools">
          {tab === 'tools' && (
            <div className="space-y-4">
              <div>
                <div className="font-medium">Risk / Reward</div>
                <RiskRewardCalculator />
              </div>

              <div>
                <div className="font-medium">Position Size</div>
                <PositionSizeCalculator />
              </div>

              <div>
                <div className="font-medium">Profit/Loss Simulator (Equity Curve)</div>
                <PLSimulator />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Charts</div>
                  <div className="text-sm text-secondaryText">Charts are lazy-loaded to save resources</div>
                </div>
                <div className="mt-2">
                  <React.Suspense fallback={<div className="text-secondaryText">Loading charts...</div>}>
                    <ChartPanel />
                  </React.Suspense>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
