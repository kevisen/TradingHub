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
    <div className="min-h-screen bg-black text-white font-ui dashboard-section">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 p-6">
        {/* Sidebar */}
        <aside className="col-span-3 md:col-span-3 lg:col-span-3">
          <div className="sticky top-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-4 overflow-hidden transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10">
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
              style={{
                background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
              }}>
            </div>

            <div className="relative z-10">
              <h1 className="text-2xl font-bold text-white mb-1">Trading Bootcamp</h1>
              <p className="text-xs text-purple-300 mb-6">Select your learning path</p>
              
              <div className="space-y-3">
                <SidebarCurriculum curriculum={curriculum} onSelectLesson={handleSelectLesson} completed={completed} />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-9 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 overflow-hidden transition-all duration-300 hover:border-purple-400/30">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 opacity-5 pointer-events-none rounded-xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
            }}>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">{selectedLesson?.title ?? 'Learning Viewer'}</h2>
                <p className="text-sm text-gray-400 mt-1">{selectedLesson?.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-400">{Math.round((completed.length / 1) * 100)}%</div>
                <div className="text-xs text-gray-400">Progress</div>
              </div>
            </div>

            <section className="space-y-6">
              <div className="w-full h-64 bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-lg flex items-center justify-center text-gray-400 border border-white/10">
                {selectedLesson ? (
                  <div className="text-center">
                    <div className="mb-4 text-2xl">▶</div>
                    <div className="font-semibold">Video Player</div>
                    <div className="text-xs text-gray-500 mt-2">{selectedLesson.description}</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-4 opacity-50">▶</div>
                    <span>Video placeholder - Select a lesson to begin</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  {/* Overview Section */}
                  <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">Overview</h3>
                        <p className="text-sm text-gray-400 mt-3 leading-relaxed">{selectedLesson?.description || 'Select a lesson to see details'}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <button 
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                        onClick={() => selectedLesson && markCompleted(selectedLesson.id)}
                      >
                        Mark Complete
                      </button>
                      <button 
                        className="px-6 py-2 rounded-lg border border-purple-400/50 text-purple-300 font-semibold hover:bg-purple-500/10 transition-all duration-300"
                      >
                        Open Quiz
                      </button>
                      <button 
                        className="px-6 py-2 rounded-lg border border-white/10 text-gray-300 font-semibold hover:bg-white/10 transition-all duration-300"
                        onClick={() => setShowDashboard((s) => !s)}
                      >
                        {showDashboard ? 'Hide Curriculum' : 'Show Curriculum'}
                      </button>
                      <button 
                        className="px-6 py-2 rounded-lg border border-white/10 text-gray-300 font-semibold hover:bg-white/10 transition-all duration-300"
                        onClick={() => setShowJournal((s) => !s)}
                      >
                        {showJournal ? 'Hide Journal' : 'Show Journal'}
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6">
                    <React.Suspense fallback={
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin">⚙</div>
                        <p className="text-gray-400 mt-2">Loading content...</p>
                      </div>
                    }>
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

                {/* Right Sidebar - Tools */}
                <aside className="col-span-1">
                  <div className="sticky top-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10">
                    <h4 className="font-bold text-white mb-4">Tools & Resources</h4>
                    <div className="space-y-3 text-sm text-gray-400">
                      <div className="p-3 rounded border border-white/10 hover:border-purple-400/50 cursor-pointer transition-colors">Quiz</div>
                      <div className="p-3 rounded border border-white/10 hover:border-purple-400/50 cursor-pointer transition-colors">Notes</div>
                      <div className="p-3 rounded border border-white/10 hover:border-purple-400/50 cursor-pointer transition-colors">Charts</div>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </div>
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
