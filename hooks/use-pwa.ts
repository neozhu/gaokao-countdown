import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

/**
 * PWA 相关功能 Hook
 */
export function usePWA() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // 调试信息
    console.log('PWA Hook: 初始化中...');
    
    // 检测是否已安装
    const checkIfInstalled = () => {
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppMode = (window.navigator as any).standalone === true;
      const installed = isInStandaloneMode || isInWebAppMode;
      console.log('PWA Hook: 检查安装状态', { isInStandaloneMode, isInWebAppMode, installed });
      setIsInstalled(installed);
    };

    // 检测网络状态
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      console.log('PWA Hook: 网络状态', online);
      setIsOnline(online);
    };

    // 监听 beforeinstallprompt 事件
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('PWA Hook: beforeinstallprompt 事件触发', e);
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // 监听应用安装事件
    const handleAppInstalled = () => {
      console.log('PWA Hook: 应用已安装');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    checkIfInstalled();
    updateOnlineStatus();

    // 添加事件监听器
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // 调试：检查Service Worker状态
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        console.log('PWA Hook: Service Worker 已就绪');
      });
    } else {
      console.log('PWA Hook: 浏览器不支持 Service Worker');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // 触发安装提示
  const promptInstall = async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('安装提示失败:', error);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    isOnline,
    promptInstall,
  };
}
