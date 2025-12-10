'use client';

import { useState, useEffect, useCallback } from 'react';
import { Question } from '@/types/question';
import * as questionsApi from '@/lib/api/questions';

interface UseQuestionsReturn {
  questions: Question[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addQuestion: (question: Omit<Question, 'id'>) => Promise<Question>;
  editQuestion: (id: number, updates: Partial<Question>) => Promise<Question>;
  removeQuestion: (id: number) => Promise<void>;
}

export function useQuestions(activeOnly = false): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await questionsApi.getQuestions(activeOnly);
      setQuestions(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch questions';
      setError(errorMessage);
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const addQuestion = useCallback(
    async (question: Omit<Question, 'id'>): Promise<Question> => {
      try {
        const newQuestion = await questionsApi.createQuestion(question);
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        return newQuestion;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create question';
        throw new Error(errorMessage);
      }
    },
    []
  );

  const editQuestion = useCallback(
    async (id: number, updates: Partial<Question>): Promise<Question> => {
      try {
        const updatedQuestion = await questionsApi.updateQuestion(id, updates);
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? updatedQuestion : question
          )
        );
        return updatedQuestion;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update question';
        throw new Error(errorMessage);
      }
    },
    []
  );

  const removeQuestion = useCallback(async (id: number): Promise<void> => {
    try {
      await questionsApi.deleteQuestion(id);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete question';
      throw new Error(errorMessage);
    }
  }, []);

  return {
    questions,
    loading,
    error,
    refetch: fetchQuestions,
    addQuestion,
    editQuestion,
    removeQuestion,
  };
}
