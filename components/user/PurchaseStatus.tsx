"use client";

import { useUserPurchases } from "@/hooks/useUserPurchases";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { PRICING_CONFIG } from "@/config/pricing";
import { useTranslations } from "next-intl";

export default function PurchaseStatus() {
  const { 
    purchases, 
    subscriptions, 
    loading, 
    error,
    hasActiveSubscription,
    hasValidPurchase 
  } = useUserPurchases();
  
  const t = useTranslations("billing");

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("purchaseStatus")}</CardTitle>
          <CardDescription>{t("loadingPurchaseInfo")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("purchaseStatus")}</CardTitle>
          <CardDescription className="text-red-500">
            {t("loadingFailed")}: {error}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
      case 'canceled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
      case 'active':
        return <Badge variant="default" className="bg-green-500">{t("success")}</Badge>;
      case 'pending':
        return <Badge variant="secondary">{t("pending")}</Badge>;
      case 'failed':
      case 'canceled':
        return <Badge variant="destructive">{t("failed")}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100); // 假设金额以分为单位存储
  };

  // 根据配置决定显示的统计项
  const getStatsItems = () => {
    const items = [];
    
    // 总是显示单次购买
    if (PRICING_CONFIG.display.showOneTime) {
      items.push({
        value: purchases.length,
        label: t("oneTimePurchase"),
        color: "text-blue-600"
      });
    }
    
    // 只在配置允许时显示订阅相关信息
    if (PRICING_CONFIG.display.showSubscription) {
      items.push({
        value: subscriptions.length,
        label: t("subscriptionRecord"),
        color: "text-green-600"
      });
      
      items.push({
        value: hasActiveSubscription() ? '1' : '0',
        label: t("activeSubscription"),
        color: "text-purple-600"
      });
    }
    
    return items;
  };

  // 获取状态总览的标题和描述
  const getOverviewTitle = () => {
    if (PRICING_CONFIG.display.showOneTime && !PRICING_CONFIG.display.showSubscription) {
      return t("purchaseStatus");
    } else if (!PRICING_CONFIG.display.showOneTime && PRICING_CONFIG.display.showSubscription) {
      return t("subscriptionStatus");
    } else {
      return t("purchaseStatus");
    }
  };

  const getOverviewDescription = () => {
    if (PRICING_CONFIG.display.showOneTime && !PRICING_CONFIG.display.showSubscription) {
      return t("purchaseStatusDesc");
    } else if (!PRICING_CONFIG.display.showOneTime && PRICING_CONFIG.display.showSubscription) {
      return t("subscriptionStatusDesc");
    } else {
      return t("purchaseAndSubscriptionStatus");
    }
  };

  const statsItems = getStatsItems();

  return (
    <div className="space-y-6">
      {/* 总体购买状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getOverviewTitle()}
            {hasValidPurchase() && (
              <Badge variant="default" className="bg-green-500">
                {t("purchased")}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {getOverviewDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`grid grid-cols-1 ${statsItems.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
            {statsItems.map((item, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 订阅状态 - 只在配置允许时显示 */}
      {PRICING_CONFIG.display.showSubscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t("subscriptionStatus")}
              {hasActiveSubscription() && (
                <Badge variant="default" className="bg-green-500">{t("active")}</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {t("currentSubscriptionPlan")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subscriptions.length === 0 ? (
              <p className="text-gray-500">{t("noSubscription")}</p>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(subscription.status)}
                      <div>
                        <p className="font-medium">{subscription.plan_name}</p>
                        <p className="text-sm text-gray-500">
                          {t("expiryDate")}: {formatDate(subscription.current_period_end)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(subscription.status)}
                      {subscription.cancel_at_period_end && (
                        <p className="text-xs text-orange-500 mt-1">{t("willCancelAtPeriodEnd")}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 购买历史 - 只在配置允许时显示 */}
      {PRICING_CONFIG.display.showOneTime && (
        <Card>
          <CardHeader>
            <CardTitle>{t("purchaseHistory")}</CardTitle>
            <CardDescription>
              {t("purchaseHistoryDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {purchases.length === 0 ? (
              <p className="text-gray-500">{t("noPurchaseRecord")}</p>
            ) : (
              <div className="space-y-4">
                {purchases.slice(0, 5).map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(purchase.status)}
                      <div>
                        <p className="font-medium">{purchase.product_name}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(purchase.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatAmount(purchase.amount, purchase.currency)}
                      </p>
                      {getStatusBadge(purchase.status)}
                    </div>
                  </div>
                ))}
                {purchases.length > 5 && (
                  <p className="text-sm text-gray-500 text-center">
                    {t("moreRecords", { count: purchases.length - 5 })}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 