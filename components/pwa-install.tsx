'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Smartphone, Monitor, X, Wifi, WifiOff } from 'lucide-react';
import { usePWA } from '@/hooks/use-pwa';

interface PWAInstallProps {
  className?: string;
}

export function PWAInstall({ className }: PWAInstallProps) {
  const { isInstallable, isInstalled, isOnline, promptInstall } = usePWA();
  const [showDialog, setShowDialog] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [showManualInstall, setShowManualInstall] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    
    try {
      const success = await promptInstall();
      if (success) {
        setShowDialog(false);
      }
    } catch (error) {
      console.error('安装失败:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  // 如果已安装，显示状态指示器
  if (isInstalled) {
    return (
      <div className={`flex items-center gap-2 text-sm text-green-600 dark:text-green-400 ${className}`}>
        <Smartphone className="h-4 w-4" />
        <span>已安装到设备</span>
        {!isOnline && (
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <WifiOff className="h-3 w-3" />
            <span className="text-xs">离线模式</span>
          </div>
        )}
      </div>
    );
  }

  // 始终显示安装按钮，提供手动安装指引
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (isInstallable) {
            setShowDialog(true);
          } else {
            setShowManualInstall(true);
          }
        }}
        className={`gap-2 ${className}`}
      >
        <Download className="h-4 w-4" />
        {isInstallable ? '安装应用' : '安装指南'}
      </Button>

      {/* 自动安装对话框 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              安装高考倒计时
            </DialogTitle>
            <DialogDescription>
              将应用安装到您的设备上，享受更好的使用体验
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* 网络状态提示 */}
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              isOnline 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
            }`}>
              {isOnline ? (
                <Wifi className="h-4 w-4" />
              ) : (
                <WifiOff className="h-4 w-4" />
              )}
              <span className="text-sm">
                {isOnline ? '网络连接正常' : '当前离线，应用仍可正常使用'}
              </span>
            </div>

            {/* 功能特点 */}
            <div className="grid gap-3">
              <Card className="p-3">
                <div className="flex items-start gap-3">
                  <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">移动端优化</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      原生应用般的流畅体验，支持全屏显示
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-3">
                <div className="flex items-start gap-3">
                  <WifiOff className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">离线可用</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      无网络时也能查看倒计时和励志语录
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-3">
                <div className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">多设备同步</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      在手机、平板、电脑上都能使用
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* 安装步骤提示 */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>安装后您可以：</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li>从桌面或应用列表快速启动</li>
                <li>接收倒计时提醒通知</li>
                <li>享受更快的加载速度</li>
                <li>无网络时继续使用核心功能</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="w-full sm:w-auto"
            >
              <X className="h-4 w-4 mr-2" />
              暂不安装
            </Button>
            <Button
              onClick={handleInstall}
              disabled={isInstalling}
              className="w-full sm:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              {isInstalling ? '安装中...' : '立即安装'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 手动安装指南对话框 */}
      <Dialog open={showManualInstall} onOpenChange={setShowManualInstall}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              PWA安装指南
            </DialogTitle>
            <DialogDescription>
              按照以下步骤手动安装应用到您的设备
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-sm space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  🖥️ 桌面浏览器 (Chrome/Edge)
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-200 text-xs">
                  <li>点击地址栏右侧的安装图标 📲</li>
                  <li>或点击浏览器菜单 → &ldquo;安装高考倒计时&rdquo;</li>
                  <li>确认安装即可添加到桌面</li>
                </ol>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                  📱 Android (Chrome)
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-green-800 dark:text-green-200 text-xs">
                  <li>点击浏览器菜单 (⋮)</li>
                  <li>选择&ldquo;添加到主屏幕&rdquo;</li>
                  <li>确认安装到桌面</li>
                </ol>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                  🍎 iOS (Safari)
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-purple-800 dark:text-purple-200 text-xs">
                  <li>点击底部分享按钮 📤</li>
                  <li>选择&ldquo;添加到主屏幕&rdquo;</li>
                  <li>确认添加即可</li>
                </ol>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">安装后的优势：</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li>独立应用窗口，更专注的学习体验</li>
                <li>离线使用，无网络时也能查看倒计时</li>
                <li>快速启动，一键从桌面打开</li>
                <li>推送通知，重要提醒不错过</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowManualInstall(false)}
              className="w-full"
            >
              我知道了
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
