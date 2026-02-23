import React from 'react'
import { loadCurriculum } from '../lib/curriculumEngine'
import SidebarCurriculum from '../components/SidebarCurriculum'
import { useUserProgressStore } from '../stores/userProgressStore'

export default function CurriculumPage() {
  const curriculum = loadCurriculum()
  const completed = useUserProgressStore((s) => s.completedLessons)

  function navigateLesson(id: string) {
    window.location.hash = `#/lesson/${id}`
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Your Curriculum</h2>
        <p className="text-gray-400">Select a lesson from the sidebar to begin learning</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 overflow-hidden transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10">
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
          }}>
        </div>

        <div className="relative z-10 text-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Get Started</h3>
              <p className="text-gray-400 mt-2">Choose an instructor and level from the sidebar to begin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
