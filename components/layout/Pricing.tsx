"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStripe } from "@/hooks/useStripe";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { PricingPlan } from "@/types/stripe";
import {
  PRICING_CONFIG,
  oneTimePlans,
  subscriptionPlans,
  yearlySubscriptionPlans,
} from "@/config/pricing";

const checkIcon = (
  <svg
    className="h-5 w-5 text-primary mr-2"
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
);

export default function Pricing() {
  const { user } = useAuth();
  const { redirectToCheckout, loading } = useStripe();
  const {
    canPurchase,
    hasActiveSubscription,
    hasPurchased,
    loading: purchasesLoading,
  } = useUserPurchases();

  // 价格模式切换状态
  const [pricingMode, setPricingMode] = useState<"onetime" | "subscription">(
    PRICING_CONFIG.defaultMode
  );

  // 根据配置和当前模式获取计划并过滤可见的计划
  const getVisiblePlans = () => {
    let plans: PricingPlan[] = [];

    // 如果不显示切换器，根据配置自动确定显示哪种模式
    if (!PRICING_CONFIG.display.showToggle) {
      if (PRICING_CONFIG.display.showOneTime) {
        plans = oneTimePlans;
      } else if (PRICING_CONFIG.display.showSubscription) {
        if (PRICING_CONFIG.display.showYearlySubscription) {
          plans = yearlySubscriptionPlans;
        } else {
          plans = subscriptionPlans;
        }
      }
    } else {
      // 显示切换器时，根据当前选择的模式
      if (pricingMode === "onetime" && PRICING_CONFIG.display.showOneTime) {
        plans = oneTimePlans;
      } else if (
        pricingMode === "subscription" &&
        PRICING_CONFIG.display.showSubscription
      ) {
        if (PRICING_CONFIG.display.showYearlySubscription) {
          plans = yearlySubscriptionPlans;
        } else {
          plans = subscriptionPlans;
        }
      }
    }

    // 只返回 visible 为 true 的计划
    return plans.filter((plan) => plan.visible !== false);
  };

  const currentPlans = getVisiblePlans();

  // 获取当前应该显示的描述
  const getCurrentDescription = () => {
    if (!PRICING_CONFIG.display.showToggle) {
      if (PRICING_CONFIG.display.showOneTime) {
        return PRICING_CONFIG.descriptions.onetime;
      } else if (PRICING_CONFIG.display.showSubscription) {
        if (PRICING_CONFIG.display.showYearlySubscription) {
          return PRICING_CONFIG.descriptions.yearly;
        } else {
          return PRICING_CONFIG.descriptions.subscription;
        }
      }
    }
    return PRICING_CONFIG.descriptions[pricingMode];
  };

  const handleSubscribe = async (plan: PricingPlan) => {
    if (plan.isFree) {
      // 处理免费计划逻辑
      toast.success("欢迎使用免费计划！");
      return;
    }

    if (!user) {
      toast.error("请先登录");
      return;
    }

    if (!plan.priceId) {
      toast.error("价格配置错误，请联系客服");
      return;
    }

    // 检查是否可以购买
    console.log("plan.name", plan.name);
    console.log("plan.isSubscription", plan.isSubscription);
    const purchaseCheck = canPurchase(plan.name, plan.isSubscription || false);
    console.log("purchaseCheck", purchaseCheck);
    if (!purchaseCheck.canPurchase) {
      toast.error(purchaseCheck.reason || "无法购买此计划");
      return;
    }

    try {
      await redirectToCheckout(plan.priceId);
    } catch {
      toast.error("支付初始化失败，请重试");
    }
  };

  // 获取按钮文本和状态
  const getButtonProps = (plan: PricingPlan) => {
    if (plan.isFree) {
      return {
        text: plan.buttonText,
        disabled: false,
        variant: plan.buttonVariant,
      };
    }

    if (!user) {
      return {
        text: "登录后购买",
        disabled: false,
        variant: plan.buttonVariant,
      };
    }

    if (purchasesLoading) {
      return {
        text: "检查中...",
        disabled: true,
        variant: plan.buttonVariant,
      };
    }

    // 检查是否已购买或订阅这个具体计划
    if (plan.isSubscription && hasActiveSubscription(plan.name)) {
      return {
        text: "已订阅",
        disabled: true,
        variant: "outline" as const,
      };
    }

    if (!plan.isSubscription && hasPurchased(plan.name)) {
      return {
        text: "已购买",
        disabled: true,
        variant: "outline" as const,
      };
    }

    // 对于订阅计划，如果用户已有其他订阅，显示切换选项
    if (plan.isSubscription && hasActiveSubscription()) {
      return {
        text: "切换订阅",
        disabled: false,
        variant: "outline" as const,
      };
    }

    return {
      text: loading ? "处理中..." : plan.buttonText,
      disabled: loading,
      variant: plan.buttonVariant,
    };
  };

  // 如果配置为不显示价格组件，则返回 null
  if (!PRICING_CONFIG.display.showPricing) {
    return null;
  }

  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
          Simple, Transparent <span className="text-primary">Pricing</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Choose the plan that works best for your project needs
        </p>

        {/* 价格模式切换器 */}
        {PRICING_CONFIG.display.showToggle && (
          <>
            <div className="flex justify-center mb-12">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-1 shadow-md">
                <button
                  onClick={() => setPricingMode("onetime")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    pricingMode === "onetime"
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {PRICING_CONFIG.labels.onetime}
                </button>
                <button
                  onClick={() => setPricingMode("subscription")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    pricingMode === "subscription"
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {PRICING_CONFIG.labels.subscription}
                </button>
              </div>
            </div>
          </>
        )}

        {/* 模式说明 - 无论是否显示切换器都显示 */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getCurrentDescription()}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {currentPlans.map((plan) => {
            const buttonProps = getButtonProps(plan);

            return (
              <div
                key={plan.name}
                className={`bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg flex flex-col relative ${
                  plan.popular
                    ? "border-2 border-primary"
                    : "border border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-3 rounded-full font-medium">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">{plan.price}</div>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {checkIcon}
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={buttonProps.variant}
                  className="w-full"
                  onClick={() => handleSubscribe(plan)}
                  disabled={buttonProps.disabled}
                >
                  {buttonProps.text}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
