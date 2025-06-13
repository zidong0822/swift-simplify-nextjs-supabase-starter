import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileClient from "./profile-client";

// 强制动态渲染，因为页面使用了 headers() API
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      return <ProfileClient user={null} />;
    }

    return <ProfileClient user={user} />;
  } catch (error) {
    console.error("获取用户数据失败:", error);
    return (
      <ProfileClient user={null} error="获取用户信息时出现问题，请稍后重试" />
    );
  }
}
