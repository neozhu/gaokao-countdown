import { useState, useCallback } from 'react';

interface Quote {
  id: string;
  chinese: string;
  english: string;
  category: string;
  generated?: boolean;
  timestamp?: string;
  meta?: {
    model?: string;
    tokens?: number;
    category?: string;
    language?: string;
    prompt?: string;
    mood?: string;
    days?: number;
  };
}

interface UseAIQuoteReturn {
  quote: Quote | null;
  loading: boolean;
  error: string | null;
  generateQuote: (options?: {
    category?: string;
    language?: string;
  }) => Promise<void>;
  generateCustomQuote: (options: {
    prompt?: string;
    days: number;
    mood?: 'positive' | 'calm' | 'motivational';
  }) => Promise<void>;
}

export function useAIQuote(): UseAIQuoteReturn {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuote = useCallback(async (options?: {
    category?: string;
    language?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (options?.category) params.append('category', options.category);
      if (options?.language) params.append('language', options.language);

      const response = await fetch(`/api/quote?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '获取语录失败');
      }

      const data = await response.json();
      setQuote(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      setError(errorMessage);
      console.error('获取 AI 语录失败:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateCustomQuote = useCallback(async (options: {
    prompt?: string;
    days: number;
    mood?: 'positive' | 'calm' | 'motivational';
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '生成个性化语录失败');
      }

      const data = await response.json();
      setQuote(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      setError(errorMessage);
      console.error('生成个性化语录失败:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    quote,
    loading,
    error,
    generateQuote,
    generateCustomQuote,
  };
}
