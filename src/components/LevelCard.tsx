'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface LevelCardProps {
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  description: string;
  lessonCount: number;
  index: number;
}

const levelConfig = {
  beginner: {
    title: 'Beginner',
    icon: '🌱',
    color: 'from-blue-900 to-blue-800',
    textColor: 'text-blue-50',
    badgeColor: 'bg-blue-800 text-blue-100',
  },
  intermediate: {
    title: 'Intermediate',
    icon: '📈',
    color: 'from-purple-900 to-purple-800',
    textColor: 'text-purple-50',
    badgeColor: 'bg-purple-800 text-purple-100',
  },
  advanced: {
    title: 'Advanced',
    icon: '🚀',
    color: 'from-gray-800 to-gray-700',
    textColor: 'text-gray-50',
    badgeColor: 'bg-gray-700 text-gray-100',
  },
};

export function LevelCard({
  level,
  instructor,
  description,
  lessonCount,
  index,
}: LevelCardProps) {
  const config = levelConfig[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/instructor/${instructor}/${level}`}>
        <div className={`bg-gradient-to-br ${config.color} rounded-xl p-8 cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col`}>
          <div className="text-5xl mb-4">{config.icon}</div>

          <h3 className={`text-2xl font-bold ${config.textColor} mb-2`}>
            {config.title}
          </h3>

          <p className={`${config.textColor} opacity-80 text-sm flex-grow mb-4`}>
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className={`${config.badgeColor} px-3 py-1 rounded-full text-sm font-semibold`}>
              {lessonCount} lessons
            </span>
            <ChevronRight className={`w-5 h-5 ${config.textColor} transition-transform group-hover:translate-x-1`} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
