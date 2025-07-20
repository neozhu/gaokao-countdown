'use client';

import { Button } from '@/components/ui/button';
import { Heart, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
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

        {/* GitHub 链接 */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <a
              href="https://github.com/neozhu/gaokao-countdown"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">源代码</span>
            </a>
          </Button>
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
