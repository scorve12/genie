'use client';

import { useState } from 'react';

interface BeanImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallbackId: number;
}

export default function BeanImage({ src, alt, className, fallbackId }: BeanImageProps) {
  const [imageError, setImageError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  // Default coffee placeholder image
  const defaultImage = '/images/default-coffee.svg';

  const getPlaceholderImage = (id: number) => {
    return `https://images.unsplash.com/photo-${1514432324203 + id}?w=800&h=600&fit=crop&q=80&auto=format&crop=entropy`;
  };

  const getFallbackImage = (id: number) => {
    return `https://source.unsplash.com/800x600/?coffee,beans&sig=${id}`;
  };

  // Determine which image to show
  const getImageSrc = () => {
    if (imageError) {
      if (fallbackError) {
        // Show gradient background with coffee icon if all images fail
        return null;
      }
      return getFallbackImage(fallbackId);
    }
    return src || getPlaceholderImage(fallbackId);
  };

  const imageSrc = getImageSrc();

  if (!imageSrc) {
    // Fallback to gradient with coffee icon
    return (
      <div className={`${className} bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center`}>
        <svg
          className="w-32 h-32 text-amber-300 dark:text-amber-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        if (!imageError) {
          setImageError(true);
        } else if (!fallbackError) {
          setFallbackError(true);
        }
      }}
    />
  );
}
