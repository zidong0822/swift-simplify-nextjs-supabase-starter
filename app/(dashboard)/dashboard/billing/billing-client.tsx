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
import { ShoppingCart, CreditCard, Zap, Crown } from "lucide-react";
import {
  PRICING_CONFIG,
  oneTimePlans,
  subscriptionPlans,
  yearlySubscriptionPlans,
} from "@/config/pricing";
import { PricingPlan } from "@/types/stripe";
import { useTranslations } from "next-intl";

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

export default function BillingClient({ user }: BillingClientProps) {
  const { redirectToCheckout, loading } = useStripe();
  const { hasValidPurchase, canPurchase, hasActiveSubscription } =
    useUserPurchases();
  const t = useTranslations("billing");

  // 根据配置获取可用的升级计划
  const getAvailablePlans = (): PricingPlan[] => {
    let plans: PricingPlan[] = [];

    // 根据配置决定显示哪些计划
    if (PRICING_CONFIG.display.showOneTime) {
      plans = [
        ...plans,
        ...oneTimePlans.filter((plan) => plan.visible !== false),
      ];
    }

    if (PRICING_CONFIG.display.showSubscription) {
      if (PRICING_CONFIG.display.showYearlySubscription) {
        plans = [
          ...plans,
          ...yearlySubscriptionPlans.filter((plan) => plan.visible !== false),
        ];
      } else {
        plans = [
          ...plans,
          ...subscriptionPlans.filter((plan) => plan.visible !== false),
        ];
      }
    }

    return plans;
  };

  // 获取当前配置的主要模式描述
  const getCurrentModeDescription = (): string => {
    if (
      PRICING_CONFIG.display.showOneTime &&
      PRICING_CONFIG.display.showSubscription
    ) {
      return t("chooseOneTimeOrSubscription");
    } else if (PRICING_CONFIG.display.showOneTime) {
      return PRICING_CONFIG.descriptions.onetime;
    } else if (PRICING_CONFIG.display.showSubscription) {
      if (PRICING_CONFIG.display.showYearlySubscription) {
        return PRICING_CONFIG.descriptions.yearly;
      } else {
        return PRICING_CONFIG.descriptions.subscription;
      }
    }
    return t("selectSuitablePlan");
  };

  // 获取配置感知的标题
  const getModeTitle = (): string => {
    if (
      PRICING_CONFIG.display.showOneTime &&
      !PRICING_CONFIG.display.showSubscription
    ) {
      return t("oneTimePurchasePlan");
    } else if (
      !PRICING_CONFIG.display.showOneTime &&
      PRICING_CONFIG.display.showSubscription
    ) {
      if (PRICING_CONFIG.display.showYearlySubscription) {
        return t("yearlySubscriptionPlan");
      } else {
        return t("subscriptionPlanTitle");
      }
    }
    return t("upgradeYourPlan");
  };

  // 获取计划图标
  const getPlanIcon = (plan: PricingPlan) => {
    if (plan.isSubscription) {
      return <Zap className="h-4 w-4" />;
    } else {
      return <Crown className="h-4 w-4" />;
    }
  };

  // 获取计划类型标签
  const getPlanTypeLabel = (plan: PricingPlan): string => {
    if (plan.isSubscription) {
      return plan.price.includes("年") ||
        plan.price.includes("Year") ||
        plan.price.includes("年間")
        ? t("yearlySubscription")
        : t("monthlySubscription");
    } else {
      return t("oneTimePurchaseLabel");
    }
  };

  const handleUpgrade = async (plan: PricingPlan) => {
    if (!plan.priceId) {
      toast.error(t("priceConfigError"));
      return;
    }

    // 检查是否可以购买
    const purchaseCheck = canPurchase(plan.name, plan.isSubscription || false);
    if (!purchaseCheck.canPurchase) {
      toast.error(purchaseCheck.reason || t("cannotPurchase"));
      return;
    }

    try {
      await redirectToCheckout(plan.priceId);
    } catch {
      toast.error(t("upgradeFailed"));
    }
  };

  // 检查是否应该显示升级选项
  const shouldShowUpgradeOptions = (): boolean => {
    // 如果配置为只显示一次性购买，且用户已有任何购买记录，则不显示
    if (
      PRICING_CONFIG.display.showOneTime &&
      !PRICING_CONFIG.display.showSubscription
    ) {
      return !hasValidPurchase(); // 检查是否有任何有效购买
    }

    // 如果配置为只显示订阅，且用户已有活跃订阅，则不显示
    if (
      !PRICING_CONFIG.display.showOneTime &&
      PRICING_CONFIG.display.showSubscription
    ) {
      return !hasActiveSubscription();
    }

    // 混合模式下，如果用户既没有购买也没有订阅，则显示
    return !hasValidPurchase();
  };

  const availablePlans = getAvailablePlans();

  return (
    <div className="space-y-6">
      {/* 用户信息卡片 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t("accountInfo")}
          </CardTitle>
          <CardDescription>{t("accountInfoDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{t("username")}:</span>
              <span className="text-sm">{user.name || t("notSet")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">{t("email")}:</span>
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">
                {t("registrationDate")}:
              </span>
              <span className="text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">
                {t("emailVerification")}:
              </span>
              <span
                className={`text-sm ${user.emailVerified ? "text-green-600" : "text-orange-600"}`}
              >
                {user.emailVerified ? t("verified") : t("unverified")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 购买状态组件 */}
      <PurchaseStatus />

      {/* 升级选项 - 根据配置和用户状态智能显示 */}
      {shouldShowUpgradeOptions() && availablePlans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {getModeTitle()}
            </CardTitle>
            <CardDescription>{getCurrentModeDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availablePlans.map((plan) => (
                <div
                  key={`${plan.name}-${plan.isSubscription ? "sub" : "onetime"}`}
                  className={`relative border rounded-lg p-6 ${
                    plan.popular
                      ? "border-primary shadow-md"
                      : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-3 rounded-full font-medium">
                      {t("recommended")}
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getPlanIcon(plan)}
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                    </div>
                    <div className="text-3xl font-bold mb-1">{plan.price}</div>
                    <div className="text-xs text-primary font-medium mb-2">
                      {getPlanTypeLabel(plan)}
                    </div>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg
                          className="h-4 w-4 text-green-500 mr-2 flex-shrink-0"
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
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {loading
                      ? t("processing")
                      : plan.buttonText || `${t("select")} ${plan.name}`}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 当用户已有有效购买时的提示 */}
      {!shouldShowUpgradeOptions() && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              {t("validPlanOwned")}
            </CardTitle>
            <CardDescription>
              {t("thankYouForSupport", {
                type:
                  PRICING_CONFIG.display.showOneTime &&
                  !PRICING_CONFIG.display.showSubscription
                    ? t("purchase")
                    : t("subscription"),
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* 庆祝区域 */}
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-lg font-medium mb-2">
                {t("allFeaturesUnlocked")}
              </p>
              <p className="text-gray-600 mb-4">
                {PRICING_CONFIG.display.showOneTime &&
                !PRICING_CONFIG.display.showSubscription
                  ? t("enjoyPermanentAccess")
                  : t("enjoySubscriptionService")}
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <Crown className="h-4 w-4 mr-2" />
                {PRICING_CONFIG.display.showOneTime &&
                !PRICING_CONFIG.display.showSubscription
                  ? t("purchase")
                  : t("subscription")}{" "}
                {t("purchased")}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 帮助和支持 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("needHelp")}</CardTitle>
          <CardDescription>{t("needHelpDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{t("technicalSupport")}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  {t("technicalSupportDesc")}
                </p>
                <Button variant="outline" size="sm">
                  {t("contactTechnicalSupport")}
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">
                  {PRICING_CONFIG.display.showSubscription
                    ? t("subscriptionIssues")
                    : t("purchaseIssues")}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {PRICING_CONFIG.display.showSubscription
                    ? t("subscriptionIssuesDesc")
                    : t("purchaseIssuesDesc")}
                </p>
                <Button variant="outline" size="sm">
                  {t("contactCustomerService")}
                </Button>
              </div>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-500">{t("workingHours")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
