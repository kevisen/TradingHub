import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json(null, { status: 200 });

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: { questions: true, instructor: { select: { name: true, slug: true } }, level: { select: { name: true } } },
    });

    if (!lesson) return NextResponse.json(null, { status: 200 });

    // Map to safe JSON
    const result = {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      videoUrl: lesson.videoUrl,
      orderIndex: lesson.orderIndex,
      instructor: lesson.instructor ? { name: lesson.instructor.name, slug: lesson.instructor.slug } : null,
      level: lesson.level ? { name: lesson.level.name } : null,
      questions: lesson.questions.map((q) => ({
        id: q.id,
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        correctOption: q.correctOption,
      })),
    };

    return NextResponse.json(result);
  } catch (e) {
    console.error('GET /api/lesson/[id] error', e);
    return NextResponse.json(null, { status: 200 });
  }
}
