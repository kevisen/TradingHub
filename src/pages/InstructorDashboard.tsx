'use client'

import React from 'react'
import type { Curriculum } from '../lib/types'
import AccordionPhase from '../components/AccordionPhase'

type Props = {
  curriculum: Curriculum
  onSelectLesson: (id: string) => void
  completed: string[]
}

export default function InstructorDashboard({ curriculum, onSelectLesson, completed }: Props) {
  if (!curriculum?.instructors) return null

  return (
    <div className="space-y-4">
      {curriculum.instructors.map((inst) => (
        <div key={inst.id} className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10">
          {/* Glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
            }}>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-2xl font-bold text-white">{inst.name}</div>
                <div className="text-sm text-purple-300 mt-1">{inst.markets.length} Markets Available</div>
              </div>
            </div>

            <div className="space-y-4">
              {inst.markets.map((m) => (
                <div key={m.id} className="border-l-2 border-purple-500/30 pl-4">
                  <div className="font-semibold text-white mb-3">{m.title}</div>
                  <div className="space-y-3">
                    {m.strategies.map((s) => (
                      <div key={s.id} className="">
                        <div className="text-sm font-medium text-gray-300 mb-2">{s.title}</div>
                        <div className="space-y-2 ml-2">
                          {s.phases.map((p) => (
                            <AccordionPhase key={p.id} phase={p} onSelectLesson={onSelectLesson} completed={completed} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
