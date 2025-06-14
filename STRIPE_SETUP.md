# Stripe 支付集成设置指南

## 环境变量配置

在您的 `.env.local` 文件中添加以下Stripe相关的环境变量：

```bash
# Stripe 配置
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 获取 Stripe 密钥

1. 登录到 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 在左侧菜单中点击 "Developers" > "API keys"
3. 复制 "Publishable key" 和 "Secret key"

## 创建产品和价格

1. 在 Stripe Dashboard 中，点击 "Products"
2. 点击 "Add product" 创建新产品
3. 为每个产品创建价格，并复制价格ID
4. 在 `components/layout/Pricing.tsx` 中更新 `priceId` 字段

```typescript
// 示例价格ID配置
{
  name: "Pro",
  priceId: "price_1234567890", // 替换为您的实际价格ID
  // ...
}
```

## 设置 Webhook

1. 在 Stripe Dashboard 中，点击 "Developers" > "Webhooks"
2. 点击 "Add endpoint"
3. 输入您的端点URL: `https://yourdomain.com/api/stripe/webhook`
4. 选择以下事件：
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. 复制 webhook 签名密钥并添加到环境变量中

## 测试支付

1. 使用 Stripe 提供的测试卡号进行测试：
   - 成功支付: `4242 4242 4242 4242`
   - 失败支付: `4000 0000 0000 0002`
   - 需要3D验证: `4000 0025 0000 3155`

2. 任何未来日期的过期时间和任何3位数的CVC都可以使用

## 生产环境部署

1. 将测试密钥替换为生产密钥
2. 更新 webhook 端点URL为生产域名
3. 确保所有价格ID都是生产环境的ID

## 功能特性

- ✅ 订阅支付处理
- ✅ Webhook 事件处理
- ✅ 支付成功/失败页面
- ✅ 加载状态和错误处理
- ✅ 中文界面支持

## 注意事项

- 确保在生产环境中使用HTTPS
- 定期检查webhook事件日志
- 监控支付失败和退款情况
- 实施适当的错误处理和日志记录 