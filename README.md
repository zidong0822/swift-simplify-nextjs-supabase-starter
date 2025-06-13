# Swift Simplify Next.js + Supabase 启动模板

一个现代化的 Next.js 15 启动模板，集成了 Supabase 身份验证、React Query 数据获取，以及内置的查询和认证包装器。该模板旨在通过提供预配置的 hooks、实用工具和最佳实践来加速开发。

## 🌟 主要特性

- **Next.js 15** - 最新版本，提供优化的性能和开发体验
- **Supabase 集成** - 内置身份验证系统和用户会话管理
- **React Query** - 高效的数据获取和缓存管理
- **ShadCN 组件** - 精美的预构建 UI 组件
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Zod 验证** - 基于模式的表单验证
- **预构建 Hooks** - 用于数据获取和修改的自定义 hooks
- **类型安全** - 完整的 TypeScript 支持

## 📦 安装

使用 CLI 创建新项目（如果可用）：

```bash
npx create-swift-simplify-starter@latest my-project
```

或手动克隆仓库：

```bash
git clone https://github.com/zidong0822/swift-simplify-nextjs-supabase-starter.git my-project
cd my-project
pnpm install
```

## ⚙️ 环境配置

1. 创建 `.env.local` 文件并添加：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. 启动开发服务器：

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📚 使用指南

### 认证系统

使用 `AuthContext` 管理全局认证状态：

```tsx
"use client";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data?.user ?? null;
    },
    staleTime: 0,
  });

  return (
    <AuthContext.Provider value={{ user: user ?? null, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 内使用");
  }
  return context;
}
```

### 数据获取

使用 `useClientFetch` hook 在客户端组件中获取数据：

```tsx
import { useClientFetch } from "@/hooks/useClientFetch";

const Posts = () => {
  const { data, isLoading } = useClientFetch("posts", "posts");

  if (isLoading) return <div>加载中...</div>;

  return <ul>{data?.map((post) => <li key={post.id}>{post.title}</li>)}</ul>;
};
```

#### 高级筛选示例

```tsx
const FilteredUsers = () => {
  const { data, isLoading } = useClientFetch(
    "filtered-users", // 缓存键
    "users", // 表名
    5000, // 缓存时间
    (query) => query.eq("role", "admin") // Supabase 查询过滤器
  );

  if (isLoading) return <div>加载中...</div>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>
          {user.name} ({user.role})
        </li>
      ))}
    </ul>
  );
};
```

### 数据修改

使用 `useClientMutate` hook 进行数据的增删改：

```tsx
import { useClientMutate } from "@/hooks/useClientMutate";

// 添加数据
const AddPost = () => {
  const mutation = useClientMutate("posts", "insert");

  const handleSubmit = () => {
    mutation.mutate({ title: "新文章", content: "内容" });
  };

  return <button onClick={handleSubmit}>添加文章</button>;
};

// 更新数据
const UpdatePost = () => {
  const mutation = useClientMutate("posts", "update");

  const handleUpdate = () => {
    mutation.mutate({ id: 1, title: "更新的文章" });
  };

  return <button onClick={handleUpdate}>更新文章</button>;
};

// 删除数据
const DeletePost = () => {
  const mutation = useClientMutate("posts", "delete");

  const handleDelete = () => {
    mutation.mutate({ id: 1 });
  };

  return <button onClick={handleDelete}>删除文章</button>;
};
```

## 📁 项目结构

```
📦 swift-simplify-starter
├── 📂 app                 # Next.js 应用目录
│   ├── 📂 (auth)         # 认证相关页面
│   ├── 📂 (dashboard)    # 仪表板页面
│   ├── layout.tsx        # 主布局
│   └── page.tsx          # 首页
├── 📂 components         # 共享组件
├── 📂 hooks              # 自定义 Hooks
├── 📂 lib                # 工具函数
├── 📂 public             # 静态资源
├── 📂 supabase           # Supabase 集成
│   ├── client.ts         # 客户端配置
│   └── server.ts         # 服务端工具
└── 📂 docs               # 项目文档
    ├── 📂 landing-page   # 登陆页面文档
    ├── development.md    # 开发指南
    ├── deployment.md     # 部署指南
    └── contributing.md   # 贡献指南
```

## 🛠️ 技术栈

- **框架**: Next.js 15
- **数据库**: Supabase
- **状态管理**: React Query
- **UI 组件**: ShadCN
- **样式**: Tailwind CSS
- **表单验证**: Zod
- **类型系统**: TypeScript

## 📖 文档

详细文档请参考 `docs` 目录：

- [开发指南](./docs/development.md)
- [部署指南](./docs/deployment.md)
- [贡献指南](./docs/contributing.md)
- [登陆页面文档](./docs/landing-page/README.md)

## 📄 许可证

MIT © [您的名字]
