# 开发指南

## 开发环境设置

### 编辑器配置

推荐使用 VS Code 并安装以下插件：
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- PostCSS Language Support

### 代码规范

请参考 [代码风格指南](../.cursor/rules/code-style.mdc) 了解详细的代码规范。

## 项目结构

### 页面路由

- `app/` 目录使用 Next.js 14 的 App Router
- 每个路由都是一个目录
- 使用 loading.tsx 和 error.tsx 处理加载状态和错误

### 组件开发

参考 [组件开发指南](../.cursor/rules/components.mdc) 了解组件开发的最佳实践。

### 状态管理

1. 本地状态：
   - 使用 `useState` 和 `useReducer`
   - 避免不必要的状态

2. 全局状态：
   - 使用 React Context
   - 适当时使用 Zustand

### 数据获取

1. 服务器组件：
   - 直接使用 Supabase 客户端
   - 实现数据预取

2. 客户端组件：
   - 使用自定义 hooks
   - 实现适当的加载状态
   - 处理错误情况

## 测试

### 单元测试
```bash
pnpm test
```

### E2E 测试
```bash
pnpm test:e2e
```

### 组件测试
```bash
pnpm test:component
```

## 性能优化

1. 图片优化：
   - 使用 Next.js Image 组件
   - 适当的图片格式和大小

2. 代码分割：
   - 使用动态导入
   - 实现路由级别的代码分割

3. 缓存策略：
   - 实现适当的缓存控制
   - 使用 SWR 或 React Query

## 调试

### 开发工具

1. React Developer Tools
2. Redux DevTools（如果使用）
3. Supabase Dashboard

### 日志记录

- 使用适当的日志级别
- 在生产环境中使用结构化日志
- 实现错误跟踪

## CI/CD

### 提交规范

使用约定式提交：
- feat: 新功能
- fix: 修复
- docs: 文档更新
- style: 代码风格更改
- refactor: 重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

### 部署流程

1. 开发环境：
   - 自动部署到开发环境
   - 运行测试套件

2. 生产环境：
   - 手动触发部署
   - 执行完整的测试
   - 进行性能检查 