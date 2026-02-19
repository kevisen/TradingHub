import React, { useState } from 'react'
import type { Phase } from '../lib/types'

type Props = {
  phase: Phase
  onSelectLesson: (id: string) => void
  completed: string[]
}

export default function AccordionPhase({ phase, onSelectLesson, completed }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded">
      <button
        aria-expanded={open}
        aria-controls={`phase-panel-${phase.id}`}
        id={`phase-button-${phase.id}`}
        className="w-full text-left px-3 py-2 flex items-center justify-between"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium">{phase.title}</span>
        <span className="text-secondaryText">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div role="region" aria-labelledby={`phase-button-${phase.id}`} id={`phase-panel-${phase.id}`} className="p-2 bg-panel">
          {phase.lessons.map((l) => (
            <div key={l.id} className="py-1">
              <button
                onClick={() => onSelectLesson(l.id)}
                className={`w-full text-left px-2 py-1 rounded ${completed.includes(l.id) ? 'text-accent' : 'text-primaryText'}`}
                aria-pressed={completed.includes(l.id)}
                type="button"
              >
                {l.title}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
