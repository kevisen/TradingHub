import { getLessonsForInstructor, initializeLessonsFromContent } from '@/data/lessons';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const instructor = searchParams.get('instructor');

  if (!instructor) {
    return Response.json({ error: 'Missing instructor parameter' }, { status: 400 });
  }

  try {
    // Ensure lessons are initialized
    await initializeLessonsFromContent();
    
    const lessons = getLessonsForInstructor(instructor);
    
    if (!lessons) {
      return Response.json({ error: 'Instructor not found' }, { status: 404 });
    }

    return Response.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return Response.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}
