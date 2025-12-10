'use client';

import { useState, useEffect, useCallback } from 'react';
import { Coffee } from '@/types/coffee';
import * as beansApi from '@/lib/api/beans';

interface UseBeansReturn {
  beans: Coffee[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addBean: (bean: Omit<Coffee, 'id'>) => Promise<Coffee>;
  editBean: (id: number, updates: Partial<Coffee>) => Promise<Coffee>;
  removeBean: (id: number) => Promise<void>;
}

export function useBeans(): UseBeansReturn {
  const [beans, setBeans] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBeans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await beansApi.getBeans();
      setBeans(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch beans';
      setError(errorMessage);
      console.error('Error fetching beans:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBeans();
  }, [fetchBeans]);

  const addBean = useCallback(
    async (bean: Omit<Coffee, 'id'>): Promise<Coffee> => {
      try {
        const newBean = await beansApi.createBean(bean);
        setBeans((prevBeans) => [...prevBeans, newBean]);
        return newBean;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create bean';
        throw new Error(errorMessage);
      }
    },
    []
  );

  const editBean = useCallback(
    async (id: number, updates: Partial<Coffee>): Promise<Coffee> => {
      try {
        const updatedBean = await beansApi.updateBean(id, updates);
        setBeans((prevBeans) =>
          prevBeans.map((bean) => (bean.id === id ? updatedBean : bean))
        );
        return updatedBean;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update bean';
        throw new Error(errorMessage);
      }
    },
    []
  );

  const removeBean = useCallback(async (id: number): Promise<void> => {
    try {
      await beansApi.deleteBean(id);
      setBeans((prevBeans) => prevBeans.filter((bean) => bean.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete bean';
      throw new Error(errorMessage);
    }
  }, []);

  return {
    beans,
    loading,
    error,
    refetch: fetchBeans,
    addBean,
    editBean,
    removeBean,
  };
}
