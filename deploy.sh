#!/bin/bash

# 高考倒计时应用 Docker 部署脚本

set -e

echo "🚀 开始部署高考倒计时应用..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 停止现有容器
echo "📦 停止现有容器..."
docker-compose down 2>/dev/null || true

# 构建镜像
echo "🔨 构建 Docker 镜像..."
docker-compose build --no-cache

# 启动服务
echo "🌟 启动服务..."
docker-compose up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
if docker-compose ps | grep -q "Up"; then
    echo "✅ 服务启动成功！"
    echo "🌐 应用地址: http://localhost:3000"
    echo "📊 查看日志: docker-compose logs -f"
    echo "🛑 停止服务: docker-compose down"
else
    echo "❌ 服务启动失败，请查看日志:"
    docker-compose logs
    exit 1
fi

echo "🎉 部署完成！"
