# Quick Start: Content Loading System

## ⚡ TL;DR - Get Started in 3 Steps

### Step 1: Copy Your Lesson JSON
Create lesson files in the structure:
```
content/{instructor}/{level}/lesson-{number}.json
```

Example paths:
- `content/ash/beginner/lesson-1.json`
- `content/adarsh/intermediate/lesson-5.json`
- `content/jean-mastan/advanced/lesson-2.json`

### Step 2: Use This JSON Format
```json
{
  "id": "ash-beg-01",
  "title": "Lesson Title",
  "videoUrl": "https://youtube.com/embed/...",
  "description": "Optional description",
  "mcqs": [
    {
      "question": "Question?",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0
    }
  ]
}
```

See `EXAMPLE_LESSON.json` for full format.

### Step 3: Restart Dev Server
```bash
npm run dev
```

✅ Done! Content is automatically loaded.

---

## 🎯 Key Features

| Feature | Benefit |
|---------|---------|
| **Flexible Format** | Supports multiple field names (video_url, videoUrl, etc.) |
| **No Crashes** | Missing content = fallback behavior, never crash |
| **3 Instructors** | ash, adarsh, jean-mastan |
| **3 Levels** | beginner, intermediate, advanced |
| **Dynamic Updates** | Add content at runtime if needed |
| **Type Safe** | Full TypeScript support |
| **Zero UI Changes** | UI remains exactly the same |

---

## 📁 Directory Structure

```
bootcamp/
├── content/                          ← Add your lessons here
│   ├── ash/
│   │   ├── beginner/                 ← Add lesson JSON files
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── adarsh/
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   └── jean-mastan/
│       ├── beginner/
│       ├── intermediate/
│       └── advanced/
├── src/
│   └── data/
│       └── lessons.ts                ← Content loading logic
├── CONTENT_LOADING_SYSTEM.md         ← Full documentation
└── EXAMPLE_LESSON.json               ← Template file
```

---

## 💡 Common Tasks

### Add Multiple Lessons
1. Create multiple files: `lesson-1.json`, `lesson-2.json`, etc.
2. Auto-sorted by filename
3. No configuration needed

### Get Content in Code
```typescript
import { getLessonsByInstructorAndLevel } from '@/data/lessons';

// Get all ash beginner lessons
const lessons = getLessonsByInstructorAndLevel('ash', 'beginner');
```

### Add Content at Runtime
```typescript
import { setLessonForInstructor } from '@/data/lessons';

setLessonForInstructor('ash', 'beginner', {
  id: 'ash-beg-101',
  title: 'New Lesson',
  videoUrl: 'https://...',
  mcqs: []
});
```

### Check What's Loaded
```typescript
import { getContentStats } from '@/data/lessons';

console.log(getContentStats());
// { instructors: ['ash'], totalLessons: 5, ... }
```

---

## ✅ Validation Checklist

Before adding content, check:

- [ ] JSON is valid (use https://jsonlint.com/)
- [ ] File path: `content/[instructor]/[level]/lesson-*.json`
- [ ] Instructors: `ash`, `adarsh`, or `jean-mastan`
- [ ] Levels: `beginner`, `intermediate`, or `advanced`
- [ ] Required fields: `id`, `title`, `videoUrl`
- [ ] MCQs format: `question`, `options`, `correctIndex`
- [ ] correctIndex is 0-based (0, 1, 2, 3...)

---

## 🚀 What Happens Automatically

1. **On App Start**
   - Scans `content/` directory
   - Loads all lesson JSON files
   - Creates in-memory registry
   - Handles missing/broken files gracefully

2. **On File Change**
   - Dev server watches for changes
   - Recompiles on save
   - Lessons available immediately

3. **On Missing Content**
   - Returns empty array (never crashes)
   - Logs warning for debugging
   - App continues normally

---

## 🔧 Advanced Options

See `CONTENT_LOADING_SYSTEM.md` for:
- All available functions and parameters
- Error handling details
- Bulk registration methods
- Component integration examples
- Troubleshooting guide

---

## 📞 Need Help?

1. **Files not loading?**
   - Check file path matches exactly
   - Verify JSON validity
   - Restart: `npm run dev`

2. **Content crashes app?**
   - Shouldn't happen! Report an issue
   - Check CONTENT_LOADING_SYSTEM.md

3. **Want to see what's loaded?**
   - Run: `console.log(getContentStats())`
   - Check browser console

---

## 🎓 Example Content Files

Ready-to-copy templates are in `content/` directory after running setup script.

Use `EXAMPLE_LESSON.json` as reference for all fields and formats.

**Happy teaching! 🚀**
