"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Shield } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface DashboardClientProps {
  user: {
    id: string;
    name?: string | null;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    image?: string | null;
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const t = useTranslations("dashboard");

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("userInfo")}
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold truncate">
              {user.name || t("notSet")}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("emailStatus")}
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">
              {user.emailVerified ? t("verified") : t("unverified")}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.emailVerified ? t("emailVerified") : t("emailNotVerified")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("registrationDate")}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">
              {user.createdAt.toLocaleDateString("zh-CN")}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("accountCreationDate")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("accountType")}
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">
              {t("freeVersion")}
            </div>
            <p className="text-xs text-muted-foreground">{t("currentPlan")}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("quickActions")}</CardTitle>
          <CardDescription>{t("quickActionsDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              {t("editProfile")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
