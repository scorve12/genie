export default function CallToAction() {
  return (
    <div className="mt-20 bg-amber-50 dark:bg-gray-800 rounded-3xl p-12 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        당신만의 완벽한 커피를 찾아보세요
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        전문 바리스타의 추천과 함께 당신의 취향에 맞는 원두를 선택하는데 도움을 드립니다.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          전체 상품 보기
        </button>
        <button className="px-8 py-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          커피 가이드
        </button>
      </div>
    </div>
  );
}
