import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const instructor = url.searchParams.get('instructor') || undefined; // slug
    const level = url.searchParams.get('level') || undefined; // name

    const where: any = {};
    if (instructor) {
      where.instructor = { slug: instructor };
    }
    if (level) {
      where.level = { name: level };
    }

    const lessons = await prisma.lesson.findMany({
      where,
      select: { id: true, title: true, orderIndex: true, videoUrl: true },
      orderBy: { orderIndex: 'asc' },
    });

    return NextResponse.json(lessons);
  } catch (e) {
    console.error('GET /api/lessons error', e);
    return NextResponse.json([], { status: 200 });
  }
}
