import QRCode from 'qrcode';

/**
 * 生成二维码
 */
export async function generateQRCode(url: string): Promise<string> {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('生成二维码失败:', error);
    throw new Error('生成二维码失败');
  }
}

/**
 * 复制文本到剪贴板
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案：使用传统的 document.execCommand
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';
      
      document.body.prepend(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        return true;
      } catch (error) {
        console.error('复制失败:', error);
        return false;
      } finally {
        textArea.remove();
      }
    }
  } catch (error) {
    console.error('复制到剪贴板失败:', error);
    return false;
  }
}

/**
 * 生成分享文本
 */
export function getShareText(days: number, examDate: string): string {
  if (days > 0) {
    return `🎓 距离高考还有 ${days} 天！\n⏰ 考试时间：${examDate}\n💪 每一天都是新的开始，加油！\n\n📱 高考倒计时应用：[链接]`;
  } else {
    return `🎓 高考进行中！\n💪 发挥出最好的自己！\n\n📱 高考倒计时应用：[链接]`;
  }
}

/**
 * 检测设备类型
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|tablet|android(?!.*mobile)/i.test(userAgent);
  
  if (isMobile && !isTablet) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
}

/**
 * 检测是否支持 PWA 安装
 */
export function isPWAInstallable(): boolean {
  if (typeof window === 'undefined') return false;
  
  // 检测是否已经在 PWA 环境中运行
  const isInPWA = window.matchMedia('(display-mode: standalone)').matches;
  
  // 检测浏览器是否支持 PWA
  const supportsPWA = 'serviceWorker' in navigator && 'PushManager' in window;
  
  return supportsPWA && !isInPWA;
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
