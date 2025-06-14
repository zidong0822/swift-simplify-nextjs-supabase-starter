import { PricingPlan } from "@/types/stripe";

// 价格配置 - 可以轻松修改
export const PRICING_CONFIG = {
  // 显示控制
  display: {
    // 是否显示整个价格组件
    showPricing: true,
    // 是否显示切换器
    showToggle: false,
    // 是否显示一次性购买模式
    showOneTime: true,
    // 是否显示订阅模式
    showSubscription: false,
    // 是否显示年度订阅选项
    showYearlySubscription: false,
  },
  // 默认模式
  defaultMode: "subscription" as "onetime" | "subscription",
  // 模式标签
  labels: {
    onetime: "一次性购买",
    subscription: "订阅模式",
    yearly: "年度订阅",
  },
  // 模式描述
  descriptions: {
    onetime: "💎 一次性购买，永久拥有，无需续费",
    subscription: "🔄 按月订阅，持续更新，随时取消",
    yearly: "💰 年度订阅，享受更多优惠",
  },
};

// 单次购买计划配置
export const oneTimePlans: PricingPlan[] = [
  {
    name: "Starter Kit",
    price: "$29",
    description: "一次性购买，永久使用",
    features: [
      "完整的 Next.js 模板",
      "基础组件库",
      "文档和教程",
      "社区支持",
      "终身更新",
    ],
    buttonText: "立即购买",
    buttonVariant: "outline" as const,
    popular: false,
    priceId: "price_1RZUWH2cmOQ9qmEBMH8d9GFg", // 替换为您的实际Stripe价格ID
    isFree: false,
    isSubscription: false,
    // 显示控制
    visible: true,
  },
  {
    name: "Pro",
    price: "$99",
    description: "专业开发者一次性购买",
    features: [
      "包含 Starter Kit 所有功能",
      "高级组件库",
      "多个模板变体",
      "优先邮件支持",
      "商业使用许可",
      "源码访问权限",
    ],
    buttonText: "立即购买",
    buttonVariant: "default" as const,
    popular: true,
    priceId: "price_onetime_pro", // 替换为您的实际Stripe价格ID
    isFree: false,
    isSubscription: false,
    visible: true,
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
    priceId: "price_onetime_enterprise", // 替换为您的实际Stripe价格ID
    isFree: false,
    isSubscription: false,
    visible: true,
  },
];

// 订阅计划配置
export const subscriptionPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$9/月",
    description: "适合个人开发者",
    features: ["基础模板访问", "月度组件更新", "社区支持", "基础文档"],
    buttonText: "开始订阅",
    buttonVariant: "outline" as const,
    popular: false,
    priceId: "price_sub_basic_monthly", // 替换为您的实际Stripe价格ID
    isFree: false,
    isSubscription: true,
    visible: true,
  },
  {
    name: "Pro",
    price: "$29/月",
    description: "专业开发者的最佳选择",
    features: [
      "包含 Basic 所有功能",
      "高级组件库",
      "优先支持",
      "API 访问",
      "自定义主题",
      "团队协作（最多5人）",
    ],
    buttonText: "开始订阅",
    buttonVariant: "default" as const,
    popular: true,
    priceId: "price_sub_pro_monthly", // 替换为您的实际Stripe价格ID
    isFree: false,
    isSubscription: true,
    visible: true,
  },
  {
    name: "Enterprise",
    price: "$99/月",
    description: "大型团队和企业",
    features: [
      "包含 Pro 所有功能",
      "无限团队成员",
      "专属客户经理",
      "SLA 保证",
      "自定义集成",
      "高级分析",
    ],
    buttonText: "开始订阅",
    buttonVariant: "outline" as const,
    popular: false,
    priceId: "price_sub_enterprise_monthly", // 替换为您的实际Stripe价格ID
    isFree: false,
    isSubscription: true,
    visible: true,
  },
];

// 年度订阅计划配置（可选）
export const yearlySubscriptionPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$90/年",
    description: "适合个人开发者（节省2个月费用）",
    features: [
      "基础模板访问",
      "月度组件更新",
      "社区支持",
      "基础文档",
      "💰 相比月付节省17%",
    ],
    buttonText: "年付订阅",
    buttonVariant: "outline" as const,
    popular: false,
    priceId: "price_sub_basic_yearly",
    isFree: false,
    isSubscription: true,
    visible: true,
  },
  {
    name: "Pro",
    price: "$290/年",
    description: "专业开发者的最佳选择（节省2个月费用）",
    features: [
      "包含 Basic 所有功能",
      "高级组件库",
      "优先支持",
      "API 访问",
      "自定义主题",
      "团队协作（最多5人）",
      "💰 相比月付节省17%",
    ],
    buttonText: "年付订阅",
    buttonVariant: "default" as const,
    popular: true,
    priceId: "price_sub_pro_yearly",
    isFree: false,
    isSubscription: true,
    visible: true,
  },
  {
    name: "Enterprise",
    price: "$990/年",
    description: "大型团队和企业（节省2个月费用）",
    features: [
      "包含 Pro 所有功能",
      "无限团队成员",
      "专属客户经理",
      "SLA 保证",
      "自定义集成",
      "高级分析",
      "💰 相比月付节省17%",
    ],
    buttonText: "年付订阅",
    buttonVariant: "outline" as const,
    popular: false,
    priceId: "price_sub_enterprise_yearly",
    isFree: false,
    isSubscription: true,
    visible: true,
  },
];
