# 价格配置说明

## 概述

通过配置文件完全控制价格组件的显示，无需修改页面代码。

## 显示控制配置

### PRICING_CONFIG.display

```typescript
display: {
  showPricing: true,           // 是否显示整个价格组件
  showToggle: true,            // 是否显示切换器
  showOneTime: true,           // 是否显示一次性购买模式
  showSubscription: true,      // 是否显示订阅模式
  showYearlySubscription: false, // 是否显示年度订阅
}
```

### 计划级别控制

每个计划都有 `visible` 属性：

```typescript
{
  name: "Pro Kit",
  // ... 其他配置
  visible: true,  // true=显示, false=隐藏
}
```

## 常见场景配置

### 1. 只显示一次性购买

```typescript
// 在 config/pricing.ts 中
export const PRICING_CONFIG = {
  display: {
    showPricing: true,
    showToggle: false,        // 隐藏切换器
    showOneTime: true,        // 显示一次性购买
    showSubscription: false,  // 隐藏订阅
    showYearlySubscription: false,
  },
  defaultMode: "onetime",
  // ...
};
```

### 2. 只显示订阅模式

```typescript
export const PRICING_CONFIG = {
  display: {
    showPricing: true,
    showToggle: false,        // 隐藏切换器
    showOneTime: false,       // 隐藏一次性购买
    showSubscription: true,   // 显示订阅
    showYearlySubscription: false,
  },
  defaultMode: "subscription",
  // ...
};
```

### 3. 完全隐藏价格组件

```typescript
export const PRICING_CONFIG = {
  display: {
    showPricing: false,       // 隐藏整个组件
    // 其他设置无效
  },
  // ...
};
```

### 4. 隐藏特定计划

```typescript
// 在计划数组中设置 visible: false
{
  name: "Enterprise Kit",
  // ... 其他配置
  visible: false,  // 隐藏此计划
}
```

## 动态配置

可以根据用户类型或其他条件动态选择配置：

```typescript
// 在组件中
const config = getUserType() === 'enterprise' 
  ? SCENARIO_YEARLY_ONLY 
  : SCENARIO_ONETIME_ONLY;
```

## 预设场景

查看 `config/pricing-scenarios.ts` 文件中的预设场景：

- `SCENARIO_ONETIME_ONLY`: 只显示一次性购买
- `SCENARIO_SUBSCRIPTION_ONLY`: 只显示订阅
- `SCENARIO_YEARLY_ONLY`: 只显示年度订阅
- `SCENARIO_HIDDEN`: 完全隐藏

## 使用方法

1. **简单配置**: 直接修改 `config/pricing.ts` 中的 `PRICING_CONFIG`
2. **场景切换**: 将 `PRICING_CONFIG` 替换为预设场景
3. **动态配置**: 使用 `getDynamicConfig()` 函数

## 实际效果

- ✅ **完全通过配置控制**，无需修改组件代码
- ✅ **支持细粒度控制**，可以隐藏特定计划
- ✅ **支持场景切换**，快速应用不同的显示策略
- ✅ **支持动态配置**，根据用户状态调整显示 