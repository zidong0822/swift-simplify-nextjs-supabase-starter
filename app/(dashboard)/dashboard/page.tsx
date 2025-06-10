import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <p className="text-gray-600 text-3xl mb-10">
        You&#39;re logged into your dashboard.
      </p>
      <Suspense
        fallback={
          <p className="text-gray-600 text-md mb-10">Loading user infos...</p>
        }>
        <UserData />
      </Suspense>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Button asChild>
          <Link href="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

async function UserData() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      return (
        <div className="max-w-xl w-full mx-auto space-y-5">
          <p className="text-gray-600 text-2xl mb-10">未找到用户信息</p>
        </div>
      );
    }

    return (
      <div className="max-w-xl w-full mx-auto space-y-5">
        <p className="text-gray-600 text-2xl mb-10">
          Hello {user.name || user.email}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 font-mono p-0.5 rounded bg-slate-300">
            {user.email}
          </p>
          <p className="text-gray-600 font-mono p-0.5 rounded bg-slate-300">
            {user.emailVerified ? "已验证" : "未验证"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 font-mono p-0.5 rounded bg-slate-300">
            用户 ID: {user.id}
          </p>
          <p className="text-gray-600 font-mono p-0.5 rounded bg-slate-300">
            创建时间: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("获取用户数据失败:", error);
    return (
      <div className="max-w-xl w-full mx-auto space-y-5">
        <p className="text-gray-600 text-2xl mb-10">获取用户信息失败</p>
      </div>
    );
  }
}
