import React, { useEffect, useState } from 'react'
import AccessCodeGate from './components/AccessCodeGate'
import SidebarCurriculum from './components/SidebarCurriculum'
import LessonPlayer from './components/LessonPlayer'
import InstructorDashboard from './pages/InstructorDashboard'
import JournalView from './components/Journal/JournalView'
import { tryLoadGeneratedCurriculum, loadCurriculum, findLessonById } from './lib/curriculumEngine'
import { useUserProgressStore } from './stores/userProgressStore'
import type { Lesson } from './lib/types'

// Lazy route pages
const CurriculumPage = React.lazy(() => import('./pages/CurriculumPage'))
const LessonPage = React.lazy(() => import('./pages/LessonPage'))
const ChartsPage = React.lazy(() => import('./pages/ChartsPage'))
const ToolsPage = React.lazy(() => import('./pages/ToolsPage'))
const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'))
const BackupPage = React.lazy(() => import('./pages/BackupPage'))

function AppInner() {
  const curriculum = loadCurriculum()
  const completed = useUserProgressStore((s) => s.completedLessons)
  const markCompleted = useUserProgressStore((s) => s.markCompleted)

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showJournal, setShowJournal] = useState(false)
  const [route, setRoute] = useState<string>(window.location.hash || '#/')

  useEffect(() => {
    // Try to replace sample curriculum with generated file if available
    tryLoadGeneratedCurriculum().then((loaded) => {
      if (loaded) {
        // force re-render by selecting first lesson from newly loaded curriculum
        const first = loadCurriculum().instructors?.[0]?.markets?.[0]?.strategies?.[0]?.phases?.[0]?.lessons?.[0]
        if (first) setSelectedLesson(first)
      }
    })
  }, [])

  useEffect(() => {
    function onHash() {
      setRoute(window.location.hash || '#/')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    // preselect first lesson if present
    const first = curriculum.instructors?.[0]?.markets?.[0]?.strategies?.[0]?.phases?.[0]?.lessons?.[0]
    if (first) setSelectedLesson(first)
  }, [])

  function handleSelectLesson(id: string) {
    const l = findLessonById(id)
    if (l) setSelectedLesson(l)
  }

  return (
    <div className="min-h-screen bg-background text-primaryText font-ui">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4 p-4">
        <aside className="col-span-3 md:col-span-3 lg:col-span-3 bg-panel border border-border rounded px-3 py-4">
          <h1 className="text-lg font-semibold">Bootcamp</h1>
          <div className="mt-4">
            <SidebarCurriculum curriculum={curriculum} onSelectLesson={handleSelectLesson} completed={completed} />
          </div>
        </aside>

        <main className="col-span-9 bg-panel border border-border rounded px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{selectedLesson?.title ?? 'Lesson Viewer'}</h2>
            <div className="text-sm text-secondaryText">Progress: {Math.round((completed.length / 1) * 100)}%</div>
          </div>

          <section className="mt-4">
            <div className="w-full h-64 bg-black/40 rounded flex items-center justify-center text-secondaryText">
              {selectedLesson ? (
                <div className="text-center">
                  <div className="mb-2">Video iframe placeholder</div>
                  <div className="text-xs text-secondaryText">{selectedLesson.description}</div>
                </div>
              ) : (
                'Video placeholder'
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <div className="bg-panel border border-border rounded p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <strong>Overview</strong>
                      <p className="text-sm text-secondaryText mt-2">{selectedLesson?.description}</p>
                    </div>
                    <div>
                      <button className="px-2 py-1 border border-border rounded text-sm text-secondaryText mr-2" onClick={() => setShowDashboard((s) => !s)}>
                        {showDashboard ? 'Close Dashboard' : 'Instructor Dashboard'}
                      </button>
                      <button className="px-2 py-1 border border-border rounded text-sm text-secondaryText" onClick={() => setShowJournal((s) => !s)}>
                        {showJournal ? 'Close Journal' : 'Journal'}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-accent text-black rounded"
                      onClick={() => selectedLesson && markCompleted(selectedLesson.id)}
                    >
                      Mark Complete
                    </button>
                    <button className="px-3 py-1 border border-border rounded text-secondaryText">Open Quiz</button>
                  </div>

                  <div className="mt-4">
                    <React.Suspense fallback={<div className="text-secondaryText">Loading page...</div>}>
                      {route.startsWith('#/lesson/') ? (
                        <LessonPage />
                      ) : route === '#/charts' ? (
                        <ChartsPage />
                      ) : route === '#/tools' ? (
                        <ToolsPage />
                      ) : route === '#/analytics' ? (
                        <AnalyticsPage />
                      ) : route === '#/backup' ? (
                        <BackupPage />
                      ) : route === '#/curriculum' || route === '#/' ? (
                        <CurriculumPage />
                      ) : showDashboard ? (
                        <InstructorDashboard curriculum={loadCurriculum()} onSelectLesson={handleSelectLesson} completed={completed} />
                      ) : showJournal ? (
                        <JournalView />
                      ) : (
                        selectedLesson && <LessonPlayer lesson={selectedLesson} />
                      )}
                    </React.Suspense>
                  </div>
                </div>
              </div>

              <aside className="col-span-1">
                <div className="bg-panel border border-border rounded p-3">Sidebar tools / quiz / notes</div>
              </aside>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AccessCodeGate>
      <AppInner />
    </AccessCodeGate>
  )
}
