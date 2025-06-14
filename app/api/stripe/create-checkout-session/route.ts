import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createClient } from "@/supabase/server";

export async function POST(request: NextRequest) {
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

    const { priceId, successUrl, cancelUrl } = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // 获取或创建 Stripe 客户
    const supabase = await createClient();
    let stripeCustomerId: string;

    // 检查用户是否已有 Stripe 客户 ID
    const { data: existingCustomer } = await supabase
      .from('user_stripe_customers')
      .select('stripe_customer_id')
      .eq('user_id', session.user.id)
      .single();

    if (existingCustomer?.stripe_customer_id) {
      stripeCustomerId = existingCustomer.stripe_customer_id;
    } else {
      // 创建新的 Stripe 客户
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name || undefined,
        metadata: {
          user_id: session.user.id,
        },
      });

      stripeCustomerId = customer.id;

      // 保存客户 ID 到数据库
      await supabase.from('user_stripe_customers').insert({
        user_id: session.user.id,
        stripe_customer_id: customer.id,
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment", // 改为一次性支付模式
      payment_method_types: ["card"],
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url:
        successUrl ||
        `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${request.nextUrl.origin}/pricing`,
      allow_promotion_codes: true,
      metadata: {
        user_id: session.user.id,
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
