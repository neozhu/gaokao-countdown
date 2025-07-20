'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  const { theme, setTheme } = useTheme();

  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className={`mt-auto py-6 px-4 border-t border-border/20 ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 版权信息 */}
        <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for students</span>
          </div>
          <span className="hidden md:block">•</span>
          <span>© 2025 高考倒计时应用</span>
        </div>

        {/* 中间信息 */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>v1.0.0</span>
          <span>•</span>
          <span>Next.js + Tailwind</span>
        </div>

       
      </div>

      {/* 移动端额外信息 */}
      <div className="md:hidden mt-4 pt-4 border-t border-border/10 text-center">
        <div className="text-xs text-muted-foreground space-y-1">
          <div>技术栈: Next.js • TypeScript • Tailwind CSS</div>
          <div>愿每一个努力的你都能圆梦高考 🌟</div>
        </div>
      </div>
    </motion.footer>
  );
}
