import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Subscription {
  id: string
  status: string
  plan: {
    name: string
    price: number
    interval: string
  }
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

interface Invoice {
  id: string
  amount: number
  status: string
  created: Date
  invoiceUrl: string
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/stripe/subscription')
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscription data')
      }

      const data = await response.json()
      
      // 处理订阅数据
      if (data.subscriptions && data.subscriptions.length > 0) {
        const sub = data.subscriptions[0] // 假设用户只有一个活跃订阅
        setSubscription({
          id: sub.id,
          status: sub.status,
          plan: {
            name: sub.items.data[0]?.price?.nickname || 'Pro',
            price: (sub.items.data[0]?.price?.unit_amount || 0) / 100,
            interval: sub.items.data[0]?.price?.recurring?.interval || 'month'
          },
          currentPeriodStart: new Date(sub.current_period_start * 1000),
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
          cancelAtPeriodEnd: sub.cancel_at_period_end
        })
      }

      // 处理发票数据
      if (data.invoices) {
        setInvoices(data.invoices.map((invoice: Record<string, unknown>) => ({
          id: invoice.id as string,
          amount: (invoice.amount_paid as number) / 100,
          status: invoice.status as string,
          created: new Date((invoice.created as number) * 1000),
          invoiceUrl: (invoice.hosted_invoice_url as string) || '#'
        })))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('获取订阅信息失败')
    } finally {
      setLoading(false)
    }
  }

  const cancelSubscription = async (subscriptionId: string) => {
    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
      })

      if (!response.ok) {
        throw new Error('Failed to cancel subscription')
      }

      const data = await response.json()
      
      if (data.success) {
        toast.success('订阅已取消，将在当前计费周期结束后生效')
        // 刷新订阅数据
        await fetchSubscriptionData()
      }
    } catch (err) {
      toast.error('取消订阅失败，请重试')
      throw err
    }
  }

  useEffect(() => {
    fetchSubscriptionData()
  }, [])

  return {
    subscription,
    invoices,
    loading,
    error,
    refetch: fetchSubscriptionData,
    cancelSubscription,
  }
} 