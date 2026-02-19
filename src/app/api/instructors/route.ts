import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const instructors = await prisma.instructor.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(instructors);
  } catch (e) {
    console.error('GET /api/instructors error', e);
    return NextResponse.json([], { status: 200 });
  }
}
