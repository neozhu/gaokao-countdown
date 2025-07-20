import { useState, useEffect } from 'react';
import quotesData from '@/data/quotes.json';

export interface Quote {
  id: number;
  chinese: string;
  english: string;
  category: string;
}

/**
 * 励志语录 Hook
 */
export function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 获取每日语录
  const getDailyQuote = (): Quote => {
    if (!isMounted) {
      // 在服务器端或客户端未挂载时返回第一条语录
      return quotesData[0];
    }
    
    const today = new Date();
    const dateString = today.toDateString();
    
    // 使用日期作为种子来确保每天获取同一条语录
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      const char = dateString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    
    const index = Math.abs(hash) % quotesData.length;
    return quotesData[index];
  };

  // 刷新语录
  const refreshQuote = () => {
    if (!isMounted) return;
    
    setIsLoading(true);
    setError(null);
    
    // 模拟API延迟
    setTimeout(() => {
      try {
        const randomIndex = Math.floor(Math.random() * quotesData.length);
        setQuote(quotesData[randomIndex]);
        setIsLoading(false);
      } catch (err) {
        setError('获取语录失败');
        setIsLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    // 标记客户端已挂载
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // 初始化时获取每日语录
    try {
      const dailyQuote = getDailyQuote();
      setQuote(dailyQuote);
      setIsLoading(false);
    } catch (err) {
      setError('获取语录失败');
      setIsLoading(false);
    }
  }, [isMounted]);

  return {
    quote,
    isLoading,
    error,
    refreshQuote,
  };
}
