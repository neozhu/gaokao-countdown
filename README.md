# 高考倒计时 🎓

> 专为高考学生设计的现代化倒计时应用，陪伴你走过备考的每一天

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ 功能特色

### 🕒 智能倒计时
- **动态显示精度**：根据剩余时间自动调整显示单位
  - 距离考试 > 1天：仅显示天数
  - 距离考试 < 1天但 > 1小时：显示小时、分钟
  - 距离考试 < 1小时：显示分钟、秒
- **实时更新**：每秒精确刷新
- **平滑动画**：优雅的数字变化过渡

### 💬 每日励志
- **中英文对照**：双语励志语录
- **每日更新**：基于日期算法的固定语录
- **手动刷新**：支持获取新的励志内容
- **分类标签**：不同主题的励志语录

### 📊 备考进度
- **可视化进度条**：直观显示备考进度
- **进度百分比**：精确的数值显示
- **里程碑标记**：25%、50%、75% 进度节点
- **悬停提示**：详细的时间信息

### 🎨 现代设计
- **Glassmorphism 风格**：半透明玻璃质感
- **3D 山景背景**：优美的视觉效果
- **响应式布局**：完美适配移动端和桌面端
- **明暗主题**：支持系统主题切换

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

### 构建生产版本
```bash
npm run build
npm run start
```

## 🛠 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4 + shadcn/ui
- **动画**: Framer Motion
- **状态管理**: React Hooks + Local Storage
- **主题**: next-themes
- **图标**: Lucide React
- **日期处理**: date-fns

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React 组件
│   ├── ui/                # shadcn/ui 基础组件
│   ├── countdown-timer.tsx # 倒计时组件
│   ├── quote-section.tsx  # 语录组件
│   └── ...                # 其他组件
├── lib/                   # 工具函数
│   ├── countdown.ts       # 倒计时逻辑
│   └── storage.ts         # 存储管理
├── hooks/                 # 自定义 Hooks
├── data/                  # 静态数据
└── docs/                  # 项目文档
```

## 🎯 核心功能

### 倒计时逻辑
- 精确的时间计算
- 智能显示格式化
- 进度百分比计算

### 数据管理
- 本地存储用户设置
- 类型安全的数据处理
- 默认值容错机制

### 用户体验
- 平滑的页面动画
- 直观的视觉反馈
- 移动端友好设计

## 🔮 未来功能

- [ ] **AI 励志语录**：使用 OpenAI 生成个性化内容
- [ ] **PWA 支持**：离线使用和桌面安装
- [ ] **自定义日期**：支持不同省份考试时间
- [ ] **分享功能**：生成二维码和社交分享
- [ ] **多语言支持**：国际化适配
- [ ] **数据统计**：学习时间和进度追踪

## 📱 预览

### 桌面端
- 优雅的大屏布局
- 丰富的视觉效果
- 完整的功能展示

### 移动端
- 简洁的移动界面
- 触摸友好的交互
- 优化的字体大小

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 本仓库
2. 创建功能分支
3. 提交变更
4. 创建 Pull Request

### 代码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 组件使用 PascalCase 命名
- 文件使用 kebab-case 命名

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 💖 支持

如果这个项目对你有帮助，欢迎给个 ⭐ Star！

---

**愿每一个努力的你都能圆梦高考！** 🌟
