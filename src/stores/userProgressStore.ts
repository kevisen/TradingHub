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

export const useUserProgressStore = create<ProgressState>((set, get) => ({
  completedLessons: getItem(STORAGE_KEY)?.completedLessons ?? [],
  timeSpentPerLesson: getItem(STORAGE_KEY)?.timeSpentPerLesson ?? {},
  quizScores: getItem(STORAGE_KEY)?.quizScores ?? {},
  weakTags: getItem(STORAGE_KEY)?.weakTags ?? {},
  lastAccessedLesson: getItem(STORAGE_KEY)?.lastAccessedLesson,
  markCompleted: (lessonId) => {
    set((s: any) => {
      const next = { ...s, completedLessons: Array.from(new Set([...s.completedLessons, lessonId])) }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
  addTime: (lessonId, minutes) => {
    set((s: any) => {
      const nextTimes = { ...s.timeSpentPerLesson, [lessonId]: (s.timeSpentPerLesson[lessonId] || 0) + minutes }
      const next = { ...s, timeSpentPerLesson: nextTimes }
      setItem(STORAGE_KEY, next)
      return next
    })
  },
  setQuizScore: (lessonId, score) => {
    set((s: any) => {
      const nextScores = { ...s.quizScores, [lessonId]: score }
      const next = { ...s, quizScores: nextScores }
      setItem(STORAGE_KEY, next)
      return next
    })
  }
}))
