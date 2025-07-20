'use client';

import { formatDate, formatExamDateTime, generateMotivationalText } from '@/lib/countdown';
import { motion } from 'framer-motion';
import { Calendar, Target } from 'lucide-react';

interface AssistiveTextProps {
  examDate: Date;
  daysRemaining: number;
  className?: string;
}

export function AssistiveText({ examDate, daysRemaining, className }: AssistiveTextProps) {
  const today = new Date();
  const motivationalText = generateMotivationalText(daysRemaining);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`text-center space-y-3 ${className}`}
    >
      {/* 励志文案 */}
      <div className="text-lg md:text-xl font-medium text-foreground">
        {motivationalText}
      </div>

      {/* 日期信息 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm md:text-base text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span>今天：{formatDate(today)}</span>
        </div>
        
        <div className="hidden md:block text-muted-foreground">•</div>
        
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-red-500" />
          <span>考试：{formatExamDateTime(examDate)}</span>
        </div>
      </div>

      {/* 移动端额外信息 */}
      <div className="md:hidden text-xs text-muted-foreground pt-2 border-t border-border/20">
        <div className="opacity-75">
          {daysRemaining > 0 ? '坚持到底，你一定可以的！' : '全力以赴，展现最好的自己！'}
        </div>
      </div>
    </motion.div>
  );
}
