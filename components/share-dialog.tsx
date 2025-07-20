'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { 
  Share2, 
  Copy, 
  QrCode, 
  Download,
  Check,
  Twitter,
  MessageCircle
} from 'lucide-react';
import { generateQRCode, copyToClipboard, getShareText } from '@/lib/share';
import { formatExamDateTime } from '@/lib/countdown';
import { motion } from 'framer-motion';
import { usePWA } from '@/hooks/use-pwa';

interface ShareDialogProps {
  examDate: Date;
  daysRemaining: number;
  className?: string;
}

export function ShareDialog({ examDate, daysRemaining, className }: ShareDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const { isInstallable, promptInstall } = usePWA();

  // 生成二维码
  const handleGenerateQR = async () => {
    if (qrCodeUrl) return; // 如果已生成，直接返回
    
    setIsGeneratingQR(true);
    try {
      const currentUrl = window.location.href;
      const qrUrl = await generateQRCode(currentUrl);
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('生成二维码失败:', error);
    } finally {
      setIsGeneratingQR(false);
    }
  };

  // 复制链接
  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    const success = await copyToClipboard(currentUrl);
    
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // 复制分享文本
  const handleCopyShareText = async () => {
    const examDateStr = formatExamDateTime(examDate);
    const shareText = getShareText(daysRemaining, examDateStr);
    const textWithUrl = shareText.replace('[链接]', window.location.href);
    
    const success = await copyToClipboard(textWithUrl);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // 社交分享
  const handleSocialShare = (platform: 'twitter' | 'wechat') => {
    const examDateStr = formatExamDateTime(examDate);
    const shareText = getShareText(daysRemaining, examDateStr);
    const currentUrl = window.location.href;
    
    if (platform === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
      window.open(twitterUrl, '_blank');
    } else if (platform === 'wechat') {
      // 微信分享需要特殊处理，这里只是复制内容
      handleCopyShareText();
    }
  };

  // 下载二维码
  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = '高考倒计时二维码.png';
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={`gap-2 ${className}`}
          onClick={() => setIsOpen(true)}
        >
          <Share2 className="w-4 h-4" />
          分享应用
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            分享高考倒计时
          </DialogTitle>
          <DialogDescription>
            分享给朋友，一起为高考加油！
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 分享统计信息 */}
          <Card className="p-4 bg-muted/30">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">
                {daysRemaining > 0 ? `${daysRemaining} 天` : '已开始'}
              </div>
              <div className="text-sm text-muted-foreground">
                距离高考还有
              </div>
              <div className="text-xs text-muted-foreground">
                {formatExamDateTime(examDate)}
              </div>
            </div>
          </Card>

          {/* 快速分享按钮 */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleCopyLink}
            >
              {copySuccess ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              复制链接
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={handleCopyShareText}
            >
              <MessageCircle className="w-4 h-4" />
              复制文案
            </Button>
          </div>

          {/* 社交分享 */}
          <div className="space-y-2">
            <div className="text-sm font-medium">社交分享</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => handleSocialShare('twitter')}
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => handleSocialShare('wechat')}
              >
                <MessageCircle className="w-4 h-4" />
                微信
              </Button>
            </div>
          </div>

          {/* 二维码生成 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">二维码分享</div>
              {qrCodeUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownloadQR}
                  className="gap-1 h-auto p-1 text-xs"
                >
                  <Download className="w-3 h-3" />
                  下载
                </Button>
              )}
            </div>

            <div className="flex flex-col items-center gap-3">
              {qrCodeUrl ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-white rounded-lg border"
                >
                  <Image 
                    src={qrCodeUrl} 
                    alt="分享二维码" 
                    width={128}
                    height={128}
                    className="w-32 h-32"
                  />
                </motion.div>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleGenerateQR}
                  disabled={isGeneratingQR}
                  className="gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  {isGeneratingQR ? '生成中...' : '生成二维码'}
                </Button>
              )}
            </div>
          </div>

          {/* PWA 安装 */}
          {isInstallable && (
            <div className="border-t pt-4">
              <div className="text-sm font-medium mb-2">安装应用</div>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={promptInstall}
              >
                <Download className="w-4 h-4" />
                添加到主屏幕
              </Button>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                安装后可离线使用，获得更好的体验
              </div>
            </div>
          )}

          {/* 提示信息 */}
          {copySuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-sm text-green-600 bg-green-50 dark:bg-green-900/20 py-2 px-4 rounded-lg"
            >
              ✅ 复制成功！
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
