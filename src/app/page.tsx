// src/app/page.tsx
import CoffeeCard from '@/components/CoffeeCard';
import { coffees } from '@/data/coffees';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-700 dark:to-amber-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Premium Coffee Beans
          </h1>
          <p className="text-xl text-amber-50 max-w-2xl mx-auto">
            세계 각지에서 엄선한 최고급 스페셜티 커피를 만나보세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Our Coffee Collection
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            각 원두의 고유한 특성과 풍미를 경험해보세요. 
            라이트 로스팅부터 다크 로스팅까지 다양한 취향을 만족시킬 수 있는 원두를 준비했습니다.
          </p>
        </div>

        {/* Coffee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>

        {/* Call to Action Section */}
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">About Us</h4>
              <p className="text-sm">
                최고의 커피 경험을 제공하기 위해 전 세계의 우수한 농장과 직접 거래합니다.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">원두</a></li>
                <li><a href="#" className="hover:text-white transition-colors">드립백</a></li>
                <li><a href="#" className="hover:text-white transition-colors">콜드브루</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">배송 안내</a></li>
                <li><a href="#" className="hover:text-white transition-colors">반품/교환</a></li>
                <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-sm">
                Email: hello@coffeebeans.com<br />
                Phone: 02-1234-5678<br />
                Mon-Fri: 9:00 - 18:00
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Premium Coffee Beans. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}