import type { Curriculum } from './types'
import type { } from '../stores/userProgressStore'

// Rule-based recommendation engine
export function recommendLessonsByWeakTags(curriculum: Curriculum, weakTags: Record<string, number>, threshold = 60) {
  // weakTags maps tag -> average accuracy (0-100). Recommend lessons where tag accuracy < threshold.
  const lowTags = Object.entries(weakTags).filter(([_, v]) => v < threshold).map(([k]) => k)
  if (lowTags.length === 0) return []

  const results: { lessonId: string; lessonTitle: string; tag: string }[] = []

  for (const inst of curriculum.instructors) {
    for (const market of inst.markets) {
      for (const strat of market.strategies) {
        for (const phase of strat.phases) {
          for (const lesson of phase.lessons) {
            for (const t of lesson.tags) {
              if (lowTags.includes(t)) {
                results.push({ lessonId: lesson.id, lessonTitle: lesson.title, tag: t })
                break
              }
            }
          }
        }
      }
    }
  }

  return results
}
