# Better Auth 快速配置指南

## 📋 关键步骤总览

**按照以下步骤完成 Better Auth 配置（必须按顺序执行）：**

1. [配置环境变量](#1-配置环境变量-必需)
2. [获取 Resend API Key](#2-获取-resend-api-key-必需)
3. [配置社交登录](#3-配置社交登录-可选)
4. [重启服务](#4-重启开发服务器)
5. [测试认证功能](#5-测试认证功能)

---

## ⚠️ 重要更新：已移除 Supabase Auth

本项目已经完全迁移到 **Better Auth**，旧的 Supabase Auth 系统已被移除。现在使用：

- ✅ **Better Auth** - 新的认证系统
- ✅ **Supabase Database** - 仅用于数据存储（非认证）
- ❌ ~~Supabase Auth~~ - 已移除

---

## 1. 配置环境变量（必需）

**⚠️ 立即在 `.env.local` 文件中添加以下配置：**

```env
# 数据库连接（使用您现有的 Supabase 数据库）
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Better Auth 核心配置（必需 - 至少32个字符）
BETTER_AUTH_SECRET="your-super-secret-key-here-must-be-at-least-32-characters-long-for-security"
BETTER_AUTH_URL="http://localhost:3000/api/auth"

# 应用URL配置
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # 开发环境
# NEXT_PUBLIC_APP_URL="https://yourdomain.com"  # 生产环境时取消注释

# Resend 邮件服务（必需）
RESEND_API_KEY="re_your_resend_api_key_here"
EMAIL_FROM="noreply@yourdomain.com"

# 社交登录（可选）
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

**🔑 重要配置说明：**

- `BETTER_AUTH_SECRET`：必须至少32个字符，用于加密会话
- `DATABASE_URL`：替换 `[YOUR-PASSWORD]` 和 `[YOUR-PROJECT-REF]` 为实际值
- `EMAIL_FROM`：必须是您拥有的域名邮箱

---

## 2. 获取 Resend API Key（必需）

**步骤：**

1. 访问 [Resend 官网](https://resend.com) 并注册
2. 登录后，前往 **Dashboard > API Keys**
3. 点击 **Create API Key**
4. 复制生成的 API Key（以 `re_` 开头）
5. 将 API Key 添加到 `.env.local` 中的 `RESEND_API_KEY`

**🔐 验证域名（重要）：**

- 在 Resend Dashboard 中添加并验证您的发信域名
- 更新 `EMAIL_FROM` 为验证过的域名邮箱

---

## 3. 配置社交登录（可选）

### GitHub OAuth 配置

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 **New OAuth App**
3. 填写配置：
   - **Application name**: 您的应用名称
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. 获取 **Client ID** 和 **Client Secret**
5. 添加到 `.env.local` 中

### Google OAuth 配置

1. 访问 [Google Cloud Console](https://console.cloud.google.com)
2. 创建项目或选择现有项目
3. 启用 **Google+ API**
4. 前往 **APIs & Services > Credentials**
5. 创建 **OAuth 2.0 Client ID**：
   - **Application type**: Web application
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
6. 获取 **Client ID** 和 **Client Secret**
7. 添加到 `.env.local` 中

---

## 4. 重启开发服务器

```bash
# 停止当前服务器（Ctrl+C）
# 然后重新启动
npm run dev
```

**✅ 启动后验证：**

- 访问 `http://localhost:3000/api/auth` 应该返回认证端点信息
- 检查控制台无错误信息

---

## 5. 测试认证功能

### 基本使用代码示例

```tsx
import { useAuth } from "@/lib/auth-context";
import { authClient } from "@/lib/auth-client";

function AuthExample() {
  const { user, loading } = useAuth();

  if (loading) return <div>加载中...</div>;

  // 用户未登录
  if (!user) {
    return (
      <div className="space-y-4">
        {/* 邮箱登录 */}
        <button
          onClick={() =>
            authClient.signIn.email({
              email: "test@example.com",
              password: "password123",
            })
          }
        >
          邮箱登录
        </button>

        {/* 社交登录 */}
        <button
          onClick={() => authClient.signIn.social({ provider: "google" })}
        >
          Google 登录
        </button>

        <button
          onClick={() => authClient.signIn.social({ provider: "github" })}
        >
          GitHub 登录
        </button>

        {/* 注册 */}
        <button
          onClick={() =>
            authClient.signUp.email({
              email: "newuser@example.com",
              password: "securepassword",
              name: "新用户",
            })
          }
        >
          注册新账户
        </button>
      </div>
    );
  }

  // 用户已登录
  return (
    <div>
      <h2>欢迎, {user.name || user.email}!</h2>
      <p>用户 ID: {user.id}</p>
      <button onClick={() => authClient.signOut()}>登出</button>
    </div>
  );
}
```

---

## 🔧 常见问题解决

### 问题1：Edge Runtime crypto 模块错误

**错误信息：**
```
The edge runtime does not support Node.js 'crypto' module.
```

**解决方案：**
1. 在 `middleware.ts` 中已经添加了 `export const runtime = 'nodejs'`
2. 如果仍有问题，确保重启开发服务器
3. 中间件现在使用 cookie 检查而不是完整的会话验证

### 问题2：307 重定向错误

**解决方案：**

1. 确保 `BETTER_AUTH_SECRET` 已设置且至少32个字符
2. 重启开发服务器
3. 清除浏览器缓存和Cookie
4. 检查 `/api/auth/[...all]/route.ts` 文件存在

### 问题3：邮件发送失败

**解决方案：**

1. 验证 `RESEND_API_KEY` 正确
2. 确认 `EMAIL_FROM` 域名已在 Resend 中验证
3. 检查 Resend Dashboard 中的发送日志

### 问题4：社交登录失败

**解决方案：**

1. 确认 OAuth 应用回调 URL 正确
2. 检查 Client ID 和 Secret 是否正确
3. 确保社交平台应用状态为"已发布"

### 问题5：数据库连接错误

**解决方案：**

1. 确认 `DATABASE_URL` 格式正确
2. 检查 Supabase 项目是否暂停
3. 验证数据库密码是否正确

### 问题6：邮箱验证设置

**当前设置：**
- `requireEmailVerification: true` - 必须验证邮箱才能登录

**如需允许未验证邮箱登录，修改 `lib/auth.ts`：**
```javascript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: false,  // 改为 false
},
```

---

## ✨ 完整功能特性

- ✅ 邮箱密码注册/登录
- ✅ 邮箱验证（通过 Resend）
- ✅ 社交登录（Google、GitHub）
- ✅ 安全会话管理
- ✅ 密码重置功能
- ✅ 邮箱变更功能
- ✅ 完全中文界面
- ✅ TypeScript 完整支持
- ✅ 路由保护中间件（已修复 Edge Runtime 问题）
- ✅ 服务器端会话验证
- ✅ **仅使用 Better Auth**（已移除 Supabase Auth 冲突）

---

## 📝 生产环境部署

**部署前检查清单：**

1. **更新环境变量：**

   ```env
   BETTER_AUTH_URL="https://yourdomain.com/api/auth"
   NEXT_PUBLIC_APP_URL="https://yourdomain.com"
   ```

2. **更新 OAuth 回调 URL：**

   - GitHub: `https://yourdomain.com/api/auth/callback/github`
   - Google: `https://yourdomain.com/api/auth/callback/google`

3. **验证邮件域名：**

   - 确保 `EMAIL_FROM` 域名在 Resend 中已验证

4. **测试所有功能：**
   - 注册/登录流程
   - 邮件发送
   - 社交登录
   - 路由保护

---

## 🔄 从 Supabase Auth 迁移

如果您之前使用 Supabase Auth，以下文件已被更新或移除：

**已移除的文件：**
- `supabase/middleware.ts`
- `app/(auth)/auth/confirm/route.ts`

**已更新的文件：**
- `middleware.ts` - 现在使用 Better Auth 进行路由保护（已修复 Edge Runtime 问题）
- `app/(dashboard)/dashboard/page.tsx` - 使用 Better Auth 获取用户信息
- `components/user-auth-state.tsx` - 使用 Better Auth 登出
- `app/(dashboard)/profile/page.tsx` - 新建的个人资料页面

**数据库兼容性：**
- Supabase 数据库仍然可以使用
- Better Auth 会创建自己的认证表
- 不会影响您现有的业务数据

---

**🎉 配置完成！现在您可以在应用中使用完整的 Better Auth 认证功能了。**
