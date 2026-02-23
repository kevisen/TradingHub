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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link href={`/instructor/${id}`}>
        <div className="group relative h-full cursor-pointer overflow-hidden rounded-xl min-h-[500px]">
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-purple-950/30 backdrop-blur-md transition-all duration-300 group-hover:from-purple-900/40 group-hover:to-purple-950/50 group-hover:border-purple-400/60"></div>

          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
            }}>
          </div>

          {/* Card Content */}
          <div className="relative p-8 h-full flex flex-col z-10">
            {/* Profile Image Placeholder */}
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
              {name.charAt(0)}
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-white mb-2 text-center">{name}</h3>

            {/* Title */}
            <p className="text-sm font-semibold text-purple-300 mb-6 text-center leading-relaxed">{title}</p>

            {/* Description */}
            <p className="text-gray-300 text-sm flex-grow mb-8 text-center leading-relaxed">
              {description}
            </p>

            {/* CTA Link */}
            <div className="flex items-center justify-center text-purple-300 font-semibold group/link hover:text-purple-200 transition-colors">
              Explore Class
              <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
