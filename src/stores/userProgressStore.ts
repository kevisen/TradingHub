import { create } from 'zustand'
import { getItem, setItem } from '../lib/storage'

type ProgressState = {
  completedLessons: string[]
  timeSpentPerLesson: Record<string, number>
  quizScores: Record<string, number>
  weakTags: Record<string, number>
  lastAccessedLesson?: string
  markCompleted: (lessonId: string) => void
  addTime: (lessonId: string, minutes: number) => void
  setQuizScore: (lessonId: string, score: number) => void
}

const STORAGE_KEY = 'userProgress'
const storedProgress = (getItem(STORAGE_KEY) as Partial<ProgressState>) ?? {}

export const useUserProgressStore = create<ProgressState>((set, get) => ({
  completedLessons: storedProgress.completedLessons ?? [],
  timeSpentPerLesson: storedProgress.timeSpentPerLesson ?? {},
  quizScores: storedProgress.quizScores ?? {},
  weakTags: storedProgress.weakTags ?? {},
  lastAccessedLesson: storedProgress.lastAccessedLesson,
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
  }
}))
