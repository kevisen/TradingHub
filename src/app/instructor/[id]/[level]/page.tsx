'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Level } from '@/lib/types';

const fakeContent = {
  ash: {
    beginner: [
      { id: 'lesson-1', title: 'What is a Market Structure?' },
      { id: 'lesson-2', title: 'Support and Resistance Levels' },
    ],
    intermediate: [
      { id: 'lesson-1', title: 'Supply and Demand Zones' },
      { id: 'lesson-2', title: 'Confluence Techniques' },
    ],
    advanced: [
      { id: 'lesson-1', title: 'Algorithmic Trading and Market Makers' },
      { id: 'lesson-2', title: 'Building Professional Trading Systems' },
    ],
  },
  adarsh: {
    beginner: [
      { id: 'lesson-1', title: 'Reading the Orderbook' },
      { id: 'lesson-2', title: 'Understanding Order Flow' },
    ],
    intermediate: [
      { id: 'lesson-1', title: 'Advanced Order Flow Analysis' },
      { id: 'lesson-2', title: 'Institutional Order Patterns' },
    ],
    advanced: [
      { id: 'lesson-1', title: 'Real-Time Order Flow Trading' },
      { id: 'lesson-2', title: 'Building Order Flow Systems' },
    ],
  },
  'jean-mastan': {
    beginner: [
      { id: 'lesson-1', title: 'Risk Management Essentials' },
      { id: 'lesson-2', title: 'Position Sizing Strategies' },
    ],
    intermediate: [
      { id: 'lesson-1', title: 'Advanced Risk Metrics' },
      { id: 'lesson-2', title: 'Managing Psychological Risk' },
    ],
    advanced: [
      { id: 'lesson-1', title: 'Portfolio Risk Management' },
      { id: 'lesson-2', title: 'Building Robust Trading Systems' },
    ],
  },
};

export default function LevelPage() {
  const params = useParams();
  const instructorId = params.id as string;
  const levelId = params.level as Level;
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    // Load lessons
    const content = fakeContent[instructorId as keyof typeof fakeContent];
    if (content && content[levelId]) {
      setLessons(content[levelId]);
    }
  }, [instructorId, levelId]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
        <div className="container-max section-padding">
          <Link
            href={`/instructor/${instructorId}`}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-50 capitalize">
              {levelId} Level
            </h1>
            <p className="text-gray-400 mt-2">
              {lessons.length} lessons to master
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-gray-50 mb-8">
            Lessons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson, idx) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={`/instructor/${instructorId}/${levelId}/${lesson.id}`}>
                  <div className="card-base p-6 h-full cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-xl font-bold text-gray-50 mb-2">
                      Lesson {idx + 1}
                    </h3>
                    <p className="text-gray-400">{lesson.title}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 mt-12">
        <div className="container-max section-padding text-center text-gray-400 text-sm">
          <p>Complete all lessons to progress to the next level</p>
        </div>
      </footer>
    </div>
  );
}
