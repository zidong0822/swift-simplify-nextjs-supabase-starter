import { PricingPlan } from "@/types/stripe";

// 场景1：只显示一次性购买，不显示切换器
export const SCENARIO_ONETIME_ONLY = {
  display: {
    showPricing: true,
    showToggle: false,
    showOneTime: true,
    showSubscription: false,
    showYearlySubscription: false,
  },
  defaultMode: "onetime" as "onetime" | "subscription",
  labels: {
    onetime: "一次性购买",
    subscription: "订阅模式",
    yearly: "年度订阅",
  },
  descriptions: {
    onetime: "💎 一次性购买，永久拥有，无需续费",
    subscription: "🔄 按月订阅，持续更新，随时取消",
    yearly: "💰 年度订阅，享受更多优惠",
  },
};

// 场景2：只显示订阅模式，不显示切换器
export const SCENARIO_SUBSCRIPTION_ONLY = {
  display: {
    showPricing: true,
    showToggle: false,
    showOneTime: false,
    showSubscription: true,
    showYearlySubscription: false,
  },
  defaultMode: "subscription" as "onetime" | "subscription",
  labels: {
    onetime: "一次性购买",
    subscription: "订阅模式",
    yearly: "年度订阅",
  },
  descriptions: {
    onetime: "💎 一次性购买，永久拥有，无需续费",
    subscription: "🔄 按月订阅，持续更新，随时取消",
    yearly: "💰 年度订阅，享受更多优惠",
  },
};

// 场景3：显示年度订阅，不显示切换器
export const SCENARIO_YEARLY_ONLY = {
  display: {
    showPricing: true,
    showToggle: false,
    showOneTime: false,
    showSubscription: true,
    showYearlySubscription: true,
  },
  defaultMode: "subscription" as "onetime" | "subscription",
  labels: {
    onetime: "一次性购买",
    subscription: "年度订阅",
    yearly: "年度订阅",
  },
  descriptions: {
    onetime: "💎 一次性购买，永久拥有，无需续费",
    subscription: "💰 年度订阅，享受更多优惠",
    yearly: "💰 年度订阅，享受更多优惠",
  },
};

// 场景4：完全隐藏价格组件
export const SCENARIO_HIDDEN = {
  display: {
    showPricing: false,
    showToggle: false,
    showOneTime: false,
    showSubscription: false,
    showYearlySubscription: false,
  },
  defaultMode: "onetime" as "onetime" | "subscription",
  labels: {
    onetime: "一次性购买",
    subscription: "订阅模式",
    yearly: "年度订阅",
  },
  descriptions: {
    onetime: "💎 一次性购买，永久拥有，无需续费",
    subscription: "🔄 按月订阅，持续更新，随时取消",
    yearly: "💰 年度订阅，享受更多优惠",
  },
};

// 场景5：只显示特定计划
export const oneTimePlansLimited: PricingPlan[] = [
  {
    name: "Pro Kit",
    price: "$99",
    description: "专业开发者一次性购买",
    features: [
      "高级组件库",
      "多个模板变体",
      "优先邮件支持",
      "商业使用许可",
      "源码访问权限",
    ],
    buttonText: "立即购买",
    buttonVariant: "default" as const,
    popular: true,
    priceId: "price_onetime_pro",
    isFree: false,
    isSubscription: false,
    visible: true, // 显示
  },
  {
    name: "Enterprise Kit",
    price: "$299",
    description: "企业级一次性购买",
    features: [
      "包含 Pro Kit 所有功能",
      "企业级组件",
      "自定义主题工具",
      "专属技术支持",
      "团队协作功能",
      "白标解决方案",
    ],
    buttonText: "立即购买",
    buttonVariant: "outline" as const,
    popular: false,
    priceId: "price_onetime_enterprise",
    isFree: false,
    isSubscription: false,
    visible: false, // 隐藏此计划
  },
];

// 使用示例：
// 1. 在 config/pricing.ts 中，将 PRICING_CONFIG 替换为上述任一场景
// 2. 或者根据条件动态选择配置

// 动态配置示例
export const getDynamicConfig = (userType: "free" | "paid" | "enterprise") => {
  switch (userType) {
    case "free":
      return SCENARIO_ONETIME_ONLY;
    case "paid":
      return SCENARIO_SUBSCRIPTION_ONLY;
    case "enterprise":
      return SCENARIO_YEARLY_ONLY;
    default:
      return SCENARIO_ONETIME_ONLY;
  }
};
