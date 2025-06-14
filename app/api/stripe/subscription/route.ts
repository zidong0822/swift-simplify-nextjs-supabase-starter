import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createClient } from "@/supabase/server";

export async function GET() {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    // 验证用户身份
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 从数据库获取用户的支付记录和订阅信息
    const supabase = await createClient();

    try {
      // 获取用户的支付记录
      const { data: payments } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      // 获取用户的订阅记录
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      // 转换为前端期望的格式
      const formattedSubscriptions = subscriptions?.map(sub => ({
        id: sub.stripe_subscription_id,
        status: sub.status,
        items: {
          data: [{
            price: {
              nickname: sub.plan_name,
              unit_amount: sub.plan_price,
              recurring: {
                interval: sub.plan_interval
              }
            }
          }]
        },
        current_period_start: Math.floor(new Date(sub.current_period_start).getTime() / 1000),
        current_period_end: Math.floor(new Date(sub.current_period_end).getTime() / 1000),
        cancel_at_period_end: sub.cancel_at_period_end
      })) || [];

      // 转换支付记录为发票格式
      const formattedInvoices = payments?.map(payment => ({
        id: payment.stripe_session_id,
        amount_paid: payment.amount,
        status: payment.status,
        created: Math.floor(new Date(payment.created_at).getTime() / 1000),
        hosted_invoice_url: '#' // 一次性支付没有发票URL
      })) || [];

      return NextResponse.json({
        subscriptions: formattedSubscriptions,
        invoices: formattedInvoices,
      });
    } catch (error) {
      console.error("Error fetching user payment data:", error);
      // 如果数据库查询失败，返回空数据
      return NextResponse.json({
        subscriptions: [],
        invoices: [],
      });
    }
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
