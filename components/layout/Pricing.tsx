"use client";

import { Button } from "@/components/ui/button";
import { useStripe } from "@/hooks/useStripe";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { PricingPlan } from "@/types/stripe";

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

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal projects",
    features: [
      "Full access to starter template",
      "Community support",
      "MIT license",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false,
    priceId: null, // 免费计划不需要Stripe价格ID
    isFree: true,
    isSubscription: false,
  },
  {
    name: "Pro",
    price: "$49",
    description: "For professional developers",
    features: [
      "Everything in Free",
      "Premium extensions",
      "Priority support",
      "Advanced components",
    ],
    buttonText: "Subscribe Now",
    buttonVariant: "default" as const,
    popular: true,
    priceId: "price_1RZUWH2cmOQ9qmEBMH8d9GFg", // 替换为您的实际Stripe价格ID
    isFree: false,
    isSubscription: true, // 这是订阅计划
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For teams and businesses",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "Team collaboration tools",
    ],
    buttonText: "Subscribe Now",
    buttonVariant: "outline" as const,
    popular: false,
    priceId: "price_1RZUWH2cmOQ9qmEBMH8d9GFg", // 替换为您的实际Stripe价格ID
    isFree: false,
    isSubscription: true, // 这是订阅计划
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const { redirectToCheckout, loading } = useStripe();
  const { 
    canPurchase, 
    hasActiveSubscription, 
    hasPurchased, 
    loading: purchasesLoading 
  } = useUserPurchases();

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
    const purchaseCheck = canPurchase(plan.name, plan.isSubscription || false);
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

    // 检查是否已购买或订阅
    if (hasActiveSubscription(plan.name)) {
      return {
        text: "已订阅",
        disabled: true,
        variant: "outline" as const,
      };
    }

    if (hasPurchased(plan.name)) {
      return {
        text: "已购买",
        disabled: true,
        variant: "outline" as const,
      };
    }

    if (hasActiveSubscription()) {
      return {
        text: "已有订阅",
        disabled: true,
        variant: "outline" as const,
      };
    }

    return {
      text: loading ? "处理中..." : plan.buttonText,
      disabled: loading,
      variant: plan.buttonVariant,
    };
  };

  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
          Simple, Transparent <span className="text-primary">Pricing</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
          Choose the plan that works best for your project needs
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => {
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
