'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate } from '@/lib/countdown';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  startDate: Date;
  endDate: Date;
  className?: string;
}

export function ProgressBar({ progress, startDate, endDate, className }: ProgressBarProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 确保进度在 0-100 之间
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  


  // 在服务器端渲染时显示简化版本
  if (!isMounted) {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center justify-between text-sm md:text-base">
          <span className="font-medium text-foreground">备考进度</span>
          <span className="text-muted-foreground">--</span>
        </div>
        <div className="h-3 md:h-4 bg-muted/30 rounded-full overflow-hidden">
          <div className="h-full w-0 bg-primary rounded-full transition-all duration-300" />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>开始备考</span>
          <div className="flex gap-4">
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
          </div>
          <span>高考开始</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`space-y-3 ${className}`}
    >
      {/* 进度标题 */}
      <div className="flex items-center justify-between text-sm md:text-base">
        <span className="font-medium text-foreground">备考进度</span>
        <span className="text-muted-foreground">{safeProgress.toFixed(1)}%</span>
      </div>

      {/* 进度条 */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              <Progress 
                value={safeProgress} 
                className="h-3 md:h-4 bg-muted/30 overflow-hidden"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="space-y-1 text-sm">
              <div><strong>开始时间:</strong> {formatDate(startDate)}</div>
              <div><strong>考试时间:</strong> {formatDate(endDate)}</div>
              <div><strong>当前进度:</strong> {safeProgress.toFixed(1)}%</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* 进度里程碑 */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>开始备考</span>
        <div className="flex gap-4">
          {[25, 50, 75].map((milestone) => (
            <span 
              key={milestone}
              className={`transition-colors duration-300 ${
                safeProgress >= milestone ? 'text-primary font-medium' : ''
              }`}
            >
              {milestone}%
            </span>
          ))}
        </div>
        <span>高考开始</span>
      </div>
    </motion.div>
  );
}
