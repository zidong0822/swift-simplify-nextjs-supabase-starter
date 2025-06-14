import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createClient } from "@/supabase/server";

export async function GET() {
  try {
    // 验证用户身份
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    // 获取用户的支付记录
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('id, product_name, amount, currency, status, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (paymentsError) {
      console.error('Error fetching payments:', paymentsError);
      return NextResponse.json(
        { error: "Failed to fetch payments" },
        { status: 500 }
      );
    }

    // 获取用户的订阅记录
    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('subscriptions')
      .select('id, plan_name, status, current_period_end, cancel_at_period_end, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (subscriptionsError) {
      console.error('Error fetching subscriptions:', subscriptionsError);
      return NextResponse.json(
        { error: "Failed to fetch subscriptions" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      purchases: payments || [],
      subscriptions: subscriptions || [],
    });
  } catch (error) {
    console.error("Error in user-purchases API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 