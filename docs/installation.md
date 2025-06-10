# 安装指南

## 前置要求

- Node.js 18.0.0 或更高版本
- pnpm 8.0.0 或更高版本
- Docker（可选，用于本地开发）

## 安装步骤

### 1. 克隆仓库

```bash
git clone <repository-url>
cd swift-simplify-nextjs-supabase-starter
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 环境配置

1. 复制环境变量模板：
```bash
cp .env.example .env.local
```

2. 在 Supabase 中创建新项目

3. 更新环境变量：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- 其他必要的环境变量

### 4. 数据库设置

1. 安装 Supabase CLI
2. 运行数据库迁移：
```bash
pnpm supabase migration up
```

### 5. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000 查看应用程序。

## Docker 部署

1. 构建镜像：
```bash
docker build -t swift-simplify .
```

2. 运行容器：
```bash
docker run -p 3000:3000 swift-simplify
```

## 常见问题

### 数据库连接问题

确保：
1. Supabase 项目已创建
2. 环境变量正确配置
3. 数据库迁移已运行

### 构建错误

1. 清除构建缓存：
```bash
pnpm clean
```

2. 重新安装依赖：
```bash
pnpm install
```

## 下一步

- 查看 [开发指南](./development.md)
- 了解 [部署流程](./deployment.md)
- 阅读 [贡献指南](./contributing.md) 