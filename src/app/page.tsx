import CoffeeCard from '@/components/CoffeeCard';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { Coffee } from '@/types/coffee';

async function getBeans(): Promise<Coffee[]> {
  try {
    const res = await fetch('http://localhost:3000/api/beans', {
      cache: 'no-store', // Always get fresh data
    });

    if (!res.ok) {
      throw new Error('Failed to fetch beans');
    }

    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching beans:', error);
    return [];
  }
}

export default async function Home() {
  const coffees = await getBeans();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Navigation />
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

        {coffees.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              원두 데이터를 불러올 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        )}

        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
