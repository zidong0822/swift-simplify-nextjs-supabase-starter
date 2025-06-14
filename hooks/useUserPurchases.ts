"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';

export interface UserPurchase {
  id: string;
  product_name: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

export interface UserSubscription {
  id: string;
  plan_name: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export const useUserPurchases = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 检查用户是否已购买特定产品
  const hasPurchased = (productName: string): boolean => {
    return purchases.some(
      purchase => 
        purchase.product_name === productName && 
        purchase.status === 'succeeded'
    );
  };

  // 检查用户是否有活跃订阅
  const hasActiveSubscription = (planName?: string): boolean => {
    const activeSubscriptions = subscriptions.filter(
      sub => sub.status === 'active' && new Date(sub.current_period_end) > new Date()
    );

    if (planName) {
      return activeSubscriptions.some(sub => sub.plan_name === planName);
    }

    return activeSubscriptions.length > 0;
  };

  // 获取用户的购买和订阅信息
  const fetchUserPurchases = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/stripe/user-purchases', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user purchases');
      }

      const data = await response.json();
      setPurchases(data.purchases || []);
      setSubscriptions(data.subscriptions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // 检查是否可以购买特定计划
  const canPurchase = (planName: string, isSubscription: boolean = false): {
    canPurchase: boolean;
    reason?: string;
  } => {
    if (!user) {
      return { canPurchase: false, reason: '请先登录' };
    }

    if (isSubscription) {
      if (hasActiveSubscription(planName)) {
        return { canPurchase: false, reason: '您已经订阅了此计划' };
      }
      if (hasActiveSubscription()) {
        return { canPurchase: false, reason: '您已有活跃订阅，请先取消当前订阅' };
      }
    } else {
      if (hasPurchased(planName)) {
        return { canPurchase: false, reason: '您已经购买过此产品' };
      }
    }

    return { canPurchase: true };
  };

  // 当用户登录状态改变时重新获取数据
  useEffect(() => {
    if (user) {
      fetchUserPurchases();
    } else {
      setPurchases([]);
      setSubscriptions([]);
    }
  }, [user]);

  return {
    purchases,
    subscriptions,
    loading,
    error,
    hasPurchased,
    hasActiveSubscription,
    canPurchase,
    refetch: fetchUserPurchases,
  };
}; 