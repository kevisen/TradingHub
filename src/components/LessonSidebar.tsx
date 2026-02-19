'use client';

import { motion } from 'framer-motion';
import { Lesson, LessonProgress } from '@/lib/types';
import { CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface LessonSidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  progress: LessonProgress[];
  instructor: string;
  level: string;
}

export function LessonSidebar({
  lessons,
  currentLessonId,
  progress,
  instructor,
  level,
}: LessonSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getProgressStatus = (lessonId: string) => {
    return progress.find((p) => p.lessonId === lessonId);
  };

  const content = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800 bg-gray-900">
        <h2 className="font-bold text-gray-50">
          {lessons.length} Lessons
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {progress.filter((p) => p.completed).length} / {lessons.length} completed
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-2">
          {lessons.map((lesson, index) => {
            const status = getProgressStatus(lesson.id);
            const isCurrent = lesson.id === currentLessonId;

            return (
              <Link
                key={lesson.id}
                href={`/instructor/${instructor}/${level}/${lesson.id}`}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  onClick={() => setIsOpen(false)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-blue-900 border-2 border-blue-500'
                      : 'hover:bg-gray-800 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {status?.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-50 truncate">
                        Lesson {index + 1}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {lesson.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-gray-900 border border-gray-700 rounded-lg"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={isOpen ? { x: -280 } : { x: 0 }}
        animate={isOpen ? { x: 0 } : undefined}
        className={`${
          isOpen ? 'fixed' : 'hidden'
        } md:block md:relative w-72 h-screen bg-gray-900 border-r border-gray-800 z-30`}
      >
        {content}
      </motion.div>
    </>
  );
}
