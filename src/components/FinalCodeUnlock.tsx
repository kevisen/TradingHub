'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { validateBootcampCode, markInstructorValidated } from '@/lib/storage';
import { Instructor } from '@/lib/types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface FinalCodeUnlockProps {
  instructor: Instructor;
  onSuccess?: () => void;
}

export function FinalCodeUnlock({
  instructor,
  onSuccess,
}: FinalCodeUnlockProps) {
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Please enter a code');
      return;
    }

    const valid = validateBootcampCode(instructor, code);
    setIsValid(valid);
    setSubmitted(true);

    if (valid) {
      markInstructorValidated(instructor);
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    }
  };

  const BADGE_IMAGE = 'https://cdn.discordapp.com/attachments/1473208415227740191/1473224604180021269/file_000000008da871f8b51e6c4e788c57b1.png?ex=6996c054&is=69956ed4&hm=5dff30c109746f28e3f95a1e6fc76671727270c13859967e1990028f83b668ba';

  useEffect(() => {
    if (submitted && isValid) {
      // open badge modal when validated
      setShowModal(true);
    }
  }, [submitted, isValid]);

  if (submitted && isValid) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <CheckCircle2 className="w-24 h-24 text-green-600 mx-auto mb-6" />
        </motion.div>

        <h2 className="text-4xl font-bold text-gray-50 mb-4">
          🎉 Bootcamp Completed!
        </h2>

        <p className="text-xl text-gray-400 mb-2">
          Congratulations on completing the entire bootcamp!
        </p>

        <p className="text-gray-500 mb-8">
          You've mastered all levels: Beginner, Intermediate, and Advanced
        </p>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 max-w-2xl mx-auto mb-8">
          <p className="text-gray-400 text-sm mb-3">Your Validation Code:</p>
          <p className="text-3xl font-bold text-blue-400 font-mono tracking-wider">
            {code.toUpperCase()}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <p className="text-gray-500 text-sm mb-4">
            Save this code for your records. You can now access the certificate or share your achievement!
          </p>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 max-w-lg w-full">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="button-outline"
                >
                  Close
                </button>
              </div>
              <div className="mt-4">
                <img
                  src={BADGE_IMAGE}
                  alt="Bootcamp Badge"
                  className="w-full rounded"
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-md p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-gray-50 mb-2">
          🔐 Final Validation
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          You've completed all lessons! Enter your validation code to unlock your certificate.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Validation Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setSubmitted(false);
                setError('');
              }}
              placeholder="Enter your code"
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg font-mono text-center focus:outline-none focus:border-blue-500 uppercase text-gray-50 placeholder-gray-400"
              disabled={submitted && isValid}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-red-600 text-sm"
            >
              <XCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          {submitted && !isValid && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <p className="text-red-700 font-semibold text-sm">
                Invalid code. Please check and try again.
              </p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={submitted && isValid}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              submitted && isValid
                ? 'button-primary opacity-50 cursor-not-allowed'
                : 'button-primary'
            }`}
          >
            {submitted && isValid ? 'Success! Redirecting...' : 'Validate Code'}
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-6">
          You should have received your validation code upon bootcamp enrollment.
        </p>
      </div>
    </div>
  );
}
