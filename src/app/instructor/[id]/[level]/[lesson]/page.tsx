"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { QuizComponent } from '@/components/QuizComponent';
import { getLessonById, getLessonsForInstructor } from '@/data/lessons';
import { LessonSidebar } from '@/components/LessonSidebar';
import { ProgressTracker } from '@/components/ProgressTracker';
import { FinalCodeUnlock } from '@/components/FinalCodeUnlock';
import { Lesson, Level, LessonProgress, Instructor } from '@/lib/types';
import { saveLessonProgress, getUserProgress, getProgressStats, isBootcampCompleted } from '@/lib/storage';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const instructorId = params.id as Instructor;
  const levelId = params.level as Level;
  const lessonId = params.lesson as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [bootcampDone, setBootcampDone] = useState(false);
  const [showFinalCode, setShowFinalCode] = useState(false);

  useEffect(() => {
    // Load lesson data from lessons.ts
    const found = getLessonById(lessonId);
    if (found) setLesson(found as any);

    const instructorLessons = getLessonsForInstructor(instructorId);
    if (instructorLessons && instructorLessons[levelId]) {
      setAllLessons(instructorLessons[levelId] as any[]);
    }

    // Load progress
    const userProgress = getUserProgress(instructorId, levelId);
    setProgress(userProgress?.lessons || []);

    // Check if bootcamp is complete
    const completed = isBootcampCompleted(instructorId);
    setBootcampDone(completed);
  }, [instructorId, levelId, lessonId]);

  function IframePlayer({ src, title, originalEmbed }: { src: string; title: string; originalEmbed?: string }) {
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const raw = (originalEmbed || '').split('/embed/')[1] || '';
    const videoId = raw.split(/[?&]/)[0] || '';
    const watchUrl = videoId ? `https://youtu.be/${videoId}` : (originalEmbed || '');

    // Check oEmbed to detect if the video is embeddable. If not embeddable, skip iframe.
    const [embeddable, setEmbeddable] = useState<boolean | null>(null);
    useEffect(() => {
      if (!videoId) {
        setEmbeddable(false);
        return;
      }

      let cancelled = false;
      const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      fetch(url)
        .then((res) => {
          if (cancelled) return;
          setEmbeddable(res.ok);
        })
        .catch(() => {
          if (cancelled) return;
          setEmbeddable(false);
        });

      return () => { cancelled = true; };
    }, [videoId]);

    // fallback if iframe doesn't load within a short time (covers some blocked embeds)
    useEffect(() => {
      if (loaded) return;
      const t = setTimeout(() => setFailed(true), 2200);
      return () => clearTimeout(t);
    }, [loaded]);

    if (failed || embeddable === false) {
      const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined;
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-xl">
          <div className="text-center text-gray-300 w-full">
            {thumb ? (
              <>
                <a href={watchUrl} target="_blank" rel="noreferrer" className="block relative w-full" aria-label="Open video in new tab">
                  <div className="w-full rounded-md overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img src={thumb} alt="video thumbnail" className="w-full h-full object-cover block" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/60 p-4 rounded-full">
                      <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </a>
                <div className="mt-4">
                  <a className="button-primary inline-block" href={watchUrl} target="_blank" rel="noreferrer">Watch Video</a>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4">Video cannot be embedded. You can watch it on YouTube.</p>
                <a className="button-primary" href={watchUrl} target="_blank" rel="noreferrer">Watch on YouTube</a>
              </>
            )}
          </div>
        </div>
      );
    }
    if (embeddable === null) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-xl">
          <div className="text-gray-400">Checking video embeddability…</div>
        </div>
      );
    }
    // Build a normalized iframe src on the fly and append safer params suggested (?rel=0&modestbranding=1)
    const buildSrc = (original?: string) => {
      if (!original) return '';
      // switch to nocookie domain
      let s = original.replace('https://www.youtube.com/embed/', 'https://www.youtube-nocookie.com/embed/');
      // separate base and query
      const [base, qs] = s.split('?');
      const params = new URLSearchParams(qs || '');
      // ensure rel=0 and modestbranding=1
      if (!params.has('rel')) params.set('rel', '0');
      if (!params.has('modestbranding')) params.set('modestbranding', '1');
      return `${base}?${params.toString()}`;
    };

    const iframeSrc = buildSrc(originalEmbed || src);

    return (
      <iframe
        src={iframeSrc}
        className="w-full h-full block"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title={title}
        onError={() => setFailed(true)}
        onLoad={() => setLoaded(true)}
      />
    );
  }

  const handleQuizComplete = (score: number) => {
    saveLessonProgress(instructorId, levelId, lessonId, true, score);
    setProgress((prev) => {
      const existing = prev.find((p) => p.lessonId === lessonId);
      if (existing) {
        return prev.map((p) =>
          p.lessonId === lessonId ? { ...p, completed: true, quizScore: score } : p
        );
      }
      return [
        ...prev,
        { lessonId, completed: true, quizScore: score, timestamp: Date.now() },
      ];
    });

    // Check if all lessons are complete
    const nextLessonIndex = allLessons.findIndex((l) => l.id === lessonId) + 1;
    if (nextLessonIndex < allLessons.length) {
      // Auto navigate to next lesson
      setTimeout(() => {
        window.location.href = `/instructor/${instructorId}/${levelId}/${allLessons[nextLessonIndex].id}`;
      }, 1000);
    } else {
      // Level complete, show completion message
      // Check if bootcamp complete
      const stats = getProgressStats(instructorId);
      if (stats.percentage === 100) {
        setBootcampDone(true);
        setShowFinalCode(true);
      }
    }

    setShowQuiz(false);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400">Loading lesson...</p>
      </div>
    );
  }

  if (showFinalCode && bootcampDone) {
    return (
      <div className="min-h-screen bg-gray-950 py-16">
        <div className="container-max">
          <FinalCodeUnlock
            instructor={instructorId}
            onSuccess={() => window.location.href = '/'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <LessonSidebar
        lessons={allLessons}
        currentLessonId={lessonId}
        progress={progress}
        instructor={instructorId}
        level={levelId}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="container-max max-w-5xl">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.push(`/instructor/${instructorId}/${levelId}`)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              <span>Back to Level</span>
            </motion.button>

            {/* Video Player - forced iframe */}
            <div className="w-full bg-black rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {(() => {
                  const src = (lesson.videoUrl || '').replace('https://www.youtube.com/embed/', 'https://www.youtube-nocookie.com/embed/');
                  return (
                    <IframePlayer src={src} title={lesson.title} originalEmbed={lesson.videoUrl} />
                  );
                })()}
            </div>

            {/* Lesson info below video (kept styling similar to VideoPlayer) */}
            <div className="mt-8">
              <h1 className="text-4xl font-bold text-gray-50 mb-4">{lesson.title}</h1>
              {lesson.note && (
                <p className="text-sm text-gray-400 mb-4">Source: <a className="text-blue-400 underline" href={lesson.note} target="_blank" rel="noreferrer">watch on YouTube</a></p>
              )}
            </div>

            {/* Progress Tracker */}
            <div className="mt-8 max-w-2xl">
              <ProgressTracker
                total={allLessons.length}
                completed={progress.filter((p) => p.completed).length}
                percentage={Math.round(
                  (progress.filter((p) => p.completed).length / allLessons.length) * 100
                )}
              />
            </div>

            {/* Quiz Section (use mcqs -> quiz adapter, batch mode with exactly 5 questions) */}
            {lesson.mcqs && lesson.mcqs.length > 0 && (
              <motion.div className="mt-12">
                <div className="max-w-2xl">
                  {!showQuiz ? (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setShowQuiz(true)}
                      className="button-primary text-lg px-8 py-4 w-full"
                    >
                      Take Quiz to Continue
                    </motion.button>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <QuizComponent
                        quiz={lesson.mcqs.slice(0, 5).map((q: any) => ({
                          question: q.question,
                          options: q.options,
                          // support both `correctIndex` and `answer` naming
                          answer: (q.correctIndex ?? q.answer) as number,
                        }))}
                        onComplete={handleQuizComplete}
                        batchMode
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
