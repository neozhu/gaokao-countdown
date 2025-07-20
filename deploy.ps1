# 高考倒计时应用 Docker 部署脚本 (PowerShell)

Write-Host "🚀 开始部署高考倒计时应用..." -ForegroundColor Green

# 检查 Docker 是否安装
try {
    docker --version | Out-Null
    Write-Host "✅ Docker 已安装" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker 未安装，请先安装 Docker Desktop" -ForegroundColor Red
    exit 1
}

# 检查 Docker Compose 是否可用
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose 已安装" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose 未安装，请先安装 Docker Compose" -ForegroundColor Red
    exit 1
}

# 停止现有容器
Write-Host "📦 停止现有容器..." -ForegroundColor Yellow
try {
    docker-compose down 2>$null
} catch {
    Write-Host "ℹ️ 没有运行中的容器" -ForegroundColor Blue
}

# 构建镜像
Write-Host "🔨 构建 Docker 镜像..." -ForegroundColor Yellow
docker-compose build --no-cache

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 镜像构建失败" -ForegroundColor Red
    exit 1
}

# 启动服务
Write-Host "🌟 启动服务..." -ForegroundColor Yellow
docker-compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 服务启动失败" -ForegroundColor Red
    exit 1
}

# 等待服务启动
Write-Host "⏳ 等待服务启动..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# 检查服务状态
Write-Host "🔍 检查服务状态..." -ForegroundColor Yellow
$status = docker-compose ps

if ($status -match "Up") {
    Write-Host "✅ 服务启动成功！" -ForegroundColor Green
    Write-Host "🌐 应用地址: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "📊 查看日志: docker-compose logs -f" -ForegroundColor Cyan
    Write-Host "🛑 停止服务: docker-compose down" -ForegroundColor Cyan
} else {
    Write-Host "❌ 服务启动失败，请查看日志:" -ForegroundColor Red
    docker-compose logs
    exit 1
}

Write-Host "🎉 部署完成！" -ForegroundColor Green
