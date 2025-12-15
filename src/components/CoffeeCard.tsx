'use client';

// src/components/CoffeeCard.tsx
import { Coffee } from '@/types/coffee';
import { useRouter } from 'next/navigation';
import BeanImage from './BeanImage';

interface CoffeeCardProps {
  coffee: Coffee;
}

export default function CoffeeCard({ coffee }: CoffeeCardProps) {
  const router = useRouter();

  const roastColors = {
    'Light': 'bg-amber-100 text-amber-800',
    'Medium': 'bg-amber-200 text-amber-900',
    'Medium-Dark': 'bg-amber-300 text-amber-950',
    'Dark': 'bg-amber-400 text-amber-950'
  };

  const imageUrl = coffee.image ? `http://localhost:3000${coffee.image}` : undefined;

  const handleViewDetails = () => {
    router.push(`/beans/${coffee.id}`);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <BeanImage
          src={imageUrl}
          alt={coffee.name}
          className="w-full h-full object-cover"
          fallbackId={coffee.id}
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roastColors[coffee.roastLevel]}`}>
            {coffee.roastLevel}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {coffee.name}
          </h3>
          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
            ${coffee.price}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {coffee.origin}
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {coffee.description}
        </p>

        {/* Flavor Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {coffee.flavor.map((flavor, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-lg"
            >
              {flavor}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleViewDetails}
          className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
}