import bundleData from './lessons.bundle';

export type MCQ = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type Lesson = {
  id: string;
  title: string;
  videoUrl: string;
  note?: string;
  description?: string;
  duration?: string;
  content?: string;
  mcqs?: MCQ[];
  quiz?: unknown[];
  isTest?: boolean;
};

export type InstructorLessons = {
  [level: string]: Lesson[];
};

// ============================================================================
// CONTENT REGISTRY SYSTEM
// ============================================================================
// This system safely loads lesson content from:
// 1. content/{instructor}/{level}/lesson-*.json files
// 2. Fallback static data if files not found
// 3. Returns empty arrays instead of crashing on missing content
// ============================================================================

// Helper function for deep cloning
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Helper to create a safe lesson object from any format
function createSafeLesson(data: unknown, id?: string): Lesson | null {
  if (!data) return null;
  const source = data as Record<string, unknown>;
  
  try {
    return {
      id: (id || source.id || source.lesson_id || `lesson-${Date.now()}`) as string,
      title: (source.title || source.lesson_title || "Untitled Lesson") as string,
      videoUrl: (source.videoUrl || source.video_url || source.video || "") as string,
      description: (source.description || "") as string,
      note: (source.note || undefined) as string | undefined,
      duration: (source.duration || undefined) as string | undefined,
      content: (source.content || source.lesson_content || undefined) as string | undefined,
      mcqs: ((source.mcqs || source.quiz || source.questions || []) as unknown[])
        .map((q: unknown) => {
          const quizItem = q as Record<string, unknown>;
          return {
            question: (quizItem.question || quizItem.title || "") as string,
            options: (quizItem.options || quizItem.choices || quizItem.answers || []) as string[],
            correctIndex: (quizItem.correctIndex ?? quizItem.answer ?? quizItem.correct_index ?? 0) as number
          };
        })
        .filter((q: unknown) => {
          const quizItem = q as { question?: string; options?: string[] };
          return Boolean(quizItem.question) && Array.isArray(quizItem.options) && quizItem.options.length > 0;
        }),
      isTest: (source.isTest ?? source.is_test ?? false) as boolean
    };
  } catch (error) {
    console.warn("Failed to create safe lesson:", error);
    return null;
  }
}

// Initialize empty structure for all instructors
const lessons: { [instructor: string]: InstructorLessons } = {
  adarsh: {
    beginner: [],
    intermediate: [],
    advanced: [],
    test: []
  },
  ash: {
    beginner: [],
    intermediate: [],
    advanced: [],
    test: []
  },
  "jean-mastan": {
    beginner: [],
    intermediate: [],
    advanced: [],
    test: []
  }
};

// Track if lessons have been loaded from disk
let lessonsInitialized = false;

// ============================================================================
// FALLBACK CONTENT - Used when content files are unavailable
// These are minimal examples to prevent crashes
// ============================================================================

const fallbackLessons: { [key: string]: Lesson[] } = {
  "ash-beginner": [],
  "ash-intermediate": [],
  "ash-advanced": [],
  "adarsh-beginner": [],
  "adarsh-intermediate": [],
  "adarsh-advanced": [],
  "jean-mastan-beginner": [],
  "jean-mastan-intermediate": [],
  "jean-mastan-advanced": []
};

// ============================================================================
// CONTENT LOADING FUNCTIONS
// ============================================================================

/**
 * Load lessons from content directory or fallback
 * This function will NOT crash if content is missing
 */
export async function initializeLessonsFromContent(): Promise<void> {
  // Skip if already initialized
  if (lessonsInitialized) {
    return;
  }

  try {
    // PRODUCTION FIX: Load from imported bundle data (works in all environments: local + Vercel)
    // The bundleData is an imported TypeScript module, not a filesystem read
    // This ensures data is available at runtime in serverless environments
    if (bundleData && typeof bundleData === 'object') {
      try {
        for (const instr of Object.keys(bundleData)) {
          const instrData = bundleData[instr as keyof typeof bundleData];
          if (!lessons[instr]) {
            lessons[instr] = { beginner: [], intermediate: [], advanced: [], test: [] };
          }
          for (const lvl of Object.keys(instrData || {})) {
            const levelLessons = instrData?.[lvl as keyof typeof instrData];
            if (Array.isArray(levelLessons)) {
              lessons[instr][lvl] = levelLessons
                .map((d: unknown) => createSafeLesson(d))
                .filter(Boolean) as Lesson[];
            }
          }
        }
        console.log('Lessons loaded from imported bundle (Vercel-compatible)');
      } catch (e) {
        console.warn('Failed to load from bundleData:', e);
      }
    }
  } catch (e) {
    console.warn('Bundle/curriculum fallback failed:', e);
  }

  // Apply fallbacks for empty levels
  applyFallbackContent();

  // Mark as initialized
  lessonsInitialized = true;
}

/**
 * Apply fallback content to any empty instructor/level combinations
 */
function applyFallbackContent(): void {
  for (const instructor of Object.keys(lessons)) {
    for (const level of Object.keys(lessons[instructor])) {
      if (lessons[instructor][level].length === 0) {
        const fallbackKey = `${instructor}-${level}`;
        if (fallbackLessons[fallbackKey]) {
          lessons[instructor][level] = deepClone(fallbackLessons[fallbackKey]);
        }
      }
    }
  }
}

/**
 * Get lesson by ID from any instructor/level
 */
export function getLessonById(id: string): Lesson | undefined {
  for (const instructorKey of Object.keys(lessons)) {
    const levels = lessons[instructorKey];
    for (const levelKey of Object.keys(levels)) {
      const found = (levels[levelKey] as Lesson[]).find((l) => l.id === id);
      if (found) return deepClone(found);
    }
  }
  return undefined;
}

/**
 * Get all lessons for a specific instructor and level
 * Returns empty array if not found (never crashes)
 */
export function getLessonsByInstructorAndLevel(
  instructor: string,
  level: string
): Lesson[] {
  try {
    const instructorLessons = lessons[instructor];
    if (!instructorLessons) return [];

    const levelLessons = instructorLessons[level];
    if (!levelLessons) return [];

    return deepClone(levelLessons);
  } catch (error) {
    console.warn(
      `Failed to get lessons for ${instructor}/${level}:`,
      error
    );
    return [];
  }
}

/**
 * Get all lessons for a specific instructor across all levels
 */
export function getLessonsForInstructor(instructor: string): InstructorLessons | undefined {
  const v = lessons[instructor];
  return v ? deepClone(v) : undefined;
}

/**
 * Add or update a lesson at runtime
 * Useful for dynamic content updates
 */
export function setLessonForInstructor(
  instructor: string,
  level: string,
  lesson: Lesson
): void {
  if (!lessons[instructor]) {
    lessons[instructor] = {
      beginner: [],
      intermediate: [],
      advanced: []
    };
  }

  if (!lessons[instructor][level]) {
    lessons[instructor][level] = [];
  }

  const existingIndex = lessons[instructor][level].findIndex(
    (l) => l.id === lesson.id
  );

  if (existingIndex >= 0) {
    lessons[instructor][level][existingIndex] = deepClone(lesson);
  } else {
    lessons[instructor][level].push(deepClone(lesson));
  }
}

/**
 * Register lessons for an instructor programmatically
 */
export function registerInstructorLessons(
  instructor: string,
  data: InstructorLessons
): void {
  if (lessons[instructor]) {
    console.warn(
      `Instructor '${instructor}' already exists. Merging content.`
    );
    for (const level of Object.keys(data)) {
      if (!lessons[instructor][level]) {
        lessons[instructor][level] = [];
      }
      lessons[instructor][level] = [
        ...lessons[instructor][level],
        ...data[level]
      ];
    }
  } else {
    lessons[instructor] = deepClone(data);
  }
}

/**
 * Get all available instructors
 */
export function getAvailableInstructors(): string[] {
  return Object.keys(lessons).filter((key) => {
    const instructorLessons = lessons[key];
    return Object.values(instructorLessons).some((level) => level.length > 0);
  });
}

/**
 * Get statistics about loaded content
 */
export function getContentStats(): {
  instructors: string[];
  totalLessons: number;
  lessonsByInstructor: { [key: string]: number };
} {
  const stats = {
    instructors: [] as string[],
    totalLessons: 0,
    lessonsByInstructor: {} as { [key: string]: number }
  };

  for (const instructor of Object.keys(lessons)) {
    let count = 0;
    for (const level of Object.keys(lessons[instructor])) {
      count += lessons[instructor][level].length;
    }
    if (count > 0) {
      stats.instructors.push(instructor);
      stats.lessonsByInstructor[instructor] = count;
      stats.totalLessons += count;
    }
  }

  return stats;
}

// Auto-initialize when module loads (only in Node.js environment)
if (typeof window === "undefined") {
  initializeLessonsFromContent().catch((e) =>
    console.warn("Auto-initialization failed:", e)
  );
}

export default lessons;
