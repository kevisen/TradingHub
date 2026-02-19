'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ProgressTrackerProps {
  total: number;
  completed: number;
  percentage: number;
}

export function ProgressTracker({
  total,
  completed,
  percentage,
}: ProgressTrackerProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-gray-50 mb-4">
        Your Progress
      </h3>

      <div className="space-y-4">
        {/* Main progress bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-400">
              Overall Progress
            </span>
            <span className="text-sm font-bold text-blue-600">
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {completed}
            </div>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">
              {total - completed}
            </div>
            <p className="text-xs text-gray-400">Remaining</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-50">
              {total}
            </div>
            <p className="text-xs text-gray-400">Total</p>
          </div>
        </div>
      </div>

      {completed === total && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 flex items-center justify-center gap-2 text-green-600 font-semibold"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Level Completed!</span>
        </motion.div>
      )}
    </div>
  );
}
