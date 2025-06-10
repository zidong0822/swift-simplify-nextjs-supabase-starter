# 部署指南

## 部署选项

### 1. Vercel 部署（推荐）

1. 在 Vercel 上创建新项目
2. 连接 GitHub 仓库
3. 配置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - 其他必要的环境变量
4. 部署项目

### 2. Docker 部署

#### 构建镜像
```bash
docker build -t swift-simplify .
```

#### 运行容器
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_supabase_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key \
  swift-simplify
```

### 3. 自托管

#### 准备工作
1. 安装 Node.js
2. 安装 pnpm
3. 配置 nginx 或其他反向代理

#### 构建和运行
```bash
# 构建项目
pnpm build

# 启动服务
pnpm start
```

## 环境配置

### 生产环境变量

必要的环境变量：
1. 基本配置
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_SITE_URL`

2. Supabase 配置
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. 其他可选配置
   - `NEXT_PUBLIC_GA_ID`（Google Analytics）
   - `SENTRY_DSN`（错误跟踪）

### 安全考虑

1. 启用 HTTPS
2. 配置 CSP 头
3. 启用 rate limiting
4. 实施适当的 CORS 策略

## 数据库迁移

### 生产环境迁移
```bash
pnpm supabase migration up --prod
```

### 回滚策略
```bash
pnpm supabase migration down
```

## 监控

### 应用监控
1. 设置 Sentry 或类似工具
2. 配置性能监控
3. 设置警报阈值

### 服务器监控
1. CPU 使用率
2. 内存使用
3. 磁盘空间
4. 网络流量

## 备份策略

### 数据库备份
1. 启用 Supabase 自动备份
2. 设置定期手动备份
3. 验证备份完整性

### 文件备份
1. 配置静态文件备份
2. 设置日志备份
3. 存储配置文件备份

## 故障恢复

### 回滚流程
1. 识别问题
2. 执行回滚
3. 验证系统状态
4. 分析根本原因

### 应急响应
1. 建立事件响应团队
2. 准备应急方案
3. 进行定期演练

## 性能优化

### 前端优化
1. 启用压缩
2. 配置缓存策略
3. 优化资源加载

### 后端优化
1. 数据库索引优化
2. 查询性能优化
3. 缓存策略实施 