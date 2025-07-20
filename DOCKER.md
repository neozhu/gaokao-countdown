# Docker 部署指南

## 前提条件

确保您的系统已安装：
- Docker
- Docker Compose

## 快速开始

### 1. 基本部署（仅应用）

```bash
# 构建并启动应用
docker-compose up -d

# 查看日志
docker-compose logs -f gaokao-countdown

# 停止应用
docker-compose down
```

应用将在 http://localhost:3000 上运行。

### 2. 带 Nginx 反向代理的部署

```bash
# 启动应用和 Nginx
docker-compose --profile nginx up -d

# 查看所有服务状态
docker-compose ps

# 停止所有服务
docker-compose --profile nginx down
```

应用将通过 Nginx 在 http://localhost 上运行。

## 环境变量配置

如果您的应用需要环境变量，请创建 `.env.production` 文件：

```bash
# 复制示例环境变量文件
cp .env.example .env.production

# 编辑环境变量
# 然后在 docker-compose.yml 中添加：
env_file:
  - .env.production
```

## 生产环境部署建议

### 1. 使用外部数据库（如果需要）

```yaml
services:
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: gaokao
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - gaokao-network

volumes:
  postgres_data:
```

### 2. SSL 配置

如果使用 Nginx 并需要 SSL：

1. 将 SSL 证书放在 `./ssl/` 目录下
2. 更新 `nginx.conf` 以包含 SSL 配置

### 3. 监控和日志

```bash
# 实时查看日志
docker-compose logs -f

# 查看容器状态
docker-compose ps

# 检查容器健康状态
docker-compose exec gaokao-countdown curl http://localhost:3000
```

## 故障排除

### 常见问题

1. **端口占用**：如果 3000 端口被占用，修改 docker-compose.yml 中的端口映射

2. **构建失败**：检查 Node.js 版本和依赖项

3. **权限问题**：确保 Docker 有足够的权限访问项目目录

### 调试命令

```bash
# 进入容器
docker-compose exec gaokao-countdown sh

# 重新构建镜像
docker-compose up -d --build

# 查看构建过程
docker-compose build --no-cache
```

## 性能优化

1. **多阶段构建**：Dockerfile 已配置多阶段构建以减小镜像大小
2. **静态资源缓存**：Nginx 配置了适当的缓存策略
3. **Gzip 压缩**：已在 Nginx 中启用
4. **健康检查**：容器包含健康检查以确保服务正常运行

## 更新部署

```bash
# 拉取最新代码
git pull

# 重新构建并部署
docker-compose up -d --build
```
