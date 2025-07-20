# 高考倒计时应用 - 快速开始指南

## 🎯 项目概述

这是一个专为高考学生设计的现代化倒计时应用，提供智能倒计时、每日励志语录、备考进度跟踪等功能。

## 🚀 快速开始

### 1. 环境准备
确保你的系统已安装：
- Node.js 18 或更高版本
- npm、yarn 或 pnpm 包管理器

### 2. 安装项目
```bash
# 克隆项目
git clone https://github.com/your-username/gaokao-countdown.git
cd gaokao-countdown

# 安装依赖
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 即可看到应用运行效果。

## 📋 功能说明

### 核心功能
1. **智能倒计时显示**
   - 自动根据剩余时间调整显示精度
   - 实时更新，平滑动画效果

2. **每日励志语录**
   - 中英文对照显示
   - 支持手动刷新获取新内容

3. **备考进度条**
   - 可视化显示备考进度
   - 悬停显示详细信息

4. **响应式设计**
   - 移动端优先，自适应各种屏幕
   - 支持明暗主题切换

## 🛠 自定义配置

### 修改默认考试日期
编辑 `data/exam-dates.json` 文件：
```json
{
  "default": {
    "date": "2026-06-07T09:00:00+08:00",
    "name": "全国统一高考"
  }
}
```

### 添加自定义励志语录
编辑 `data/quotes.json` 文件：
```json
{
  "id": 11,
  "chinese": "你的自定义中文语录",
  "english": "Your custom English quote",
  "category": "custom"
}
```

### 修改主题颜色
编辑 `app/globals.css` 文件中的 CSS 变量：
```css
:root {
  --primary: your-color;
  --secondary: your-color;
}
```

## 🎨 组件使用

### 使用倒计时组件
```tsx
import { CountdownTimer } from '@/components/countdown-timer';

function MyPage() {
  const examDate = new Date('2026-06-07T09:00:00+08:00');
  
  return (
    <CountdownTimer 
      targetDate={examDate}
      className="w-full"
    />
  );
}
```

### 使用语录组件
```tsx
import { QuoteSection } from '@/components/quote-section';

function MyPage() {
  return <QuoteSection className="w-full" />;
}
```

## 🔧 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 类型检查
npx tsc --noEmit
```

## 📦 添加新功能

### 1. 添加新的 shadcn/ui 组件
```bash
npx shadcn@latest add [component-name]
```

### 2. 创建新的 Hook
在 `hooks/` 目录下创建新文件：
```tsx
// hooks/use-my-feature.ts
import { useState, useEffect } from 'react';

export function useMyFeature() {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // 你的逻辑
  }, []);
  
  return { state, setState };
}
```

### 3. 创建新的组件
在 `components/` 目录下创建新文件：
```tsx
// components/my-component.tsx
'use client';

import { Card } from '@/components/ui/card';

interface MyComponentProps {
  className?: string;
}

export function MyComponent({ className }: MyComponentProps) {
  return (
    <Card className={`glass-card ${className}`}>
      {/* 你的内容 */}
    </Card>
  );
}
```

## 🎯 扩展功能建议

### 1. 添加日期选择器
实现自定义考试日期功能：
- 使用 shadcn/ui 的 Popover + Calendar 组件
- 支持多省份考试时间预设
- 数据保存到 localStorage

### 2. 实现分享功能
添加分享和二维码生成：
- 复制链接到剪贴板
- 生成当前页面二维码
- 社交媒体分享模板

### 3. 集成 AI 功能
使用 Vercel AI SDK 生成个性化语录：
- 创建 `/api/quote` 路由
- 集成 OpenAI API
- 实现中英文翻译

### 4. PWA 支持
实现渐进式 Web 应用：
- 配置 Service Worker
- 添加离线缓存
- 支持桌面安装

## 🐛 常见问题

### Q: 如何修改默认考试日期？
A: 编辑 `data/exam-dates.json` 文件中的 `default.date` 字段。

### Q: 如何添加新的励志语录？
A: 在 `data/quotes.json` 文件中添加新的语录对象。

### Q: 如何自定义主题颜色？
A: 修改 `app/globals.css` 文件中的 CSS 变量。

### Q: 如何部署到生产环境？
A: 推荐使用 Vercel：
```bash
npm run build
# 部署到 Vercel
```

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui 文档](https://ui.shadcn.com/)
- [Framer Motion 文档](https://www.framer.com/motion/)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/my-feature`
3. 提交更改: `git commit -am 'Add my feature'`
4. 推送分支: `git push origin feature/my-feature`
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

愿每个努力的你都能圆梦高考！🌟
