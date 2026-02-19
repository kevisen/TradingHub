# Quick Start Guide - Adding Lessons

## Overview

Your trading bootcamp platform is running and ready for content. Lessons are stored as JSON files in the `/content` folder structure.

---

## 📂 Folder Structure

```
content/
├── ash/
│   ├── beginner/
│   │   ├── lesson-1.json
│   │   ├── lesson-2.json
│   │   └── ... more lessons
│   ├── intermediate/
│   │   └── ... lessons
│   └── advanced/
│       └── ... lessons
├── adarsh/  (same structure)
└── jean-mastan/  (same structure)
```

---

## ✏️ Creating a Lesson

### Step 1: Create the File
Create a new JSON file in the appropriate folder:

```
/content/[instructor]/[level]/lesson-[number].json
```

**Example**: `/content/ash/beginner/lesson-3.json`

### Step 2: Use This Template

```json
{
  "title": "Lesson Title Here",
  "description": "A brief description of what students will learn",
  "videoUrl": "/videos/instructor/level/lesson.mp4",
  "duration": "15 mins",
  "content": "Key learning points:\n\n• Point 1\n• Point 2\n• Point 3",
  "quiz": [
    {
      "question": "First question about the lesson?",
      "options": [
        "Incorrect option 1",
        "Correct answer",
        "Incorrect option 2",
        "Another wrong answer"
      ],
      "answer": 1,
      "explanation": "This option is correct because..."
    },
    {
      "question": "Second question?",
      "options": ["A", "B", "C"],
      "answer": 0,
      "explanation": "Explanation for why A is correct"
    },
    {
      "question": "Third question?",
      "options": ["Option 1", "Option 2", "Option 3"],
      "answer": 2,
      "explanation": "Detailed explanation"
    }
  ]
}
```

---

## 📋 Field Explanations

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Lesson title (shown in sidebar) |
| `description` | String | ✅ | Short description of the lesson |
| `videoUrl` | String | ✅ | Path to video file (can be external URL) |
| `duration` | String | ❌ | Estimated video length (e.g., "15 mins") |
| `content` | String | ❌ | Key points/notes (supports `\n` for line breaks) |
| `quiz` | Array | ✅ | Quiz questions array |

### Quiz Question Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | String | ✅ | The question text |
| `options` | Array | ✅ | Array of 3-4 answer options |
| `answer` | Number | ✅ | Index of correct answer (0-based) |
| `explanation` | String | ✅ | Why the answer is correct |

---

## 🔢 Numbering Convention

Number lessons sequentially starting from 1:
- `lesson-1.json`
- `lesson-2.json`
- `lesson-3.json`
- etc.

The platform displays them in order: "Lesson 1", "Lesson 2", etc.

---

## 🎥 Video URLs

### Option 1: Local Videos
Place videos in public folder:
```
/public/videos/ash/beginner/lesson-1.mp4
```

Reference in lesson:
```json
"videoUrl": "/videos/ash/beginner/lesson-1.mp4"
```

### Option 2: External URLs
Use YouTube, Vimeo, or any streaming service:
```json
"videoUrl": "https://youtube.com/watch?v=xxx"
```

### Option 3: No Videos Yet
Use a placeholder:
```json
"videoUrl": "/videos/placeholder.mp4"
```

The video player shows a nice placeholder until actual video is added.

---

## ✅ Quiz Best Practices

### Keep It Short
- 2-4 questions per lesson minimum
- 3-5 questions recommended
- 5-7 questions maximum

### Make It Relevant
- Questions should test lesson understanding
- Cover key concepts from the video
- Be specific, not vague

### Write Clear Answers
- One obviously correct answer
- Distractor options that sound plausible
- Clear, concise explanations

### Grading
- Users must score 80%+ to pass
- They can retake quizzes
- Scores are saved in localStorage

---

## 📝 Example Lesson: Complete

```json
{
  "title": "Understanding Risk-Reward Ratios",
  "description": "Learn how to calculate and use risk-reward ratios in your trading strategy to maximize profitability over time.",
  "videoUrl": "/videos/jean-mastan/beginner/lesson-3.mp4",
  "duration": "18 mins",
  "content": "What you'll learn:\n\n• How to calculate risk-reward ratio\n• Why 1:3 is a minimum standard\n• How to find high probability setups\n• Managing your position size based on ratio\n• Real trading examples\n\nKey takeaway: A 1:3 risk-reward ratio means risking $1 to make $3.",
  "quiz": [
    {
      "question": "What does a 1:2 risk-reward ratio mean?",
      "options": [
        "You risk $2 to make $1",
        "You risk $1 to make $2",
        "You have a 2% win rate",
        "Your account doubles"
      ],
      "answer": 1,
      "explanation": "A 1:2 risk-reward ratio means for every $1 you risk, you aim to make $2 in profit."
    },
    {
      "question": "What is the minimum recommended risk-reward ratio?",
      "options": [
        "1:1",
        "1:2",
        "1:3",
        "1:5"
      ],
      "answer": 2,
      "explanation": "Most professional traders use a minimum 1:3 risk-reward ratio to account for wins and losses."
    },
    {
      "question": "If you risk $100 with a 1:3 ratio, what's your target profit?",
      "options": [
        "$100",
        "$200",
        "$300",
        "$400"
      ],
      "answer": 2,
      "explanation": "Risk of $100 × 3 (the reward ratio) = $300 target profit."
    }
  ]
}
```

---

## 🚀 Quick Lesson Creation (5 minutes)

1. **Copy template** above
2. **Edit fields**:
   - Change title
   - Write description
   - Add/change video URL
   - Write content points
   - Create 3 quiz questions
3. **Save as**: `/content/[instructor]/[level]/lesson-X.json`
4. **Refresh browser** - lesson appears immediately!

---

## 🔄 Editing Lessons

1. Find the lesson file: `/content/[instructor]/[level]/lesson-X.json`
2. Edit in your code editor
3. Save file
4. Refresh browser - changes appear instantly!

---

## 📊 Lesson Statistics

Current content:
- **Instructors**: 3 (Ash, Adarsh, Jean-Mastan)
- **Levels**: 3 (Beginner, Intermediate, Advanced)
- **Sample Lessons**: 18 total (6 per instructor)
- **Total Slots**: 27 lesson slots available

---

## 🎯 Content Roadmap

### Phase 1: Core Lessons (Beginner)
- Market fundamentals
- Technical analysis basics
- Risk management 101

### Phase 2: Intermediate Skills
- Advanced setup identification
- Confluence analysis
- Trade management

### Phase 3: Advanced Mastery
- Professional strategies
- Institutional trading
- System building

---

## 💡 Tips for Quality Content

✅ **DO**:
- Keep videos 10-25 minutes
- Use clear examples
- Test quizzes yourself
- Update regularly
- Be specific and practical

❌ **DON'T**:
- Skip explanations
- Use overly complex language
- Make quizzes too hard (80% pass rate)
- Forget real trading examples
- Leave lessons incomplete

---

## 📊 Quality Checklist

Before publishing a lesson:

- [ ] Title is clear and specific
- [ ] Description explains the value
- [ ] Video URL is correct
- [ ] Duration is accurate
- [ ] Content has bullet points
- [ ] Quiz has 3+ questions
- [ ] All answers are correct
- [ ] Explanations are detailed
- [ ] Nothing is misspelled
- [ ] JSON is valid (test with jsonlint.com)

---

## 🔗 Video Hosting Options

### Free Options:
- YouTube (Easy to embed)
- Vimeo (High quality)
- AWS S3 (Scalable)
- Bunny CDN (Fast)

### Setup:
1. Upload video to service
2. Get public URL
3. Paste in lesson JSON
4. Done!

---

## 🆘 Common Issues

**Lesson not showing?**
- Check file is in correct folder
- Verify file name format: `lesson-X.json`
- Make sure JSON is valid

**Quiz not working?**
- Check quiz array exists
- Verify `answer` value is 0-3
- Ensure all options are strings

**Video not playing?**
- Check video URL is correct
- Try public/path format: `/videos/...`
- Test URL in browser

**Changes not showing?**
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Clear browser cache
- Check server is still running

---

## 📚 Example Lesson Files (Included)

Your project includes sample lessons:

### Ash's Lessons
- `content/ash/beginner/lesson-1.json` - Market Structure
- `content/ash/beginner/lesson-2.json` - Support & Resistance
- `content/ash/intermediate/lesson-1.json` - Supply & Demand
- `content/ash/advanced/lesson-1.json` - Algorithmic Trading

### Adarsh's Lessons
- `content/adarsh/beginner/lesson-1.json` - Reading Orderbook
- (More samples...)

### Jean-Mastan's Lessons
- `content/jean-mastan/beginner/lesson-1.json` - Risk Management
- (More samples...)

---

## 🎓 Ready to Add Content?

1. Pick an instructor and level
2. Create `/content/[instructor]/[level]/lesson-3.json` (or next number)
3. Copy the template
4. Fill in your content
5. Save and refresh!

**That's it!** Lessons auto-load - no server restart needed.

---

**Start adding content now and build your complete trading bootcamp!** 📚💡
