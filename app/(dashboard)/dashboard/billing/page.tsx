import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BillingClient from "./billing-client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

// 强制动态渲染
export const dynamic = "force-dynamic";

async function BillingContent() {
  const t = await getTranslations("billing");
  const tErrors = await getTranslations("errors");
  
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      return (
        <div className="grid gap-4 md:gap-6 grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">{tErrors("somethingWentWrong")}</CardTitle>
              <CardDescription>{tErrors("cannotLoadUserInfo")}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }

    return <BillingClient user={user} />;
  } catch (error) {
    console.error("获取账单数据失败:", error);
    return (
      <div className="grid gap-4 md:gap-6 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">{t("loadingFailed")}</CardTitle>
            <CardDescription>{tErrors("loadDataProblem")}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
}

export default async function BillingPage() {
  const t = await getTranslations("billing");
  
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 md:gap-6 grid-cols-1">
            {[...Array(3)].map((_, i) => (
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
        <BillingContent />
      </Suspense>
    </div>
  );
} 