import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { User, Mail, Calendar, Shield } from "lucide-react";
import Link from "next/link";

// 强制动态渲染，因为页面使用了 headers() API
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">仪表板概览</h1>
        <p className="text-muted-foreground">欢迎回到您的个人中心</p>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        }
      >
        <DashboardContent />
      </Suspense>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>常用功能快速入口</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                编辑个人资料
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function DashboardContent() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">错误</CardTitle>
              <CardDescription>无法加载用户信息</CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">用户信息</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.name || "未设置"}</div>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">邮箱状态</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.emailVerified ? "已验证" : "未验证"}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.emailVerified ? "邮箱已通过验证" : "请验证您的邮箱"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">注册时间</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(user.createdAt).toLocaleDateString("zh-CN")}
            </div>
            <p className="text-xs text-muted-foreground">账户创建日期</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">账户类型</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">免费版</div>
            <p className="text-xs text-muted-foreground">当前订阅计划</p>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("获取仪表板数据失败:", error);
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">错误</CardTitle>
            <CardDescription>加载数据时出现问题</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
}
