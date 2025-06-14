"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStripe } from "@/hooks/useStripe";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import PurchaseStatus from "@/components/user/PurchaseStatus";
import { toast } from "sonner";
import { ShoppingCart, CreditCard } from "lucide-react";

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

// 可用的升级计划
const upgradePlans = [
  {
    name: "Pro",
    price: "$49",
    description: "适合专业开发者",
    features: [
      "所有免费功能",
      "高级扩展",
      "优先支持",
      "高级组件",
    ],
    priceId: "price_1RZUWH2cmOQ9qmEBMH8d9GFg",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "适合团队和企业",
    features: [
      "所有 Pro 功能",
      "自定义集成",
      "专属客服支持",
      "团队协作工具",
    ],
    priceId: "price_1RZUWH2cmOQ9qmEBMH8d9GFg",
    isPopular: false,
  },
];

export default function BillingClient({ user }: BillingClientProps) {
  const { redirectToCheckout, loading } = useStripe();
  const { hasValidPurchase, canPurchase } = useUserPurchases();

  const handleUpgrade = async (plan: typeof upgradePlans[0]) => {
    if (!plan.priceId) {
      toast.error("价格配置错误，请联系客服");
      return;
    }

    // 检查是否可以购买
    const purchaseCheck = canPurchase(plan.name, true);
    if (!purchaseCheck.canPurchase) {
      toast.error(purchaseCheck.reason || "无法购买此计划");
      return;
    }

    try {
      await redirectToCheckout(plan.priceId);
    } catch {
      toast.error("升级失败，请重试");
    }
  };

  return (
    <div className="space-y-6">
      {/* 用户信息卡片 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            账户信息
          </CardTitle>
          <CardDescription>
            您的账户基本信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">用户名:</span>
              <span className="text-sm">{user.name || "未设置"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">邮箱:</span>
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">注册时间:</span>
              <span className="text-sm">
                {new Date(user.createdAt).toLocaleDateString('zh-CN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">邮箱验证:</span>
              <span className={`text-sm ${user.emailVerified ? 'text-green-600' : 'text-orange-600'}`}>
                {user.emailVerified ? "已验证" : "未验证"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 购买状态组件 */}
      <PurchaseStatus />

      {/* 升级选项 - 只在没有有效购买时显示 */}
      {!hasValidPurchase() && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              升级您的计划
            </CardTitle>
            <CardDescription>
              选择更适合您需求的计划
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upgradePlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative border rounded-lg p-6 ${
                    plan.isPopular
                      ? "border-primary shadow-md"
                      : "border-gray-200"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-3 rounded-full font-medium">
                      推荐
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold mb-2">{plan.price}</div>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleUpgrade(plan)}
                    disabled={loading}
                    className="w-full"
                    variant={plan.isPopular ? "default" : "outline"}
                  >
                    {loading ? "处理中..." : `升级到 ${plan.name}`}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 帮助和支持 */}
      <Card>
        <CardHeader>
          <CardTitle>需要帮助？</CardTitle>
          <CardDescription>
            如果您有任何问题或需要支持，请联系我们
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">技术支持</h4>
                <p className="text-sm text-gray-600 mb-3">
                  遇到技术问题？我们的技术团队随时为您提供帮助。
                </p>
                <Button variant="outline" size="sm">
                  联系技术支持
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">账单问题</h4>
                <p className="text-sm text-gray-600 mb-3">
                  对账单有疑问？我们的客服团队将为您解答。
                </p>
                <Button variant="outline" size="sm">
                  联系客服
                </Button>
              </div>
            </div>
            
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-500">
                工作时间：周一至周五 9:00-18:00 | 邮箱：support@example.com
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 