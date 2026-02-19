'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface InstructorCardProps {
  id: string;
  name: string;
  title: string;
  description: string;
  image?: string;
}

export function InstructorCard({
  id,
  name,
  title,
  description,
  image,
}: InstructorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/instructor/${id}`}>
        <div className="card-base p-8 h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow bg-gray-800 border border-gray-700">
          {image && (
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
              📚
            </div>
          )}

          <h3 className="text-2xl font-bold text-gray-50 mb-2">{name}</h3>
          <p className="text-sm font-semibold text-blue-400 mb-4">{title}</p>
          <p className="text-gray-400 text-sm flex-grow mb-6">{description}</p>

          <div className="flex items-center text-blue-400 font-semibold group">
            Explore Class
            <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
