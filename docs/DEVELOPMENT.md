# 高考倒计时应用 - 开发任务计划

## 📋 项目概览

**项目名称**: 高考倒计时 (Gaokao Countdown)  
**技术栈**: Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui + Vercel AI SDK  
**开发周期**: 预计 2-3 周  
**团队规模**: 1-2 人  

## 🎯 开发里程碑

### Phase 1: 基础环境搭建 (2-3天)
- [x] Next.js 项目初始化
- [x] shadcn/ui 配置
- [ ] 项目结构优化
- [ ] 基础依赖安装

### Phase 2: 核心功能开发 (5-7天)
- [ ] 倒计时核心逻辑
- [ ] 响应式布局
- [ ] 基础组件开发
- [ ] 静态励志语录

### Phase 3: 高级功能 (4-5天)
- [ ] AI 励志语录生成
- [ ] PWA 支持
- [ ] 分享功能
- [ ] 自定义日期选择

### Phase 4: 优化与测试 (2-3天)
- [ ] 性能优化
- [ ] 兼容性测试
- [ ] 用户体验优化
- [ ] 部署配置

## 📦 依赖包安装计划

### 必需依赖
```bash
# shadcn/ui 组件 (按需安装)
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add progress
npx shadcn@latest add popover
npx shadcn@latest add calendar
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add alert
npx shadcn@latest add tooltip

# AI SDK 和相关依赖
npm install ai @ai-sdk/openai
npm install zod  # 用于类型验证

# PWA 支持
npm install next-pwa
npm install workbox-webpack-plugin

# 其他工具库
npm install date-fns  # 日期处理
npm install qrcode    # 二维码生成
npm install next-themes  # 主题切换
npm install framer-motion  # 动画效果
```

### 开发依赖
```bash
npm install -D @types/qrcode
npm install -D @types/node
```

## 🗂 文件结构设计

```
gaokao-countdown/
├── app/
│   ├── layout.tsx              # 根布局
│   ├── page.tsx                # 主页
│   ├── globals.css             # 全局样式
│   ├── manifest.ts             # PWA 配置
│   └── api/
│       ├── quote/route.ts      # 励志语录 API
│       └── exam-dates/route.ts # 考试日期 API
├── components/
│   ├── ui/                     # shadcn/ui 组件
│   ├── countdown-timer.tsx     # 倒计时组件
│   ├── quote-section.tsx       # 励志语录组件
│   ├── date-picker.tsx         # 日期选择器
│   ├── share-dialog.tsx        # 分享对话框
│   ├── site-header.tsx         # 页面头部
│   ├── site-footer.tsx         # 页面底部
│   └── background.tsx          # 背景组件
├── lib/
│   ├── utils.ts                # 工具函数
│   ├── countdown.ts            # 倒计时逻辑
│   ├── storage.ts              # 本地存储
│   ├── quotes.ts               # 语录数据
│   └── exam-dates.ts           # 考试日期数据
├── hooks/
│   ├── use-countdown.ts        # 倒计时 Hook
│   ├── use-local-storage.ts    # 本地存储 Hook
│   └── use-pwa.ts              # PWA Hook
├── data/
│   ├── quotes.json             # 静态励志语录
│   └── exam-dates.json         # 各省考试日期
├── public/
│   ├── icons/                  # PWA 图标
│   ├── manifest.json           # PWA 清单
│   └── sw.js                   # Service Worker
└── docs/
    ├── PRD.md                  # 产品需求文档
    └── DEVELOPMENT.md          # 开发计划文档
```

## 📋 详细任务分解

### 🚀 任务 1: 环境搭建与配置 (Day 1-2)

#### 1.1 项目初始化
- [x] ✅ Next.js 项目已创建
- [x] ✅ TypeScript 配置完成
- [x] ✅ Tailwind CSS 配置完成
- [x] ✅ shadcn/ui 基础配置完成

#### 1.2 依赖安装
```bash
# 安装所需的 shadcn/ui 组件
npx shadcn@latest add button card progress popover calendar dialog dropdown-menu alert tooltip

# 安装其他依赖
npm install ai @ai-sdk/openai zod date-fns qrcode next-themes framer-motion next-pwa
npm install -D @types/qrcode
```

#### 1.3 项目结构创建
- [ ] 创建 components 目录结构
- [ ] 创建 lib 目录和工具函数
- [ ] 创建 hooks 目录
- [ ] 创建 data 目录和静态数据
- [ ] 设置 PWA 基础配置

**预期产出**: 完整的项目脚手架和开发环境

---

### 🎨 任务 2: 基础 UI 框架 (Day 3-4)

#### 2.1 布局组件开发
- [ ] **SiteHeader** 组件
  ```tsx
  // components/site-header.tsx
  - Logo/标题显示
  - 设置下拉菜单 (语言切换、主题切换、关于)
  - 响应式导航
  ```

- [ ] **SiteFooter** 组件
  ```tsx
  // components/site-footer.tsx
  - 版权信息
  - 版本号显示
  - 主题切换开关
  ```

- [ ] **Background** 组件
  ```tsx
  // components/background.tsx
  - 3D 山景背景
  - Glassmorphism 效果
  - 渐变动画
  ```

#### 2.2 主页面布局
- [ ] 更新 `app/layout.tsx`
  - 添加主题提供者
  - 设置全局字体
  - 配置 PWA meta 标签

- [ ] 重构 `app/page.tsx`
  - 实现设计稿布局
  - 集成各个区块组件
  - 响应式网格系统

**预期产出**: 完整的页面布局框架和视觉设计

---

### ⏰ 任务 3: 倒计时核心功能 (Day 5-6)

#### 3.1 倒计时逻辑开发
- [ ] **倒计时 Hook**
  ```tsx
  // hooks/use-countdown.ts
  interface CountdownData {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    progress: number; // 0-100 的进度百分比
  }
  ```

- [ ] **倒计时工具函数**
  ```tsx
  // lib/countdown.ts
  - calculateTimeRemaining(targetDate: Date): CountdownData
  - formatCountdownDisplay(data: CountdownData): string
  - getProgressPercentage(startDate: Date, endDate: Date): number
  ```

#### 3.2 倒计时组件开发
- [ ] **CountdownTimer** 组件
  ```tsx
  // components/countdown-timer.tsx
  - 大数字显示 (使用 Tailwind 大字体)
  - 智能单位显示逻辑:
    * > 1天: 仅显示天数
    * < 1天 但 > 1小时: 显示天、时、分
    * < 1小时: 显示时、分、秒
  - 动画过渡效果
  - 响应式字体大小
  ```

#### 3.3 辅助信息组件
- [ ] **AssistiveText** 组件
  ```tsx
  // components/assistive-text.tsx
  - "还剩 X 天" 文案显示
  - 今日日期显示
  - 考试日期显示
  - 文案国际化支持
  ```

- [ ] **ProgressBar** 组件
  ```tsx
  // components/progress-bar.tsx
  - 使用 shadcn/ui Progress 组件
  - 显示备考进度百分比
  - Tooltip 显示起止日期
  - 渐变色进度条
  ```

**预期产出**: 完整可用的倒计时功能模块

---

### 💬 任务 4: 励志语录功能 (Day 7-8)

#### 4.1 静态语录系统
- [ ] **语录数据准备**
  ```json
  // data/quotes.json
  [
    {
      "id": 1,
      "chinese": "宝剑锋从磨砺出，梅花香自苦寒来。",
      "english": "The sharp edge of a sword comes from constant grinding, and the fragrance of a plum blossom comes from enduring bitter cold.",
      "category": "perseverance"
    }
  ]
  ```

- [ ] **QuoteSection** 组件
  ```tsx
  // components/quote-section.tsx
  - 中英文对照显示
  - 每日更新逻辑 (基于日期)
  - 刷新按钮
  - 卡片式布局
  ```

#### 4.2 AI 语录生成 (高级功能)
- [ ] **AI 语录 API**
  ```tsx
  // app/api/quote/route.ts
  - 集成 Vercel AI SDK
  - 调用 OpenAI API 生成励志语录
  - 中英文翻译
  - 结果缓存机制
  ```

- [ ] **语录生成 Hook**
  ```tsx
  // hooks/use-quote.ts
  - 检查日期变化
  - 缓存管理
  - 错误处理
  - 加载状态
  ```

**预期产出**: 智能励志语录系统

---

### 📅 任务 5: 日期选择与设置 (Day 9-10)

#### 5.1 考试日期数据
- [ ] **考试日期配置**
  ```json
  // data/exam-dates.json
  {
    "default": {
      "date": "2026-06-07T09:00:00+08:00",
      "name": "全国统一高考"
    },
    "provinces": {
      "beijing": {
        "date": "2026-06-07T09:00:00+08:00",
        "name": "北京高考"
      }
    }
  }
  ```

#### 5.2 日期选择组件
- [ ] **DatePicker** 组件
  ```tsx
  // components/date-picker.tsx
  - 使用 Popover + Calendar 组件
  - 省份预设选择
  - 自定义日期输入
  - 本地存储保存
  ```

- [ ] **本地存储 Hook**
  ```tsx
  // hooks/use-local-storage.ts
  - 类型安全的存储读写
  - 默认值处理
  - 序列化/反序列化
  ```

**预期产出**: 完整的日期设置功能

---

### 🔗 任务 6: 分享与 PWA 功能 (Day 11-12)

#### 6.1 分享功能开发
- [ ] **ShareDialog** 组件
  ```tsx
  // components/share-dialog.tsx
  - 复制链接功能
  - 二维码生成 (使用 qrcode 库)
  - 社交分享模板
  - 分享成功反馈
  ```

- [ ] **分享工具函数**
  ```tsx
  // lib/share.ts
  - generateQRCode(url: string): Promise<string>
  - copyToClipboard(text: string): Promise<boolean>
  - getShareText(days: number): string
  ```

#### 6.2 PWA 配置
- [ ] **PWA 配置文件**
  ```typescript
  // app/manifest.ts
  - 应用图标配置
  - 显示模式设置
  - 主题颜色配置
  ```

- [ ] **Service Worker**
  ```javascript
  // public/sw.js
  - 缓存策略配置
  - 离线页面支持
  - 资源预缓存
  ```

- [ ] **PWA Hook**
  ```tsx
  // hooks/use-pwa.ts
  - 安装提示逻辑
  - 更新检测
  - 离线状态检测
  ```

**预期产出**: 完整的分享和 PWA 功能

---

### 🎨 任务 7: 视觉优化与动画 (Day 13-14)

#### 7.1 Glassmorphism 效果
- [ ] **玻璃质感样式**
  ```css
  /* app/globals.css */
  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  ```

#### 7.2 动画效果
- [ ] **过渡动画**
  - 倒计时数字变化动画
  - 页面切换过渡
  - 按钮悬停效果
  - 卡片出现动画

#### 7.3 主题系统
- [ ] **主题配置**
  ```tsx
  // 使用 next-themes
  - 明暗主题切换
  - 系统主题检测
  - 主题持久化
  ```

**预期产出**: 精美的视觉效果和用户体验

---

### 🧪 任务 8: 测试与优化 (Day 15-16)

#### 8.1 功能测试
- [ ] **倒计时准确性测试**
  - 边界条件测试
  - 时区处理测试
  - 性能测试

- [ ] **用户交互测试**
  - 分享功能测试
  - PWA 安装测试
  - 响应式布局测试

#### 8.2 性能优化
- [ ] **代码分割**
  - 路由级别代码分割
  - 组件懒加载
  - 第三方库优化

- [ ] **SEO 优化**
  - Meta 标签完善
  - 结构化数据
  - Open Graph 配置

**预期产出**: 高质量的生产就绪应用

---

### 🚀 任务 9: 部署与发布 (Day 17)

#### 9.1 部署配置
- [ ] **Vercel 部署**
  - 环境变量配置
  - 构建优化配置
  - 域名绑定

- [ ] **CI/CD 配置**
  - GitHub Actions 工作流
  - 自动化测试
  - 自动部署

#### 9.2 监控配置
- [ ] **性能监控**
  - Vercel Analytics
  - Web Vitals 跟踪
  - 错误监控

**预期产出**: 线上可访问的完整应用

---

## 🔧 开发工具与命令

### 常用开发命令
```bash
# 开发环境启动
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 安装 shadcn/ui 组件
npx shadcn@latest add [component-name]

# 类型检查
npx tsc --noEmit
```

### Git 工作流
```bash
# 功能分支开发
git checkout -b feature/countdown-timer
git add .
git commit -m "feat: implement countdown timer component"
git push origin feature/countdown-timer

# 主分支合并
git checkout main
git merge feature/countdown-timer
git push origin main
```

## 📊 质量指标

### 性能目标
- [ ] Lighthouse Performance Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### 代码质量
- [ ] TypeScript 严格模式
- [ ] ESLint 零警告
- [ ] 组件单元测试覆盖率 > 80%
- [ ] 代码复用率 > 70%

### 用户体验
- [ ] 移动端适配 100%
- [ ] 无障碍访问支持
- [ ] 多浏览器兼容性
- [ ] PWA 功能完整

## 🚨 风险与应对

### 技术风险
1. **AI API 调用限制**
   - 风险: OpenAI API 配额或费用问题
   - 应对: 实现本地语录备份机制

2. **PWA 兼容性**
   - 风险: 某些浏览器 PWA 支持不完整
   - 应对: 渐进式功能降级

3. **性能问题**
   - 风险: 倒计时频繁更新导致性能问题
   - 应对: 优化更新频率和渲染策略

### 时间风险
1. **功能复杂度**
   - 风险: AI 功能开发超时
   - 应对: 优先实现核心功能，AI 功能后期迭代

2. **视觉效果**
   - 风险: Glassmorphism 效果实现耗时
   - 应对: 使用现有 CSS 库或简化设计

## 📈 后续迭代计划

### v1.1 增强功能
- [ ] 多语言国际化 (i18n)
- [ ] 用户数据云同步
- [ ] 更多励志语录分类
- [ ] 自定义背景主题

### v1.2 高级功能
- [ ] 学习计划管理
- [ ] 科目倒计时
- [ ] 成绩目标设定
- [ ] 学习数据统计

### v2.0 大版本
- [ ] 用户系统
- [ ] 社区功能
- [ ] 学习资源推荐
- [ ] 家长监控功能

---

**文档版本**: v1.0  
**最后更新**: 2025-07-20  
**维护者**: 开发团队
