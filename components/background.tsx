'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BackgroundProps {
  className?: string;
}

export function Background({ className }: BackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // 预加载背景图片
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = '/bg.png';

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* 背景图片层 */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: imageLoaded ? 1 : 0, 
          scale: 1 
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        }}
      />
      
      {/* 备用渐变背景 - 图片加载前显示 */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: imageLoaded ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
      />
      
      {/* 背景图片遮罩层 - 确保内容可读性 */}
      <div className="absolute inset-0 bg-white/50 dark:bg-black/40" />
      
      {/* 渐变叠加层 - 增强视觉效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20 dark:via-black/5 dark:to-black/20" />
      
      {/* 山景 SVG 背景 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-64 md:h-80"
      >
        <svg
          viewBox="0 0 1200 320"
          className="w-full h-full fill-current text-primary/10"
          preserveAspectRatio="none"
        >
          <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1200,224,1248,192,1296,165.3C1344,139,1392,117,1440,122.7C1488,128,1536,160,1584,165.3C1632,171,1680,149,1728,133.3C1776,117,1824,107,1872,112C1920,117,1968,139,2016,149.3C2064,160,2112,160,2160,138.7C2208,117,2256,75,2304,58.7C2352,43,2400,53,2448,80C2496,107,2544,149,2592,154.7C2640,160,2688,128,2736,122.7C2784,117,2832,139,2880,149.3C2928,160,2976,160,3024,149.3C3072,139,3120,117,3168,117.3C3216,117,3264,139,3312,144C3360,149,3408,139,3432,133.3L3456,128L3456,320L3432,320C3408,320,3360,320,3312,320C3264,320,3216,320,3168,320C3120,320,3072,320,3024,320C2976,320,2928,320,2880,320C2832,320,2784,320,2736,320C2688,320,2640,320,2592,320C2544,320,2496,320,2448,320C2400,320,2352,320,2304,320C2256,320,2208,320,2160,320C2112,320,2064,320,2016,320C1968,320,1920,320,1872,320C1824,320,1776,320,1728,320C1680,320,1632,320,1584,320C1536,320,1488,320,1440,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </motion.div>

      {/* 浮动的装饰元素 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 大圆形 */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        
        {/* 中圆形 */}
        <motion.div
          animate={{
            y: [0, 25, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg"
        />
        
        {/* 小圆形 */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/2 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-md"
        />
      </div>

      {/* Glassmorphism 效果层 */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/5 dark:bg-black/5" />
    </div>
  );
}
