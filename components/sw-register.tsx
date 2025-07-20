'use client';

import { useEffect } from 'react';

export function SWRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker 注册成功:', registration);
          
          // 检查更新
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('Service Worker 更新可用');
                  // 可以在这里显示更新提示
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker 注册失败:', error);
        });

      // 监听 Service Worker 控制器变化
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker 控制器已更新');
        // 可以在这里刷新页面或提示用户
      });
    }
  }, []);

  return null; // 这个组件不渲染任何内容
}
