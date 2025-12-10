'use client';

import { Coffee } from '@/types/coffee';
import Button from '@/components/ui/Button';
import Image from 'next/image';

interface BeanTableProps {
  beans: Coffee[];
  onEdit: (bean: Coffee) => void;
  onDelete: (bean: Coffee) => void;
}

export default function BeanTable({ beans, onEdit, onDelete }: BeanTableProps) {
  const roastColors = {
    Light: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    Medium: 'bg-amber-200 text-amber-900 dark:bg-amber-800/30 dark:text-amber-200',
    'Medium-Dark': 'bg-amber-300 text-amber-950 dark:bg-amber-700/30 dark:text-amber-100',
    Dark: 'bg-amber-400 text-amber-950 dark:bg-amber-600/30 dark:text-amber-50',
  };

  if (beans.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          원두가 없습니다
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          새 원두를 추가하여 시작하세요.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                이미지
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                이름
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                원산지
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                로스팅 레벨
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                가격
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {beans.map((bean) => (
              <tr
                key={bean.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center">
                    {bean.image ? (
                      <Image
                        src={bean.image}
                        alt={bean.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <svg
                        className="w-6 h-6 text-amber-300 dark:text-amber-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" />
                      </svg>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {bean.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {bean.origin}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      roastColors[bean.roastLevel]
                    }`}
                  >
                    {bean.roastLevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    ${bean.price}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="secondary" onClick={() => onEdit(bean)}>
                      수정
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => onDelete(bean)}>
                      삭제
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {beans.map((bean) => (
          <div
            key={bean.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center">
                {bean.image ? (
                  <Image
                    src={bean.image}
                    alt={bean.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <svg
                    className="w-8 h-8 text-amber-300 dark:text-amber-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {bean.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {bean.origin}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      roastColors[bean.roastLevel]
                    }`}
                  >
                    {bean.roastLevel}
                  </span>
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    ${bean.price}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(bean)}
                className="flex-1"
              >
                수정
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(bean)}
                className="flex-1"
              >
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
