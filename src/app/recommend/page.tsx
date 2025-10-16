'use client';

import { useState } from 'react';
import Link from 'next/link';
import CoffeeCard from '@/components/CoffeeCard';
import RecommendationQuiz from '@/components/RecommendationQuiz';
import { coffees } from '@/data/coffees';
import { UserPreferences, recommendCoffees, getMatchPercentage } from '@/utils/recommendationEngine';

export default function RecommendPage() {
  const [showQuiz, setShowQuiz] = useState(true);
  const [recommendations, setRecommendations] = useState<ReturnType<typeof recommendCoffees>>([]);

  const handleQuizComplete = (preferences: UserPreferences) => {
    const results = recommendCoffees(coffees, preferences);
    setRecommendations(results);
    setShowQuiz(false);
  };

  const handleReset = () => {
    setShowQuiz(true);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-700 dark:to-amber-800 py-12">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-50 hover:text-white mb-6 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>홈으로 돌아가기</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            나에게 맞는 원두 찾기
          </h1>
          <p className="text-xl text-amber-50 max-w-2xl">
            간단한 질문에 답하시면 취향에 맞는 커피 원두를 추천해드립니다
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {showQuiz ? (
          <RecommendationQuiz onComplete={handleQuizComplete} />
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
                <svg
                  className="w-16 h-16 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                당신을 위한 추천 원두
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                선택하신 취향을 바탕으로 가장 적합한 원두를 찾았습니다
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                다시 추천받기
              </button>
            </div>

            {/* Recommended Coffees */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((recommendation, index) => (
                <div key={recommendation.coffee.id} className="relative">
                  {/* Ranking Badge */}
                  {index === 0 && (
                    <div className="absolute -top-4 -right-4 z-10 bg-gradient-to-br from-yellow-400 to-amber-500 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      BEST
                    </div>
                  )}

                  {/* Match Percentage */}
                  <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {getMatchPercentage(recommendation.score)}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        일치
                      </div>
                    </div>
                  </div>

                  {/* Coffee Card */}
                  <CoffeeCard coffee={recommendation.coffee} />

                  {/* Match Reasons */}
                  {recommendation.matchReasons.length > 0 && (
                    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                      <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-2">
                        추천 이유:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.matchReasons.map((reason, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-md"
                          >
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No Results */}
            {recommendations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  추천할 수 있는 원두를 찾지 못했습니다.
                </p>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  마음에 드는 원두를 찾으셨나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  더 많은 원두를 둘러보시거나, 다른 취향으로 다시 추천받아보세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    전체 원두 보기
                  </Link>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-600 transition-colors duration-200"
                  >
                    다시 추천받기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
