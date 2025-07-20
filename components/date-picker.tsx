'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/use-local-storage';
import examDatesData from '@/data/exam-dates.json';
import { motion } from 'framer-motion';

interface DatePickerProps {
  onDateChange?: (date: Date) => void;
  className?: string;
}

export function DatePicker({ onDateChange, className }: DatePickerProps) {
  const [examDateString, setExamDateString] = useLocalStorage(
    'exam-date',
    examDatesData.default.date
  );
  
  const [selectedProvince, setSelectedProvince] = useLocalStorage(
    'selected-province',
    'default'
  );
  
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date(examDateString));

  // 处理省份选择
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    const provinceData = province === 'default' 
      ? examDatesData.default 
      : examDatesData.provinces[province as keyof typeof examDatesData.provinces];
    
    if (provinceData) {
      const newDate = new Date(provinceData.date);
      setTempDate(newDate);
      setExamDateString(provinceData.date);
      onDateChange?.(newDate);
    }
  };

  // 处理自定义日期选择
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setTempDate(date);
    }
  };

  // 确认日期更改
  const handleConfirm = () => {
    const isoString = tempDate.toISOString();
    setExamDateString(isoString);
    onDateChange?.(tempDate);
    setIsOpen(false);
  };

  // 获取当前选择的信息
  const getCurrentInfo = () => {
    if (selectedProvince === 'default') {
      return examDatesData.default;
    }
    return examDatesData.provinces[selectedProvince as keyof typeof examDatesData.provinces] || examDatesData.default;
  };

  const currentInfo = getCurrentInfo();
  const currentDate = new Date(examDateString);

  return (
    <Card className={`p-6 glass-card-light ${className}`}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4"
      >
        {/* 标题 */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">考试日期设置</h3>
        </div>

        {/* 省份选择 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            选择省份/地区
          </label>
          <Select value={selectedProvince} onValueChange={handleProvinceChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择省份" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">全国统一高考</SelectItem>
              {Object.entries(examDatesData.provinces).map(([key, province]) => (
                <SelectItem key={key} value={key}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 当前日期显示 */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">当前考试时间</div>
          <div className="font-medium text-foreground">
            {currentInfo.name}
          </div>
          <div className="text-sm text-primary">
            {format(currentDate, 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
          </div>
        </div>

        {/* 自定义日期选择 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            自定义日期
          </label>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                自定义考试时间
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-4 space-y-4">
                <div className="text-sm font-medium">选择自定义日期</div>
                <Calendar
                  mode="single"
                  selected={tempDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  locale={zhCN}
                  className="rounded-md border"
                />
                
                {/* 时间选择（简化版） */}
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">
                    考试时间（默认上午9:00）
                  </label>
                  <Select 
                    value="09:00" 
                    onValueChange={(time: string) => {
                      const [hours, minutes] = time.split(':');
                      const newDate = new Date(tempDate);
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      setTempDate(newDate);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 (语文)</SelectItem>
                      <SelectItem value="15:00">15:00 (数学)</SelectItem>
                      <SelectItem value="08:30">08:30 (其他)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleConfirm}
                    className="flex-1"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    确认
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* 提示信息 */}
        <div className="text-xs text-muted-foreground">
          💡 设置会自动保存到本地，下次打开时会记住您的选择
        </div>
      </motion.div>
    </Card>
  );
}
