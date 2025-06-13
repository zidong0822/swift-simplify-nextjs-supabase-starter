"use client";

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
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("settings");

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {/* 账户设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t("accountSettings")}
            </CardTitle>
            <CardDescription>{t("accountSettingsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <p className="font-medium">{t("editProfile")}</p>
                <p className="text-sm text-muted-foreground">{t("editProfileDesc")}</p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                {t("modify")}
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <p className="font-medium">{t("emailAddress")}</p>
                <p className="text-sm text-muted-foreground">{t("emailAddressDesc")}</p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                {t("modify")}
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <p className="font-medium">{t("password")}</p>
                <p className="text-sm text-muted-foreground">{t("passwordDesc")}</p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                {t("changePassword")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 界面设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {t("interfaceSettings")}
            </CardTitle>
            <CardDescription>{t("interfaceSettingsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <p className="font-medium">{t("themeMode")}</p>
                <p className="text-sm text-muted-foreground">{t("themeModeDesc")}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{t("followSystem")}</Badge>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <p className="font-medium">{t("language")}</p>
                <p className="text-sm text-muted-foreground">{t("languageDesc")}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{t("chinese")}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 危险操作 */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600">{t("dangerousOperations")}</CardTitle>
            <CardDescription>{t("dangerousOperationsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div>
                <p className="font-medium">{t("deleteAccount")}</p>
                <p className="text-sm text-muted-foreground">{t("deleteAccountDesc")}</p>
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
