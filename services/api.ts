
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Institutional API Fetcher
 * Includes pre-flight checks and standardized error handling.
 */
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const isPreviewOnly = typeof window !== 'undefined' && 
    (window.location.hostname !== 'localhost' && !window.location.hostname.includes('api'));

  const method = (options.method || 'GET').toUpperCase();

  if (isPreviewOnly && method !== 'GET') {
    throw new Error('Digital transmission layer is currently awaiting backend integration.');
  }

  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || result.errors?.[0] || 'Institutional API Error');
    }

    return result;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Institutional backend is currently offline or unreachable.');
    }
    throw error;
  }
};
