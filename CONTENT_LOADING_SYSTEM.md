# Content Loading System Documentation

## Overview

The bootcamp application now has a robust content loading system that:
- ✅ Loads lessons from JSON files in `content/{instructor}/{level}/` directories
- ✅ Never crashes even if content files are missing
- ✅ Supports three instructors: `ash`, `adarsh`, `jean-mastan`
- ✅ Supports three levels per instructor: `beginner`, `intermediate`, `advanced`
- ✅ Provides fallback content if files are unavailable
- ✅ Does not change the UI

## Content Directory Structure

The system expects content in the following structure:

```
content/
├── ash/
│   ├── beginner/
│   │   ├── lesson-1.json
│   │   ├── lesson-2.json
│   │   └── ...
│   ├── intermediate/
│   │   ├── lesson-1.json
│   │   └── ...
│   └── advanced/
│       ├── lesson-1.json
│       └── ...
├── adarsh/
│   ├── beginner/
│   ├── intermediate/
│   └── advanced/
└── jean-mastan/
    ├── beginner/
    ├── intermediate/
    └── advanced/
```

## JSON Lesson Format

Each lesson JSON file should have this structure:

```json
{
  "id": "lesson-1",
  "title": "Lesson Title",
  "description": "Brief description of the lesson",
  "videoUrl": "https://youtube.com/...",
  "duration": "45 minutes",
  "note": "Optional note or reference link",
  "content": "Optional lesson content",
  "mcqs": [
    {
      "question": "Question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctIndex": 0
    }
  ]
}
```

### Supported Formats

The system is flexible and handles multiple field names:

| Field | Alternative Names | Description |
|-------|-------------------|-------------|
| `id` | `lesson_id` | Unique identifier for the lesson |
| `title` | `lesson_title` | Lesson title |
| `videoUrl` | `video_url`, `video` | YouTube or video URL |
| `mcqs` | `quiz`, `questions` | Array of MCQ objects |
| `question` | `title` (in MCQ) | Question text |
| `options` | `choices`, `answers` | Array of answer options |
| `correctIndex` | `answer`, `correct_index` | Index of correct answer (0-based) |

## How the System Works

### 1. **Automatic Initialization**
When the application starts:
- Scans the `content/` directory for JSON files
- Loads all lessons into memory
- Applies fallback content for empty levels
- Never crashes if content is missing

### 2. **Dynamic Loading**
At runtime, use these functions:

```typescript
import { 
  getLessonsByInstructorAndLevel,
  getLessonById,
  getLessonsForInstructor,
  setLessonForInstructor,
  getAvailableInstructors,
  getContentStats
} from '@/data/lessons';

// Get all lessons for an instructor and level
const lessons = getLessonsByInstructorAndLevel('ash', 'beginner');

// Get a specific lesson by ID
const lesson = getLessonById('ash-beg-01');

// Get all lessons for an instructor
const allAshLessons = getLessonsForInstructor('ash');

// Add or update a single lesson at runtime
setLessonForInstructor('ash', 'beginner', {
  id: 'new-lesson',
  title: 'New Lesson',
  videoUrl: 'https://...',
  mcqs: []
});

// Get available instructors with content
const instructors = getAvailableInstructors();

// Get content statistics
const stats = getContentStats();
```

## Adding New Content

### Method 1: Add JSON Files (Recommended)

1. Create directory: `content/{instructor}/{level}/`
2. Add lesson JSON files: `lesson-{number}.json`
3. Restart the dev server
4. The system automatically loads the new content

Example:
```bash
# Create directory for ash beginner lessons
mkdir -p content/ash/beginner

# Create a lesson file
echo '{
  "id": "ash-beg-01",
  "title": "Trading Basics",
  "videoUrl": "https://youtube.com/...",
  "mcqs": []
}' > content/ash/beginner/lesson-1.json
```

### Method 2: Add Content at Runtime

```typescript
import { setLessonForInstructor } from '@/data/lessons';

const newLesson = {
  id: 'ash-beg-100',
  title: 'Advanced Trading',
  videoUrl: 'https://youtube.com/...',
  description: 'Advanced trading concepts',
  mcqs: [
    {
      question: "What is trading?",
      options: ["Buying/selling", "Cooking", "Gaming", "Sleeping"],
      correctIndex: 0
    }
  ]
};

setLessonForInstructor('ash', 'beginner', newLesson);
```

### Method 3: Bulk Registration

```typescript
import { registerInstructorLessons } from '@/data/lessons';

const ashContent = {
  beginner: [
    // Array of lessons
  ],
  intermediate: [],
  advanced: []
};

registerInstructorLessons('ash', ashContent);
```

## Error Handling

### The system will NOT crash if:
- ❌ A JSON file is malformed
- ❌ A lesson is missing required fields
- ❌ A content directory is empty
- ❌ An instructor doesn't exist
- ❌ A file doesn't follow the exact schema

### What happens:
1. Invalid lessons are skipped with a warning
2. Missing fields are filled with defaults
3. Fallback content is used for empty levels
4. The application continues running normally

## Available Functions

### `getLessonsByInstructorAndLevel(instructor, level)`
Returns array of lessons for a specific instructor/level combination
- Returns empty array if not found
- Never throws

### `getLessonById(id)`
Returns a specific lesson by its ID
- Returns `undefined` if not found
- Searches across all instructors/levels

### `getLessonsForInstructor(instructor)`
Returns all lessons for an instructor grouped by level
- Returns `undefined` if instructor not found

### `setLessonForInstructor(instructor, level, lesson)`
Adds or updates a single lesson
- Creates instructor/level if needed
- Replaces existing lesson if ID matches

### `registerInstructorLessons(instructor, data)`
Bulk register lessons for an instructor
- Merges if instructor already exists
- Logs warning but doesn't error

### `getAvailableInstructors()`
Returns list of instructors with loaded content
- Returns string array

### `getContentStats()`
Returns statistics about loaded content
- Includes total lessons count
- Breakdown by instructor

## Example Usage in Components

```typescript
import { getLessonsByInstructorAndLevel } from '@/data/lessons';

export default function LessonList() {
  const lessons = getLessonsByInstructorAndLevel('ash', 'beginner');
  
  return (
    <div>
      {lessons.length === 0 ? (
        <p>No lessons available</p>
      ) : (
        <ul>
          {lessons.map(lesson => (
            <li key={lesson.id}>{lesson.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Troubleshooting

### Content not loading?
1. Check file path: `content/{instructor}/{level}/lesson-*.json`
2. Verify JSON syntax (use JSONLint.com)
3. Check file permissions
4. Restart dev server: `npm run dev`

### Lessons appearing but not MCQs?
1. Verify `mcqs` array exists in JSON
2. Check field names: `question`, `options`, `correctIndex`
3. Ensure `options` is an array with at least 1 item
4. Ensure `correctIndex` is 0-based number

### Want to see loaded content stats?
```typescript
import { getContentStats } from '@/data/lessons';

console.log(getContentStats());
// Output:
// {
//   instructors: ['ash', 'adarsh'],
//   totalLessons: 45,
//   lessonsByInstructor: { ash: 32, adarsh: 13 }
// }
```

## Safety Features

- ✅ Graceful fallback for missing content
- ✅ Null/undefined checks on all fields
- ✅ Try-catch wrapping for JSON parsing
- ✅ Warning logs instead of throwing errors
- ✅ Deep cloning to prevent external mutation
- ✅ Type-safe TypeScript definitions
- ✅ No UI changes from content loading

## Next Steps

1. Create `content/` directory at project root
2. Add instructor subdirectories: `ash/`, `adarsh/`, `jean-mastan/`
3. Create level subdirectories: `beginner/`, `intermediate/`, `advanced/`
4. Add lesson JSON files
5. Restart `npm run dev`
6. System automatically loads and serves the content
