import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BeanImage from '@/components/BeanImage';
import { Coffee } from '@/types/coffee';
import Link from 'next/link';

async function getBean(id: string): Promise<Coffee | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/beans/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching bean:', error);
    return null;
  }
}

export default async function BeanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coffee = await getBean(id);

  if (!coffee) {
    notFound();
  }

  const roastColors = {
    'Light': 'bg-amber-100 text-amber-800',
    'Medium': 'bg-amber-200 text-amber-900',
    'Medium-Dark': 'bg-amber-300 text-amber-950',
    'Dark': 'bg-amber-400 text-amber-950',
  };

  const imageUrl = coffee.image ? `http://localhost:3000${coffee.image}` : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Navigation />

      <main className="container mx-auto px-6 py-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          목록으로 돌아가기
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <BeanImage
              src={imageUrl}
              alt={coffee.name}
              className="w-full h-full object-cover"
              fallbackId={coffee.id}
            />
            <div className="absolute top-6 right-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  roastColors[coffee.roastLevel]
                }`}
              >
                {coffee.roastLevel}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {coffee.name}
              </h1>
              <div className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400 mb-6">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {coffee.origin}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                설명
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {coffee.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                풍미 프로필
              </h2>
              <div className="flex flex-wrap gap-3">
                {coffee.flavor.map((flavor, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium rounded-lg"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              로스팅 레벨
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {coffee.roastLevel} 로스팅
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              원산지
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{coffee.origin}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
