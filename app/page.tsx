'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { CountdownTimer } from '@/components/countdown-timer';
import { AssistiveText } from '@/components/assistive-text';
import { ProgressBar } from '@/components/progress-bar';
import { QuoteSection } from '@/components/quote-section';
import { ShareDialog } from '@/components/share-dialog';
import { PWAInstall } from '@/components/pwa-install';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Background } from '@/components/background';
import { ClientOnly } from '@/components/client-only';
import examDatesData from '@/data/exam-dates.json';

export default function Home() {
  // 获取用户保存的考试日期，默认使用2026年高考日期
  const [examDateString, setExamDateString] = useLocalStorage(
    'exam-date',
    examDatesData.default.date
  );

  // 将字符串转换为 Date 对象
  const examDate = new Date(examDateString);
  
  // 计算备考开始日期（假设从一年前开始备考）
  const startDate = new Date(examDate);
  startDate.setFullYear(startDate.getFullYear() - 1);

  // 计算剩余天数
  const now = new Date();
  const timeDiff = examDate.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

  // 计算进度
  const totalDuration = examDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 背景 */}
      <Background />
      
      {/* 页面头部 */}
      <SiteHeader 
        examDate={examDate}
        onDateChange={(newDate) => {
          setExamDateString(newDate.toISOString());
        }}
      />
      
      {/* 主要内容 */}
      <main className="flex-1 container mx-auto px-4 py-6 space-y-8 max-w-4xl">
        {/* 倒计时组件 */}
        <ClientOnly
          fallback={
            <div className="w-full p-8 text-center glass-card">
              <div className="text-7xl md:text-9xl font-bold text-primary">
                --
              </div>
              <div className="text-xl md:text-2xl text-muted-foreground mt-4">
                加载中...
              </div>
            </div>
          }
        >
          <CountdownTimer 
            targetDate={examDate}
            className="w-full"
          />
        </ClientOnly>
        
        {/* 辅助文本 */}
        <AssistiveText 
          examDate={examDate}
          daysRemaining={daysRemaining}
          className="w-full"
        />
        
        {/* 进度条 */}
        <ClientOnly
          fallback={
            <div className="space-y-3 w-full px-4">
              <div className="flex items-center justify-between text-sm md:text-base">
                <span className="font-medium text-foreground">备考进度</span>
                <span className="text-muted-foreground">--</span>
              </div>
              <div className="h-3 md:h-4 bg-muted/30 rounded-full">
                <div className="h-full w-0 bg-primary rounded-full transition-all duration-300" />
              </div>
            </div>
          }
        >
          <ProgressBar 
            progress={progress}
            startDate={startDate}
            endDate={examDate}
            className="w-full px-4"
          />
        </ClientOnly>
        
        {/* 励志语录 */}
        <QuoteSection className="w-full" />
        
        {/* 分享功能按钮组 */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <ShareDialog 
            examDate={examDate}
            daysRemaining={daysRemaining}
            className="w-full sm:w-auto"
          />
          <PWAInstall className="w-full sm:w-auto" />
        </div>
      </main>
      
      {/* 页面底部 */}
      <SiteFooter />
    </div>
  );
}
