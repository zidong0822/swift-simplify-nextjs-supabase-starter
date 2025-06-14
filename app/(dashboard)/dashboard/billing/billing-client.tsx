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
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Download,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useStripe } from "@/hooks/useStripe";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { useState } from "react";

interface BillingClientProps {
  user: {
    id: string;
    name?: string | null;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    image?: string | null;
  };
}

// 模拟订阅数据 - 在实际应用中，这些数据应该从数据库获取
const mockSubscription = {
  id: "sub_1234567890",
  status: "active", // active, canceled, past_due, incomplete
  plan: {
    name: "Pro",
    price: 49,
    interval: "month"
  },
  currentPeriodStart: new Date("2024-01-01"),
  currentPeriodEnd: new Date("2024-02-01"),
  cancelAtPeriodEnd: false
};

const mockInvoices = [
  {
    id: "in_1234567890",
    amount: 49,
    status: "paid",
    created: new Date("2024-01-01"),
    invoiceUrl: "#"
  },
  {
    id: "in_0987654321",
    amount: 49,
    status: "paid", 
    created: new Date("2023-12-01"),
    invoiceUrl: "#"
  },
  {
    id: "in_1122334455",
    amount: 49,
    status: "pending",
    created: new Date("2024-02-01"),
    invoiceUrl: "#"
  }
];

export default function BillingClient({ }: BillingClientProps) {
  const { redirectToCheckout, loading } = useStripe();
  const { subscription, invoices, loading: subscriptionLoading, cancelSubscription: cancelSub } = useSubscription();
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleUpgrade = async (priceId: string) => {
    try {
      await redirectToCheckout(priceId);
    } catch {
      toast.error("升级失败，请重试");
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) {
      toast.error("没有找到活跃的订阅");
      return;
    }

    setCancelLoading(true);
    try {
      await cancelSub(subscription.id);
    } catch {
      // 错误已在cancelSub中处理
    } finally {
      setCancelLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />活跃</Badge>;
      case "canceled":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />已取消</Badge>;
      case "past_due":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />逾期</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">已支付</Badge>;
      case "pending":
        return <Badge variant="secondary">待支付</Badge>;
      case "failed":
        return <Badge variant="destructive">支付失败</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (subscriptionLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* 当前订阅状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            当前订阅
          </CardTitle>
          <CardDescription>
            您的订阅计划和状态信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscription ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{subscription.plan.name} 计划</h3>
                  <p className="text-sm text-muted-foreground">
                    ¥{subscription.plan.price}/{subscription.plan.interval === "month" ? "月" : "年"}
                  </p>
                </div>
                {getStatusBadge(subscription.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">当前周期</p>
                    <p className="text-xs text-muted-foreground">
                      {subscription.currentPeriodStart.toLocaleDateString()} - {subscription.currentPeriodEnd.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">下次扣费</p>
                    <p className="text-xs text-muted-foreground">
                      {subscription.currentPeriodEnd.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => handleUpgrade("price_pro_yearly")}
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? "处理中..." : "升级到年付"}
                </Button>
                <Button 
                  onClick={handleCancelSubscription}
                  disabled={cancelLoading}
                  variant="destructive"
                >
                  {cancelLoading ? "处理中..." : "取消订阅"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">您当前没有活跃的订阅</p>
              <Button onClick={() => handleUpgrade("price_1234567890")}>
                开始订阅
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 账单历史 */}
      <Card>
        <CardHeader>
          <CardTitle>账单历史</CardTitle>
          <CardDescription>
            查看您的付款记录和下载发票
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">¥{invoice.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {invoice.created.toLocaleDateString()}
                      </p>
                    </div>
                    {getInvoiceStatusBadge(invoice.status)}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(invoice.invoiceUrl, '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    下载
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">暂无账单记录</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 升级选项 */}
      <Card>
        <CardHeader>
          <CardTitle>升级选项</CardTitle>
          <CardDescription>
            选择更适合您需求的计划
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Enterprise 计划</h3>
              <p className="text-2xl font-bold mb-2">¥199<span className="text-sm font-normal">/月</span></p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• 所有 Pro 功能</li>
                <li>• 自定义集成</li>
                <li>• 专属客服支持</li>
                <li>• 团队协作工具</li>
              </ul>
              <Button 
                onClick={() => handleUpgrade("price_enterprise_monthly")}
                disabled={loading}
                className="w-full"
              >
                {loading ? "处理中..." : "升级到 Enterprise"}
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">年付优惠</h3>
              <p className="text-2xl font-bold mb-2">¥490<span className="text-sm font-normal">/年</span></p>
              <p className="text-sm text-green-600 mb-4">节省 ¥98 (相当于2个月免费)</p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• 所有 Pro 功能</li>
                <li>• 年付享受折扣</li>
                <li>• 优先客服支持</li>
              </ul>
              <Button 
                onClick={() => handleUpgrade("price_pro_yearly")}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? "处理中..." : "切换到年付"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
} 