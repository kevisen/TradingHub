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
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-3">
        <div className="bg-panel border border-border rounded p-3">
          <h3 className="font-semibold">Curriculum</h3>
          <SidebarCurriculum curriculum={curriculum} onSelectLesson={navigateLesson} completed={completed} />
        </div>
      </aside>

      <main className="col-span-9">
        <div className="bg-panel border border-border rounded p-4">Select a lesson from the left to begin.</div>
      </main>
    </div>
  )
}
