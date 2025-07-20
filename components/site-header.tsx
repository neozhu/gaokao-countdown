'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, Info, Globe, Moon, Sun, CalendarIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { SettingsDialog } from '@/components/settings-dialog';

interface SiteHeaderProps {
  className?: string;
  examDate?: Date;
  onDateChange?: (date: Date) => void;
}

export function SiteHeader({ className, examDate, onDateChange }: SiteHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between p-4 md:p-6 ${className}`}
    >
      {/* Logo 和标题 */}
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl"
        >
          🎓
        </motion.div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            高考倒计时
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            {language === 'zh' ? '为梦想而努力' : 'Striving for Dreams'}
          </p>
        </div>
      </div>

      {/* 设置菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <Settings className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {/* 考试日期设置 */}
          <DropdownMenuItem 
            onClick={() => setSettingsOpen(true)}
            className="flex items-center gap-2"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>考试日期设置</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* 主题切换 */}
          <DropdownMenuItem 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4" />
                <span>浅色主题</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span>深色主题</span>
              </>
            )}
          </DropdownMenuItem>

          {/* 语言切换 */}
          <DropdownMenuItem 
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'zh' ? 'English' : '中文'}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* 关于 */}
          <DropdownMenuItem className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>关于应用</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 设置对话框 */}
      {examDate && onDateChange && (
        <SettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          examDate={examDate}
          onDateChange={onDateChange}
        />
      )}
    </motion.header>
  );
}
