/**
 * Single seed file — paste your lessons data into `lessonsData` below.
 * Example (paste exactly as JS object):
 *
 * const lessonsData = [
 *   {
 *     instructor: "Ash",
 *     level: "Beginner",
 *     title: "Market Structure Basics",
 *     description: "Understanding HH, HL, LH, LL",
 *     videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
 *     questions: [
 *       {
 *         questionText: "What defines an uptrend?",
 *         optionA: "Lower highs",
 *         optionB: "Higher highs",
 *         optionC: "Equal highs",
 *         correctOption: "B",
 *       }
 *     ]
 *   }
 * ]
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- PASTE your lesson objects into this array ---
const lessonsData = [
  // Paste lesson objects here following the example above
];

async function main() {
  if (!lessonsData || lessonsData.length === 0) {
    console.log('No lessons found in prisma/seed.js — nothing to seed.');
    return;
  }

  for (const item of lessonsData) {
    const instructorName = item.instructor?.trim();
    const levelName = item.level?.trim();

    if (!instructorName || !levelName) continue;

    const slug = instructorName.toLowerCase().replace(/\s+/g, '-');

    const instructor = await prisma.instructor.upsert({
      where: { slug },
      update: { name: instructorName },
      create: { name: instructorName, slug },
    });

    const level = await prisma.level.upsert({
      where: { name: levelName },
      update: {},
      create: { name: levelName },
    });

    const lesson = await prisma.lesson.create({
      data: {
        title: item.title || 'Untitled',
        description: item.description || null,
        videoUrl: item.videoUrl || null,
        orderIndex: typeof item.orderIndex === 'number' ? item.orderIndex : 0,
        instructorId: instructor.id,
        levelId: level.id,
      },
    });

    if (Array.isArray(item.questions)) {
      for (const q of item.questions) {
        const correct = (q.correctOption || 'A').toUpperCase();
        if (!['A', 'B', 'C'].includes(correct)) continue;

        await prisma.question.create({
          data: {
            lessonId: lesson.id,
            questionText: q.questionText || 'Question',
            optionA: q.optionA || '',
            optionB: q.optionB || '',
            optionC: q.optionC || '',
            correctOption: correct,
          },
        });
      }
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
