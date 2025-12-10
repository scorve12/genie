import { Question } from '@/types/question';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function getQuestions(activeOnly = false): Promise<Question[]> {
  const url = activeOnly ? '/api/questions?active=true' : '/api/questions';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch questions: ${response.statusText}`);
  }

  const data: ApiResponse<Question[]> = await response.json();
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch questions');
  }

  return data.data;
}

export async function getQuestion(id: number): Promise<Question> {
  const response = await fetch(`/api/questions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch question: ${response.statusText}`);
  }

  const data: ApiResponse<Question> = await response.json();
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch question');
  }

  return data.data;
}

export async function createQuestion(
  question: Omit<Question, 'id'>
): Promise<Question> {
  const response = await fetch('/api/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });

  if (!response.ok) {
    throw new Error(`Failed to create question: ${response.statusText}`);
  }

  const data: ApiResponse<Question> = await response.json();
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to create question');
  }

  return data.data;
}

export async function updateQuestion(
  id: number,
  updates: Partial<Question>
): Promise<Question> {
  const response = await fetch(`/api/questions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update question: ${response.statusText}`);
  }

  const data: ApiResponse<Question> = await response.json();
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to update question');
  }

  return data.data;
}

export async function deleteQuestion(id: number): Promise<void> {
  const response = await fetch(`/api/questions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete question: ${response.statusText}`);
  }

  const data: ApiResponse<null> = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to delete question');
  }
}
