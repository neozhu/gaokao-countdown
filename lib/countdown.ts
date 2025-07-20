import { format } from 'date-fns';

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  progress: number; // 0-100 的进度百分比
  totalSeconds: number;
}

/**
 * 计算距离目标日期的剩余时间
 */
export function calculateTimeRemaining(targetDate: Date): CountdownData {
  const now = new Date();
  const target = new Date(targetDate);
  
  if (now >= target) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      progress: 100,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  // 计算从高考备考开始的进度（假设从高三开始，即距离高考365天开始）
  const startDate = new Date(target);
  startDate.setFullYear(startDate.getFullYear() - 1);
  
  const totalDuration = target.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    progress,
    totalSeconds,
  };
}

/**
 * 格式化倒计时显示文本
 */
export function formatCountdownDisplay(data: CountdownData): {
  primary: string;
  secondary?: string;
  units: string;
} {
  if (data.isExpired) {
    return {
      primary: "已结束",
      units: "考试已结束"
    };
  }

  // 距离考试超过1天：只显示天数
  if (data.days > 0) {
    return {
      primary: data.days.toString(),
      units: "天"
    };
  }

  // 距离考试不足1天但超过1小时：显示小时和分钟
  if (data.hours > 0) {
    return {
      primary: data.hours.toString(),
      secondary: data.minutes.toString().padStart(2, '0'),
      units: "小时 分钟"
    };
  }

  // 距离考试不足1小时：显示分钟和秒
  return {
    primary: data.minutes.toString(),
    secondary: data.seconds.toString().padStart(2, '0'),
    units: "分钟 秒"
  };
}

/**
 * 获取进度百分比
 */
export function getProgressPercentage(startDate: Date, endDate: Date): number {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now <= start) return 0;
  if (now >= end) return 100;
  
  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  
  return Math.round((elapsed / total) * 100);
}

/**
 * 格式化日期显示
 */
export function formatDate(date: Date): string {
  return format(date, 'yyyy年MM月dd日');
}

/**
 * 格式化考试时间显示
 */
export function formatExamDateTime(date: Date): string {
  return format(date, 'yyyy年MM月dd日 HH:mm');
}

/**
 * 生成励志文案
 */
export function generateMotivationalText(days: number): string {
  if (days > 100) {
    return `距离高考还有 ${days} 天，每一天的努力都在为梦想积蓄力量！`;
  } else if (days > 30) {
    return `距离高考还有 ${days} 天，冲刺阶段，加油！`;
  } else if (days > 7) {
    return `距离高考还有 ${days} 天，最后的冲刺，坚持就是胜利！`;
  } else if (days > 0) {
    return `距离高考还有 ${days} 天，保持状态，相信自己！`;
  } else {
    return "高考已开始，发挥出最好的自己！";
  }
}
