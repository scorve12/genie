'use client';

import { useState } from 'react';
import { UserPreferences } from '@/utils/recommendationEngine';

interface Question {
  id: keyof UserPreferences;
  question: string;
  description: string;
}

const questions: Question[] = [
  {
    id: 'likesAcidity',
    question: '산미가 있는 원두를 선호하시나요?',
    description: '밝고 상큼한 시트러스나 과일 같은 산미를 좋아하시나요?'
  },
  {
    id: 'likesFullBody',
    question: '진한 바디감을 원하시나요?',
    description: '묵직하고 풍부한 질감의 커피를 선호하시나요?'
  },
  {
    id: 'likesChocolateNut',
    question: '초콜릿이나 견과류 향을 좋아하시나요?',
    description: '달콤하고 고소한 초콜릿, 캐러멜, 너트 향을 선호하시나요?'
  },
  {
    id: 'likesFruityFloral',
    question: '과일향이나 플로럴 향을 선호하시나요?',
    description: '꽃향기나 베리, 와인 같은 화사한 향을 좋아하시나요?'
  },
  {
    id: 'likesDarkRoast',
    question: '다크 로스팅을 선호하시나요?',
    description: '진하고 강한 맛의 다크 로스팅 커피를 원하시나요?'
  }
];

interface RecommendationQuizProps {
  onComplete: (preferences: UserPreferences) => void;
}

export default function RecommendationQuiz({ onComplete }: RecommendationQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({});

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  const handleAnswer = (answer: boolean) => {
    const newPreferences = {
      ...preferences,
      [currentQuestion.id]: answer
    };

    setPreferences(newPreferences);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz completed
      onComplete(newPreferences as UserPreferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            질문 {currentStep + 1} / {questions.length}
          </span>
          <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {currentQuestion.question}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {currentQuestion.description}
          </p>
        </div>

        {/* Answer Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleAnswer(true)}
            className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-6 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700"
          >
            <div className="relative flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xl">네, 좋아요</span>
            </div>
          </button>

          <button
            onClick={() => handleAnswer(false)}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-6 px-8 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <div className="relative flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-xl">아니요</span>
            </div>
          </button>
        </div>

        {/* Back Button */}
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium py-3 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전 질문
          </button>
        )}
      </div>
    </div>
  );
}
