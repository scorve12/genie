import { Coffee } from '@/types/coffee';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function getBeans(): Promise<Coffee[]> {
  const response = await fetch('/api/beans', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch beans: ${response.statusText}`);
  }

  const data: ApiResponse<Coffee[]> = await response.json();
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch beans');
  }

  return data.data;
}

export async function getBean(id: number): Promise<Coffee> {
  const response = await fetch(`/api/beans/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bean: ${response.statusText}`);
  }

  const data: ApiResponse<Coffee> = await response.json();
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch bean');
  }

  return data.data;
}

export async function createBean(bean: Omit<Coffee, 'id'>): Promise<Coffee> {
  const response = await fetch('/api/beans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bean),
  });

  if (!response.ok) {
    throw new Error(`Failed to create bean: ${response.statusText}`);
  }

  const data: ApiResponse<Coffee> = await response.json();
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to create bean');
  }

  return data.data;
}

export async function updateBean(
  id: number,
  updates: Partial<Coffee>
): Promise<Coffee> {
  const response = await fetch(`/api/beans/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update bean: ${response.statusText}`);
  }

  const data: ApiResponse<Coffee> = await response.json();
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to update bean');
  }

  return data.data;
}

export async function deleteBean(id: number): Promise<void> {
  const response = await fetch(`/api/beans/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete bean: ${response.statusText}`);
  }

  const data: ApiResponse<null> = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to delete bean');
  }
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/beans/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }

  const data: ApiResponse<{ url: string }> = await response.json();
  if (!data.success || !data.data?.url) {
    throw new Error(data.error || 'Failed to upload image');
  }

  return data.data.url;
}
