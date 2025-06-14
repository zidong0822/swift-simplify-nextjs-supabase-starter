export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: 'default' | 'outline'
  popular: boolean
  priceId: string | null
  isFree: boolean
  isSubscription?: boolean // 是否为订阅计划
  visible?: boolean // 是否显示此计划
}

export interface CheckoutSessionRequest {
  priceId: string
  successUrl?: string
  cancelUrl?: string
}

export interface CheckoutSessionResponse {
  sessionId: string
}

export interface StripeWebhookEvent {
  id: string
  type: string
  data: {
    object: Record<string, unknown>
  }
} 