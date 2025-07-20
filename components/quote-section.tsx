'use client';

import { useQuote } from '@/hooks/use-quote';
import { Button } from '@/components/ui/button';
import { RefreshCw, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuoteSectionProps {
  className?: string;
}

export function QuoteSection({ className }: QuoteSectionProps) {
  const { quote, isLoading, error, refreshQuote } = useQuote();

  if (error) {
    return (
      <div className={`p-6 glass-card rounded-xl ${className}`}>
        <div className="text-center text-muted-foreground">
          <div className="text-red-500 mb-2">获取语录失败</div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshQuote}
            className="text-xs"
          >
            重试
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 glass-card rounded-xl ${className}`}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        {/* 标题和刷新按钮 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">每日励志</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshQuote}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* 语录内容 */}
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted/50 rounded w-3/4"></div>
            <div className="h-4 bg-muted/50 rounded w-5/6"></div>
            <div className="h-3 bg-muted/50 rounded w-2/3"></div>
          </div>
        ) : quote ? (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {/* 中文语录 */}
            <blockquote className="text-base md:text-lg leading-relaxed text-foreground">
              &ldquo;{quote.chinese}&rdquo;
            </blockquote>
            
            {/* 英文翻译 */}
            <div className="text-sm md:text-base text-muted-foreground italic leading-relaxed border-l-2 border-primary/30 pl-4">
              &ldquo;{quote.english}&rdquo;
            </div>
            
            {/* 分类标签 */}
            <div className="flex items-center justify-between pt-2">
              <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                #{quote.category}
              </span>
              <span className="text-xs text-muted-foreground">
                今日语录 · {new Date().toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-muted-foreground">
            暂无语录
          </div>
        )}
      </motion.div>
    </div>
  );
}
