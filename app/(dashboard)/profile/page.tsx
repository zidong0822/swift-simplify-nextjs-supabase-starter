import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 强制动态渲染，因为页面使用了 headers() API
export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <p className="text-gray-600 text-xl mb-10">未找到用户信息</p>
          <Link href="/login">
            <Button>返回登录</Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">个人资料</h1>
          <p className="text-muted-foreground">管理您的账户信息和设置</p>
        </div>

        <div className="grid gap-6">
          {/* 基本信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>您的个人基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">姓名</label>
                  <p className="text-lg">{user.name || "未设置"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">邮箱地址</label>
                  <div className="flex items-center gap-2">
                    <p className="text-lg">{user.email}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.emailVerified 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {user.emailVerified ? "已验证" : "未验证"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">用户 ID</label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">注册时间</label>
                  <p className="text-lg">{new Date(user.createdAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 账户状态卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>账户状态</CardTitle>
              <CardDescription>您的账户安全和验证状态</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">邮箱验证</p>
                  <p className="text-sm text-muted-foreground">确保您的邮箱地址是正确的</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  user.emailVerified 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {user.emailVerified ? "已验证" : "需要验证"}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">账户类型</p>
                  <p className="text-sm text-muted-foreground">您的账户访问级别</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  标准用户
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/dashboard" className="inline-flex items-center">
                <Home className="mr-2 h-4 w-4" />
                返回仪表板
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("获取用户数据失败:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-gray-600 text-xl mb-10">获取用户信息失败</p>
        <Button asChild>
          <Link href="/login">返回登录</Link>
        </Button>
      </div>
    );
  }
} 