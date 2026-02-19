# Database Setup & Content Loading

This document explains how to load lesson content into the database.

## Architecture

- **Database**: SQLite (local, no backend server needed)
- **ORM**: Prisma
- **Location**: [prisma/seed.js](prisma/seed.js) ← **THIS IS WHERE YOU PASTE YOUR DATA**
- **Video Format**: YouTube embed URLs (iframes)

## One-Time Setup

```bash
# Install Prisma (already done)
npm install

# Generate Prisma client (already done)
npm run prisma:generate

# Create/apply database migrations (already done)
npm run prisma:migrate
```

## How to Add Your Content

### Step 1: Prepare Your Lesson Data

Create a JavaScript array with your lessons exactly as shown below. Each lesson should include:
- Instructor name (Ash, Adarsh, Jean-Mastan)
- Level (Beginner, Intermediate, Advanced)
- Title & Description
- YouTube embed URL
- MCQs with correct answers

### Step 2: Paste Data into Seed File

Open [prisma/seed.js](prisma/seed.js) and find this section:

```js
// --- PASTE your lesson objects into this array ---
const lessonsData = [
  // Paste lesson objects here following the example above
];
```

**Replace the comment** with your actual lesson data. Example:

```js
const lessonsData = [
  {
    instructor: "Ash",
    level: "Beginner",
    title: "Market Structure Basics",
    description: "Understanding HH, HL, LH, LL",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    questions: [
      {
        questionText: "What defines an uptrend?",
        optionA: "Lower highs",
        optionB: "Higher highs",
        optionC: "Equal highs",
        correctOption: "B",
      },
      {
        questionText: "What defines a downtrend?",
        optionA: "Higher lows",
        optionB: "Lower highs & lower lows",
        optionC: "Sideways",
        correctOption: "B",
      }
    ]
  },
  {
    instructor: "Adarsh",
    level: "Beginner",
    title: "Reading the Orderbook",
    description: "Master reading the orderbook",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE",
    questions: [
      {
        questionText: "What is the bid-ask spread?",
        optionA: "Volume",
        optionB: "Price difference between bid and ask",
        optionC: "Time",
        correctOption: "B",
      }
    ]
  }
  // ... more lessons as needed
];
```

### Step 3: Run the Seed

After pasting your data:

```bash
npm run seed
```

You should see:
```
Seeding complete.
```

### Step 4: Start the App

```bash
npm run dev
```

The app will load lessons from the database.

## Data Format Requirements

### Instructor Names (must match exactly)
- `"Ash"`
- `"Adarsh"`
- `"Jean-Mastan"`

### Level Names (must match exactly)
- `"Beginner"`
- `"Intermediate"`
- `"Advanced"`

### Video URLs
- Must be YouTube **embed** URLs: `https://www.youtube.com/embed/VIDEO_ID`
- NOT the watch URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- To convert: Replace `/watch?v=` with `/embed/`
  - Watch: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  - Embed: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### Question Answer Format
- `correctOption`: Must be exactly `"A"`, `"B"`, or `"C"`
- `optionA`, `optionB`, `optionC`: String text of each option
- `questionText`: The question being asked

## Database Inspection

To view your database data in a GUI:

```bash
npm run prisma:studio
```

This opens Prisma Studio at `http://localhost:5555` showing all instructors, levels, lessons, and questions.

## API Routes (Used Internally)

The Next.js app provides these API endpoints (you don't need to call them directly):

- `GET /api/instructors` - List all instructors
- `GET /api/levels` - List all levels
- `GET /api/lessons?instructor=slug&level=Name` - List lessons by instructor/level
- `GET /api/lesson/[id]` - Get single lesson with video + MCQs

## Troubleshooting

### Seed fails with validation error
- Check spelling of instructor names and levels
- Ensure `correctOption` is exactly "A", "B", or "C" (uppercase)
- Verify video URLs start with `https://www.youtube.com/embed/`

### Lessons not showing in app after seeding
1. Confirm seed ran: `npm run seed`
2. Verify data in database: `npm run prisma:studio`
3. Restart dev server: `npm run dev`

### Database file reset

If you need to clear and re-seed:

```bash
rm dev.db
npm run prisma:migrate
npm run seed
npm run dev
```
