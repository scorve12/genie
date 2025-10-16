import CoffeeCard from '@/components/CoffeeCard';
import Hero from '@/components/Hero';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { coffees } from '@/data/coffees';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Hero />

      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Our Coffee Collection
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            각 원두의 고유한 특성과 풍미를 경험해보세요.
            라이트 로스팅부터 다크 로스팅까지 다양한 취향을 만족시킬 수 있는 원두를 준비했습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>

        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
