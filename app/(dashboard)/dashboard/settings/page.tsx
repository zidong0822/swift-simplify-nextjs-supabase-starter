import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Palette, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">设置</h1>
        <p className="text-muted-foreground">管理您的账户设置和偏好</p>
      </div>

      <div className="grid gap-6">
        {/* 账户设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              账户设置
            </CardTitle>
            <CardDescription>管理您的基本账户信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">编辑个人资料</p>
                <p className="text-sm text-muted-foreground">
                  更新您的姓名、头像等信息
                </p>
              </div>
              <Button variant="outline" size="sm">
                编辑
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">邮箱地址</p>
                <p className="text-sm text-muted-foreground">
                  更改您的邮箱地址
                </p>
              </div>
              <Button variant="outline" size="sm">
                修改
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">密码</p>
                <p className="text-sm text-muted-foreground">
                  更改您的登录密码
                </p>
              </div>
              <Button variant="outline" size="sm">
                修改密码
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 界面设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              界面设置
            </CardTitle>
            <CardDescription>自定义您的使用体验</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">主题模式</p>
                <p className="text-sm text-muted-foreground">
                  选择浅色或深色主题
                </p>
              </div>
              <Badge variant="outline">跟随系统</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">语言</p>
                <p className="text-sm text-muted-foreground">
                  选择界面显示语言
                </p>
              </div>
              <Badge variant="outline">中文</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 危险操作 */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600">危险操作</CardTitle>
            <CardDescription>这些操作不可逆转，请谨慎操作</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">删除账户</p>
                <p className="text-sm text-muted-foreground">
                  永久删除您的账户和所有数据
                </p>
              </div>
              <Button variant="destructive" size="sm">
                删除账户
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
