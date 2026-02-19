import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const levels = await prisma.level.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } });
    return NextResponse.json(levels);
  } catch (e) {
    console.error('GET /api/levels error', e);
    return NextResponse.json([], { status: 200 });
  }
}
