"use client";

import { useUserPurchases } from "@/hooks/useUserPurchases";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function PurchaseStatus() {
  const { 
    purchases, 
    subscriptions, 
    loading, 
    error,
    hasActiveSubscription,
    hasValidPurchase 
  } = useUserPurchases();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>购买状态</CardTitle>
          <CardDescription>加载您的购买信息...</CardDescription>
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
          <CardTitle>购买状态</CardTitle>
          <CardDescription className="text-red-500">
            加载失败: {error}
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
        return <Badge variant="default" className="bg-green-500">成功</Badge>;
      case 'pending':
        return <Badge variant="secondary">待处理</Badge>;
      case 'failed':
      case 'canceled':
        return <Badge variant="destructive">失败</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100); // 假设金额以分为单位存储
  };

  return (
    <div className="space-y-6">
      {/* 总体购买状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            购买状态总览
            {hasValidPurchase() && (
              <Badge variant="default" className="bg-green-500">已购买</Badge>
            )}
          </CardTitle>
          <CardDescription>
            您的购买和订阅状态概览
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{purchases.length}</div>
              <div className="text-sm text-gray-500">单次购买</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{subscriptions.length}</div>
              <div className="text-sm text-gray-500">订阅记录</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {hasActiveSubscription() ? '1' : '0'}
              </div>
              <div className="text-sm text-gray-500">活跃订阅</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 订阅状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            订阅状态
            {hasActiveSubscription() && (
              <Badge variant="default" className="bg-green-500">活跃</Badge>
            )}
          </CardTitle>
          <CardDescription>
            您当前的订阅计划
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscriptions.length === 0 ? (
            <p className="text-gray-500">暂无订阅</p>
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
                        到期时间: {formatDate(subscription.current_period_end)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(subscription.status)}
                    {subscription.cancel_at_period_end && (
                      <p className="text-xs text-orange-500 mt-1">将在期末取消</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 购买历史 */}
      <Card>
        <CardHeader>
          <CardTitle>购买历史</CardTitle>
          <CardDescription>
            您的所有购买记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          {purchases.length === 0 ? (
            <p className="text-gray-500">暂无购买记录</p>
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
                  还有 {purchases.length - 5} 条记录...
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 