"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Edit, CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProfileClientProps {
  user: {
    id: string;
    name?: string | null;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    image?: string | null;
  } | null;
  error?: string;
}

export default function ProfileClient({ user, error }: ProfileClientProps) {
  const t = useTranslations("profile");
  const tErrors = useTranslations("errors");
  const tCommon = useTranslations("common");

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              {tErrors("loadingFailed")}
            </CardTitle>
            <CardDescription className="text-center">{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.reload()}>
              {tCommon("reload")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              {tErrors("accessDenied")}
            </CardTitle>
            <CardDescription className="text-center">
              {tErrors("needLogin")}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email.substring(0, 2).toUpperCase();

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {/* 用户头像和基本信息卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t("personalInfo")}
            </CardTitle>
            <CardDescription>{t("personalInfoDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="h-16 w-16 md:h-20 md:w-20 mx-auto sm:mx-0">
                <AvatarImage
                  src={user.image || undefined}
                  alt={user.name || user.email}
                />
                <AvatarFallback className="text-base md:text-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold truncate">
                    {user.name || t("nameNotSet")}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base truncate">
                    {user.email}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <Badge
                    variant={user.emailVerified ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {user.emailVerified ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t("emailVerified")}
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" />
                        {t("emailNotVerified")}
                      </>
                    )}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {t("standardUser")}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Edit className="h-4 w-4 mr-2" />
                {t("editProfileButton")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 账户详情 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {t("accountDetails")}
            </CardTitle>
            <CardDescription>{t("accountDetailsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t("userId")}
              </label>
              <p className="text-xs md:text-sm font-mono bg-muted p-2 rounded break-all">
                {user.id}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("registrationTime")}
              </label>
              <p className="text-sm">
                {user.createdAt.toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t("emailStatus")}
              </label>
              <div className="flex items-center gap-2">
                {user.emailVerified ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">
                  {user.emailVerified
                    ? t("emailVerified")
                    : t("emailNotVerified")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 危险操作 */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600">
              {t("dangerousOperations")}
            </CardTitle>
            <CardDescription>{t("dangerousOperationsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <p className="font-medium">{t("deleteAccount")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("deleteAccountDesc")}
                </p>
              </div>
              <Button variant="destructive" className="w-full sm:w-auto">
                {t("deleteAccount")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
