export async function fetchInstructors() {
  try {
    const res = await fetch('/api/instructors');
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('fetchInstructors', e);
    return [];
  }
}

export async function fetchLevels() {
  try {
    const res = await fetch('/api/levels');
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('fetchLevels', e);
    return [];
  }
}

export async function fetchLessons(instructorSlug?: string, levelName?: string) {
  const params = new URLSearchParams();
  if (instructorSlug) params.set('instructor', instructorSlug);
  if (levelName) params.set('level', levelName);
  try {
    const res = await fetch(`/api/lessons?${params.toString()}`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('fetchLessons', e);
    return [];
  }
}

export async function fetchLessonById(id: string) {
  try {
    const res = await fetch(`/api/lesson/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('fetchLessonById', e);
    return null;
  }
}
