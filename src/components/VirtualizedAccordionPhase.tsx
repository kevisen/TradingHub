import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import type { Phase, Lesson } from '../lib/types'

type Props = {
  phase: Phase
  onSelectLesson: (id: string) => void
  completed: string[]
}

const ITEM_HEIGHT = 36 // height of each lesson button
const VISIBLE_ITEMS = 10 // show ~10 lessons at a time

export default function VirtualizedAccordionPhase({ phase, onSelectLesson, completed }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)

  const lessons = useMemo(() => phase.lessons, [phase.lessons])
  const startIdx = useMemo(() => Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 1), [scrollTop])
  const endIdx = useMemo(() => Math.min(lessons.length, startIdx + VISIBLE_ITEMS + 2), [startIdx, lessons.length])
  const visibleLessons = useMemo(() => lessons.slice(startIdx, endIdx), [lessons, startIdx, endIdx])

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    setScrollTop((e.target as HTMLDivElement).scrollTop)
  }

  const offsetY = startIdx * ITEM_HEIGHT

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
        <span className="text-secondaryText">{open ? '−' : '+'} ({lessons.length})</span>
      </button>

      {open && (
        <div role="region" aria-labelledby={`phase-button-${phase.id}`} id={`phase-panel-${phase.id}`} className="p-2 bg-panel">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            style={{ height: Math.min(ITEM_HEIGHT * VISIBLE_ITEMS, lessons.length * ITEM_HEIGHT), overflow: 'auto' }}
            className="relative"
          >
            {/* Spacer before visible items */}
            {startIdx > 0 && <div style={{ height: `${startIdx * ITEM_HEIGHT}px` }} />}

            {/* Visible items */}
            {visibleLessons.map((l: Lesson) => (
              <button
                key={l.id}
                onClick={() => onSelectLesson(l.id)}
                className={`w-full text-left px-2 py-1 rounded block ${completed.includes(l.id) ? 'text-accent' : 'text-primaryText'}`}
                style={{ minHeight: ITEM_HEIGHT }}
              >
                {l.title}
              </button>
            ))}

            {/* Spacer after visible items */}
            {endIdx < lessons.length && <div style={{ height: `${(lessons.length - endIdx) * ITEM_HEIGHT}px` }} />}
          </div>
        </div>
      )}
    </div>
  )
}
