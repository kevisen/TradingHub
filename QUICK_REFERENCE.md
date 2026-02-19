# 🚀 QUICK REFERENCE CARD

## Start the Platform
```bash
npm run dev
# Visit: http://localhost:3000
```

---

## File Locations

| What | Where |
|------|-------|
| Homepage | `src/app/page.tsx` |
| Instructor Page | `src/app/instructor/[id]/page.tsx` |
| Level Page | `src/app/instructor/[id]/[level]/page.tsx` |
| Lesson Viewer | `src/app/instructor/[id]/[level]/[lesson]/page.tsx` |
| Components | `src/components/` |
| Types | `src/lib/types.ts` |
| localStorage Logic | `src/lib/storage.ts` |
| Styles | `src/app/globals.css` |
| Lessons | `content/[instructor]/[level]/lesson-X.json` |
| Config | `package.json`, `tsconfig.json`, `tailwind.config.ts` |

---

## Common Commands

```bash
# Start development
npm run dev

# Build production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Install dependencies
npm install
```

---

## Add a New Lesson

### 1. Create File
```
content/[instructor]/[level]/lesson-X.json
```

### 2. Example Structure
```json
{
  "title": "...",
  "description": "...",
  "videoUrl": "/videos/...",
  "duration": "XX mins",
  "content": "Key points...",
  "quiz": [{
    "question": "...",
    "options": ["A", "B", "C"],
    "answer": 0,
    "explanation": "..."
  }]
}
```

### 3. No Restart Needed!
Just refresh browser. Lesson auto-loads.

---

## localStorage Keys

```
bootcamp_progress_[instructor]_[level]
bootcamp_progress_validated
```

---

## Key Routes

```
GET  /                                    # Homepage
GET  /instructor/[id]                     # Instructor levels
GET  /instructor/[id]/[level]             # Level lessons
GET  /instructor/[id]/[level]/[lesson]    # Lesson viewer
```

---

## Environment Variables

File: `.env.local`
```env
NEXT_PUBLIC_FINAL_CODE=BOOTCAMP2024
```

---

## Component Props

### InstructorCard
```tsx
id, name, title, description, image?
```

### LevelCard
```tsx
level, instructor, description, lessonCount, index
```

### QuizComponent
```tsx
quiz: Quiz[], onComplete: (score) => void, disabled?
```

### ProgressTracker
```tsx
total, completed, percentage
```

### FinalCodeUnlock
```tsx
instructor, onSuccess?
```

---

## Types to Import

```tsx
import {
  Instructor,    // 'ash' | 'adarsh' | 'jean-mastan'
  Level,         // 'beginner' | 'intermediate' | 'advanced'
  Lesson,
  Quiz,
  UserProgress,
  LessonProgress
} from '@/lib/types'
```

---

## Common Tasks

### Check Progress
```tsx
import { getUserProgress } from '@/lib/storage'

const progress = getUserProgress('ash', 'beginner')
// Returns: UserProgress | null
```

### Save Progress
```tsx
import { saveLessonProgress } from '@/lib/storage'

saveLessonProgress('ash', 'beginner', 'lesson-1', true, 90)
```

### Check Bootcamp Complete
```tsx
import { isBootcampCompleted } from '@/lib/storage'

const done = isBootcampCompleted('ash')
// Returns: boolean
```

### Validate Code
```tsx
import { validateBootcampCode } from '@/lib/storage'

const valid = validateBootcampCode('ash', userCode)
// Returns: boolean
```

---

## Tailwind Classes Used

```
card-base       // Card styling
button-primary  // Primary button
button-secondary// Secondary button
button-outline  // Outline button
section-padding // Section spacing
container-max   // Max width container
```

---

## Add Custom Component

1. Create file: `src/components/MyComponent.tsx`
2. Use 'use client' for interactive
3. Import in pages as needed
4. Export as default or named

---

## Mobile Responsive

```css
/* Mobile first */
@screen md { /* 768px */ }
@screen lg { /* 1024px */ }

/* In React */
className="block md:hidden"  /* Mobile only */
className="hidden md:block"  /* Desktop only */
```

---

## Debug Tips

### Check localStorage
```javascript
// In browser console
localStorage.getItem('bootcamp_progress_ash_beginner')
```

### Force Refresh
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### Check Errors
- Browser Console (F12)
- Network tab
- Terminal output

---

## Deployment

### Vercel
```bash
git push origin main
# Auto-deploys
```

### Self-Hosted
```bash
npm run build
npm start
# Port 3000
```

---

## Performance Tips

- Lessons auto-load (no restart)
- localStorage is fast
- Next.js optimizes build
- Animations are smooth
- Mobile optimized

---

## Expand Platform

### Add Instructor
1. Create `/content/[new_name]/` folder
2. Add beginner/intermediate/advanced/ subfolders
3. Add lesson JSON files
4. Update instructor list in `src/app/page.tsx`

### Add Level
1. Modify level selection logic
2. Update types
3. Create content folders

### Add Features
1. Create component in `src/components/`
2. Add utilities in `src/lib/`
3. Update pages with new components

---

## Code Structure

```
Pure Functions:
- getUserProgress()
- saveLessonProgress()
- validateBootcampCode()

React Components:
- Page components (in app/)
- UI components (in components/)

Types:
- All in lib/types.ts

Styles:
- Tailwind CSS
- globals.css for custom

```

---

## Testing Checklist

- [ ] Homepage loads
- [ ] Can select instructor
- [ ] Can select level
- [ ] Lessons display
- [ ] Quiz works
- [ ] Progress saves
- [ ] Mobile responsive
- [ ] Animations smooth

---

## Common Errors

| Error | Fix |
|-------|-----|
| Module not found | Check import paths |
| Lesson not showing | Check JSON file location |
| Quiz not working | Verify quiz array exists |
| localStorage error | Check browser allows it |
| Styles not applying | Clear cache (Ctrl+Shift+R) |

---

## Documentation Files

- `README.md` - Overview
- `IMPLEMENTATION.md` - Details
- `LESSONS_GUIDE.md` - Lesson creation
- `PROJECT_SUMMARY.md` - Quick summary
- `COMPLETION_CHECKLIST.md` - What's done
- `QUICK_REFERENCE.md` - THIS FILE

---

## Support

Check:
1. Code comments
2. Type definitions
3. Component examples
4. Sample lessons
5. Documentation files

---

**Keep this handy for quick lookups!** 📋
