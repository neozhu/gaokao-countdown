'use client';

import { useState, useEffect } from 'react';
import { useCountdown } from '@/hooks/use-countdown';
import { formatCountdownDisplay } from '@/lib/countdown';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const countdownData = useCountdown(targetDate);
  const displayData = formatCountdownDisplay(countdownData);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 在组件挂载前显示占位符，避免水合不匹配
  if (!isMounted) {
    return (
      <Card className={`p-8 text-center glass-card ${className}`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-7xl md:text-9xl font-bold text-primary">
                  --
                </div>
              </motion.div>
            </div>
            <div className="text-xl md:text-2xl text-muted-foreground">
              加载中...
            </div>
          </div>
        </motion.div>
      </Card>
    );
  }

  if (countdownData.isExpired) {
    return (
      <Card className={`p-8 text-center glass-card ${className}`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl md:text-8xl font-bold text-red-500 mb-4">
            {displayData.primary}
          </div>
          <div className="text-xl md:text-2xl text-muted-foreground">
            {displayData.units}
          </div>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className={`p-8 text-center glass-card ${className}`}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {/* 主要数字显示 */}
        <div className="flex items-center justify-center gap-4">
          <motion.div
            key={displayData.primary}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-7xl md:text-9xl font-bold text-primary"
          >
            {displayData.primary}
          </motion.div>
          
          {displayData.secondary && (
            <>
              <div className="text-4xl md:text-6xl text-muted-foreground">:</div>
              <motion.div
                key={displayData.secondary}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-7xl md:text-9xl font-bold text-primary"
              >
                {displayData.secondary}
              </motion.div>
            </>
          )}
        </div>

        {/* 单位标签 */}
        <div className="text-xl md:text-3xl text-muted-foreground font-medium">
          {displayData.units}
        </div>

        {/* 总秒数显示（调试用，可选） */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-sm text-muted-foreground">
            总计: {countdownData.totalSeconds} 秒
          </div>
        )}
      </motion.div>
    </Card>
  );
}
