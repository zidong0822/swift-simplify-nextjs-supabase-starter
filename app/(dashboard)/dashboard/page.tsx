import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardClient from "./dashboard-client";

// 强制动态渲染，因为页面使用了 headers() API
export const dynamic = "force-dynamic";

async function DashboardContent() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      return (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">错误</CardTitle>
              <CardDescription>无法加载用户信息</CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }

    return <DashboardClient user={user} />;
  } catch (error) {
    console.error("获取仪表板数据失败:", error);
    return (
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">加载失败</CardTitle>
            <CardDescription>加载数据时出现问题</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <Suspense
        fallback={
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
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
    </div>
  );
}
