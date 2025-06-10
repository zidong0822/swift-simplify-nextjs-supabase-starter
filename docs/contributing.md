# 贡献指南

## 行为准则

我们希望创建一个友好和包容的环境。请：
- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性的批评
- 关注对社区最有利的事情

## 如何贡献

### 1. 提交 Issue

在提交 Issue 之前：
1. 检查是否已存在相似的 Issue
2. 使用 Issue 模板
3. 提供详细的描述和复现步骤

### 2. 提交代码

#### 开发流程

1. Fork 仓库
2. 创建功能分支：
```bash
git checkout -b feature/your-feature-name
```

3. 提交更改：
```bash
git add .
git commit -m "feat: add your feature"
```

4. 推送到你的 Fork：
```bash
git push origin feature/your-feature-name
```

5. 创建 Pull Request

#### 提交规范

使用约定式提交消息：

- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档更新
- `style`: 代码风格更改
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：
```
feat(auth): add email verification
```

### 3. 代码审查

#### 审查清单

1. 代码质量
   - 遵循代码规范
   - 适当的测试覆盖
   - 性能考虑

2. 文档
   - 更新相关文档
   - 添加必要的注释
   - 更新 CHANGELOG

3. 测试
   - 单元测试
   - 集成测试
   - E2E 测试（如需要）

## 开发环境设置

1. 克隆仓库：
```bash
git clone <your-fork-url>
cd swift-simplify-nextjs-supabase-starter
```

2. 安装依赖：
```bash
pnpm install
```

3. 创建开发分支：
```bash
git checkout -b feature/your-feature
```

## 测试指南

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定测试
pnpm test:watch

# 运行覆盖率报告
pnpm test:coverage
```

### 编写测试

1. 单元测试：
   - 测试独立功能
   - 模拟外部依赖
   - 关注边界情况

2. 集成测试：
   - 测试组件交互
   - 测试数据流
   - 验证功能集成

## 文档贡献

### 文档结构

1. 用户指南
2. API 文档
3. 教程和示例
4. 故障排除

### 风格指南

- 使用清晰简洁的语言
- 提供代码示例
- 包含截图（如适用）
- 保持文档最新

## 发布流程

1. 版本控制
   - 遵循语义化版本
   - 更新 CHANGELOG
   - 标记发布版本

2. 发布检查清单
   - 所有测试通过
   - 文档已更新
   - 代码审查已完成
   - CHANGELOG 已更新 