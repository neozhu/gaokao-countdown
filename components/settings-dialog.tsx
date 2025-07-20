'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, MapPin, Save } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import examDatesData from '@/data/exam-dates.json';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examDate: Date;
  onDateChange: (date: Date) => void;
}

export function SettingsDialog({ 
  open, 
  onOpenChange, 
  examDate, 
  onDateChange 
}: SettingsDialogProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [customDate, setCustomDate] = useState<Date>(examDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 处理省份选择
  const handleProvinceSelect = (provinceKey: string) => {
    setSelectedProvince(provinceKey);
    if (provinceKey === 'default') {
      const newDate = new Date(examDatesData.default.date);
      setCustomDate(newDate);
    } else {
      const provinceData = (examDatesData.provinces as Record<string, { date: string; name: string }>)[provinceKey];
      if (provinceData) {
        const newDate = new Date(provinceData.date);
        setCustomDate(newDate);
      }
    }
  };

  // 处理日期保存
  const handleSave = () => {
    onDateChange(customDate);
    onOpenChange(false);
  };

  // 重置为默认日期
  const handleReset = () => {
    const defaultDate = new Date(examDatesData.default.date);
    setCustomDate(defaultDate);
    setSelectedProvince('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            考试日期设置
          </DialogTitle>
          <DialogDescription>
            选择您的高考日期，支持按省份快速选择或自定义日期
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 省份快速选择 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">按省份选择</label>
            </div>
            <Select value={selectedProvince} onValueChange={handleProvinceSelect}>
              <SelectTrigger>
                <SelectValue placeholder="选择您的省份..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">
                  {examDatesData.default.name} ({examDatesData.default.date.split('T')[0]})
                </SelectItem>
                {Object.entries(examDatesData.provinces).map(([key, province]) => (
                  <SelectItem key={key} value={key}>
                    {province.name} ({province.date.split('T')[0]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 自定义日期选择 */}
          <div className="space-y-3">
            <label className="text-sm font-medium">自定义日期</label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !customDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customDate ? (
                    format(customDate, 'yyyy年MM月dd日', { locale: zhCN })
                  ) : (
                    <span>选择日期</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={customDate}
                  onSelect={(date) => {
                    if (date) {
                      setCustomDate(date);
                      setSelectedProvince(''); // 清除省份选择
                      setIsCalendarOpen(false);
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 当前设置预览 */}
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <div className="text-sm font-medium">当前设置</div>
            <div className="text-sm text-muted-foreground">
              考试日期: {format(customDate, 'yyyy年MM月dd日', { locale: zhCN })}
            </div>
            <div className="text-sm text-muted-foreground">
              距离考试: {Math.max(0, Math.ceil((customDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} 天
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              重置为默认
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              保存设置
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
