import { create } from 'zustand'
import { getItem, setItem } from '../lib/storage'

type ProgressState = {
  completedLessons: string[]
  timeSpentPerLesson: Record<string, number>
  quizScores: Record<string, number>
  weakTags: Record<string, number>
  lastAccessedLesson?: string
  labXP: number
  labCompletion: number
  labSkillBadge: 'Novice' | 'Developing' | 'Proficient' | 'Expert'
  markCompleted: (lessonId: string) => void
  addTime: (lessonId: string, minutes: number) => void
  setQuizScore: (lessonId: string, score: number) => void
  addLabXP: (amount: number) => void
  setLabCompletion: (percent: number) => void
}

const STORAGE_KEY = 'userProgress'
const storedProgress = (getItem(STORAGE_KEY) as Partial<ProgressState>) ?? {}

export const useUserProgressStore = create<ProgressState>((set, get) => ({
  completedLessons: storedProgress.completedLessons ?? [],
  timeSpentPerLesson: storedProgress.timeSpentPerLesson ?? {},
  quizScores: storedProgress.quizScores ?? {},
  weakTags: storedProgress.weakTags ?? {},
  lastAccessedLesson: storedProgress.lastAccessedLesson,
  labXP: typeof storedProgress.labXP === 'number' ? storedProgress.labXP : 0,
  labCompletion: typeof storedProgress.labCompletion === 'number' ? storedProgress.labCompletion : 0,
  labSkillBadge:
    storedProgress.labSkillBadge === 'Expert' ||
    storedProgress.labSkillBadge === 'Proficient' ||
    storedProgress.labSkillBadge === 'Developing'
      ? storedProgress.labSkillBadge
      : 'Novice',
  markCompleted: (lessonId) => {
    set((s) => {
      const next = { ...s, completedLessons: Array.from(new Set([...s.completedLessons, lessonId])) }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
  addTime: (lessonId, minutes) => {
    set((s) => {
      const nextTimes = { ...s.timeSpentPerLesson, [lessonId]: (s.timeSpentPerLesson[lessonId] || 0) + minutes }
      const next = { ...s, timeSpentPerLesson: nextTimes }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
  setQuizScore: (lessonId, score) => {
    set((s) => {
      const nextScores = { ...s.quizScores, [lessonId]: score }
      const next = { ...s, quizScores: nextScores }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
  addLabXP: (amount) => {
    set((s) => {
      if (!amount) return s
      const nextXP = Math.max(0, s.labXP + amount)
      if (nextXP === s.labXP) return s
      const nextBadge: ProgressState['labSkillBadge'] =
        nextXP >= 600 ? 'Expert' : nextXP >= 350 ? 'Proficient' : nextXP >= 150 ? 'Developing' : 'Novice'
      const next = { ...s, labXP: nextXP, labSkillBadge: nextBadge }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
  setLabCompletion: (percent) => {
    set((s) => {
      const nextCompletion = Math.min(100, Math.max(0, Math.round(percent)))
      if (nextCompletion === s.labCompletion) return s
      const next = { ...s, labCompletion: nextCompletion }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
}))
