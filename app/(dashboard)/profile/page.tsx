import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Calendar, 
  Edit,
  CheckCircle,
  XCircle 
} from "lucide-react";

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
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-red-600">访问被拒绝</CardTitle>
              <CardDescription className="text-center">
                您需要登录才能查看个人资料
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }

    const userInitials = user.name 
      ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
      : user.email.substring(0, 2).toUpperCase();

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">个人资料</h1>
          <p className="text-muted-foreground">管理您的账户信息</p>
        </div>

        <div className="grid gap-6">
          {/* 用户头像和基本信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                个人信息
              </CardTitle>
              <CardDescription>您的基本账户信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.image || undefined} alt={user.name || user.email} />
                  <AvatarFallback className="text-lg">{userInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-xl font-semibold">{user.name || "未设置姓名"}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.emailVerified ? "default" : "destructive"}>
                      {user.emailVerified ? (
                        <><CheckCircle className="h-3 w-3 mr-1" />已验证</>
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" />未验证</>
                      )}
                    </Badge>
                    <Badge variant="outline">标准用户</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  编辑资料
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 账户详情 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                账户详情
              </CardTitle>
              <CardDescription>您的账户基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">用户ID</label>
                <p className="text-sm font-mono bg-muted p-2 rounded break-all">{user.id}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  注册时间
                </label>
                <p className="text-sm">{new Date(user.createdAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">邮箱状态</label>
                <div className="flex items-center gap-2">
                  {user.emailVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    {user.emailVerified ? "邮箱已验证" : "邮箱未验证"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 危险操作 */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600">危险操作</CardTitle>
              <CardDescription>此操作不可逆转，请谨慎操作</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">删除账户</p>
                  <p className="text-sm text-muted-foreground">永久删除您的账户和所有数据</p>
                </div>
                <Button variant="destructive">
                  删除账户
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error("获取用户数据失败:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">加载失败</CardTitle>
            <CardDescription className="text-center">
              获取用户信息时出现问题，请稍后重试
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.reload()}>
              重新加载
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
} 