'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quiz } from '@/lib/types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizComponentProps {
  quiz: Quiz[];
  onComplete: (score: number) => void;
  batchMode?: boolean;
}

export function QuizComponent({ quiz, onComplete, batchMode = false }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [batchAnswers, setBatchAnswers] = useState<(number | null)[]>([]);
  const [gifFailed, setGifFailed] = useState(false);

  useEffect(() => {
    if (batchMode) {
      setBatchAnswers(Array(quiz.length).fill(null));
    }
  }, [batchMode, quiz.length]);

  if (!quiz || quiz.length === 0) {
    return null;
  }

    if (completed) {
    const percentage = Math.round((score / quiz.length) * 100);
    const passed = percentage >= 80;

    // swapped as requested: fail -> first URL, pass -> second URL
    const failGifPage = 'https://tenor.com/view/donald-trump-wrong-not-right-gif-14695153867752834726';
    const passGifPage = 'https://tenor.com/view/trump-trump-2024-maga-the-donald-donald-trump-gif-5733371666398431239';
    const passGif = `${passGifPage}.gif`;
    const failGif = `${failGifPage}.gif`;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-center border border-gray-700"
      >
        {passed ? (
          <>
            <div className="mx-auto mb-4 w-36 h-36">
              {!gifFailed ? (
                <img src={passGif} alt="Passed" className="w-full h-full object-cover rounded-md" onError={() => setGifFailed(true)} />
              ) : (
                <a href={passGifPage} target="_blank" rel="noreferrer" className="text-blue-400 underline">Open GIF</a>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-50 mb-2">Great Job!</h3>
            <p className="text-gray-400 mb-4">You scored {score}/{quiz.length} ({percentage}%)</p>
            <button onClick={() => onComplete(score)} className="button-primary">Continue to Next Lesson</button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 w-36 h-36">
              {!gifFailed ? (
                <img src={failGif} alt="Failed" className="w-full h-full object-cover rounded-md" onError={() => setGifFailed(true)} />
              ) : (
                <a href={failGifPage} target="_blank" rel="noreferrer" className="text-blue-400 underline">Open GIF</a>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-50 mb-2">Try Again</h3>
            <p className="text-gray-400 mb-4">You scored {score}/{quiz.length} ({percentage}%). You need 80% to pass.</p>
            <button onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setSelectedAnswer(null);
              setAnswered(false);
              setCompleted(false);
              setBatchAnswers(Array(quiz.length).fill(null));
            }} className="button-primary">Retake Quiz</button>
          </>
        )}
      </motion.div>
    );
  }

  const question = quiz[currentQuestion];

  const handleSelectAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
  };

  const handleBatchSelect = (qIdx: number, optionIdx: number) => {
    setBatchAnswers((prev) => {
      const copy = [...prev];
      copy[qIdx] = optionIdx;
      return copy;
    });
  };

  const handleSubmit = () => {
    if (!Array.isArray(quiz)) return;

    // Default sequential behavior
    if (!batchMode) {
      if (selectedAnswer === null) return;

      const correct = selectedAnswer === question.answer;
      setAnswered(true);

      if (correct) {
        setScore(score + 1);
      }

      setTimeout(() => {
        if (currentQuestion < quiz.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setAnswered(false);
        } else {
          setCompleted(true);
        }
      }, 1500);
      return;
    }
  };

  // New: final submit for batch mode
  const handleBatchSubmit = () => {
    if (batchAnswers.length < quiz.length) return;
    if (batchAnswers.some((a) => a === null || typeof a === 'undefined')) return;

    let s = 0;
    for (let i = 0; i < quiz.length; i++) {
      const ansIdx = (quiz[i] as any).answer ?? (quiz[i] as any).correctIndex;
      if (batchAnswers[i] === ansIdx) s++;
    }
    setScore(s);
    setCompleted(true);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-700"
      >
        {/* If batchMode prop is passed via (quiz as any).batchMode, render all questions at once */}
        {batchMode ? (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-400">Quiz — {quiz.length} questions</span>
              <span className="text-sm font-semibold text-gray-400">Score: {score}/{quiz.length}</span>
            </div>

            <div className="space-y-6">
              {quiz.map((q, qi) => {
                const ansIdx = (q as any).answer ?? (q as any).correctIndex;
                const selected = batchAnswers[qi] ?? null;

                return (
                  <div key={qi} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-50 mb-3">{q.question}</h4>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const isSelected = selected === oi;
                        const showResult = completed;
                        const isCorrect = oi === ansIdx;

                        return (
                          <button
                            key={oi}
                            onClick={() => handleBatchSelect(qi, oi)}
                            className={`w-full text-left p-3 rounded-lg transition ${isSelected ? 'bg-blue-900 text-blue-50' : 'bg-gray-900 text-gray-50 hover:bg-gray-800' } ${showResult && isCorrect ? 'border-2 border-green-500 bg-green-900 text-green-50' : ''}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <button
                onClick={handleBatchSubmit}
                disabled={batchAnswers.length < quiz.length || batchAnswers.some((a) => a === null || typeof a === 'undefined')}
                className={`w-full ${batchAnswers.length === quiz.length && !batchAnswers.some((a) => a === null || typeof a === 'undefined') ? 'button-primary' : 'bg-gray-700 text-gray-400 cursor-not-allowed px-4 py-2 rounded-lg font-semibold'}`}
              >
                Submit Answers
              </button>
            </div>
          </div>
        ) : (
          // existing sequential UI (unchanged)
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-400">
                  Question {currentQuestion + 1}/{quiz.length}
                </span>
                <span className="text-sm font-semibold text-gray-400">
                  Score: {score}/{quiz.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                  className="h-full bg-blue-600 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
            <h4 className="text-xl font-bold text-gray-50 mb-6">
              {question.question}
            </h4>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.answer;
                const showResult = answered && (isSelected || isCorrectAnswer);

                return (
                  <motion.button
                    key={index}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={answered}
                    className={`w-full text-left p-4 rounded-lg font-medium transition-all ${
                      showResult && isCorrectAnswer
                        ? 'bg-green-900 border-2 border-green-500 text-green-50'
                        : showResult && isSelected
                          ? 'bg-red-900 border-2 border-red-500 text-red-50'
                          : isSelected && !answered
                            ? 'bg-blue-900 border-2 border-blue-500 text-blue-50'
                            : 'bg-gray-800 border-2 border-gray-700 text-gray-50 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 ${
                          isSelected ? 'bg-current' : 'border-gray-600'
                        }`}
                      />
                      <span>{option}</span>
                      {showResult && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 ml-auto" />
                      )}
                      {showResult && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 ml-auto" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {answered && question.explanation && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded"
              >
                <p className="text-sm text-blue-900">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || answered}
              className={`w-full ${
                selectedAnswer !== null && !answered
                  ? 'button-primary'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed px-4 py-2 rounded-lg font-semibold'
              }`}
            >
              {answered ? 'Loading next question...' : 'Submit Answer'}
            </button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
