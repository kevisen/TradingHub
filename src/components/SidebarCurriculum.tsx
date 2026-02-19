import React from 'react'
import type { Curriculum } from '../lib/types'

type Props = {
  curriculum: Curriculum
  onSelectLesson: (id: string) => void
  completed: string[]
}

export default function SidebarCurriculum({ curriculum, onSelectLesson, completed }: Props) {
  function navigateToLesson(id: string) {
    // navigate using hash-based routing
    window.location.hash = `#/lesson/${encodeURIComponent(id)}`
    if (onSelectLesson) onSelectLesson(id)
  }

  return (
    <nav aria-label="Curriculum Navigation">
      {curriculum.instructors.map((inst) => (
        <div key={inst.id} className="mb-4">
          <div className="text-sm font-semibold">{inst.name}</div>
          <div className="mt-2 text-sm text-secondaryText">
            {inst.markets.map((m) => (
              <div key={m.id}>
                <div className="font-medium">{m.title}</div>
                <div className="pl-2 mt-1">
                  {m.strategies.map((s) => (
                    <div key={s.id} className="mb-1">
                      <div className="text-[13px]">{s.title}</div>
                      <div className="pl-2">
                        {s.phases.map((p) => (
                          <div key={p.id} className="text-[13px] mt-1">
                            <div className="italic text-secondaryText">{p.title}</div>
                            <div className="pl-2 mt-1">
                              {p.lessons.map((l) => (
                                <button
                                  key={l.id}
                                  onClick={() => navigateToLesson(l.id)}
                                  className={`block text-left w-full py-1 px-2 rounded ${completed.includes(l.id) ? 'text-accent' : 'text-primaryText'}`}
                                >
                                  {l.title}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}
