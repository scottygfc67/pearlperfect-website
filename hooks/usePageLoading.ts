'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const router = useRouter();

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const navigateWithLoading = (url: string, message = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
    
    // Small delay for smooth transition
    setTimeout(() => {
      router.push(url);
    }, 300);
  };

  return {
    isLoading,
    setIsLoading,
    loadingMessage,
    setLoadingMessage,
    navigateWithLoading
  };
}

// Hook for component-level loading states
export function useComponentLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  const executeWithLoading = async <T,>(
    asyncFunction: () => Promise<T>,
    loadingMessage?: string
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    setIsLoading,
    error,
    setError,
    executeWithLoading
  };
}
