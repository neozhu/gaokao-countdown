import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用 standalone 输出模式以支持 Docker 部署
  output: 'standalone',
  // 可选：压缩图片
  images: {
    unoptimized: false,
  },
  // 可选：开启实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react'],
  }
};

export default nextConfig;
