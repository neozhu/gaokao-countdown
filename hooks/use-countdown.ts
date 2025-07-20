import { useState, useEffect, useRef } from 'react';
import { calculateTimeRemaining, type CountdownData } from '@/lib/countdown';

/**
 * 倒计时 Hook
 */
export function useCountdown(targetDate: Date) {
  // 初始状态设为null，避免服务器端和客户端不一致
  const [countdownData, setCountdownData] = useState<CountdownData | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 立即更新一次
    const initialData = calculateTimeRemaining(targetDate);
    setCountdownData(initialData);

    // 设置定时器
    intervalRef.current = setInterval(() => {
      const newData = calculateTimeRemaining(targetDate);
      setCountdownData(newData);
      
      // 如果已过期，清除定时器
      if (newData.isExpired) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 1000);

    // 清理函数
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetDate]);

  // 如果还没有数据，返回一个默认的倒计时数据
  return countdownData || {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    isExpired: false,
    progress: 0
  };
}
