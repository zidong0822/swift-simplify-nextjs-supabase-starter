import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";
import { headers } from "next/headers";
import { createClient } from "@/supabase/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  console.log("Stripe webhook received");
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature found" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    const supabase = await createClient();

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Payment successful:", session.id);

        // 保存支付记录到数据库
        try {
          // 获取用户 ID（需要从 session 的 metadata 或 customer 获取）
          let userId = session.metadata?.user_id;

          if (!userId && session.customer) {
            // 如果没有 user_id metadata，尝试从 customer 获取
            const { data: customerData } = await supabase
              .from("user_stripe_customers")
              .select("user_id")
              .eq("stripe_customer_id", session.customer)
              .single();

            userId = customerData?.user_id;
          }

          if (userId) {
            // 保存支付记录
            await supabase.from("payments").insert({
              user_id: userId,
              stripe_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent,
              amount: session.amount_total,
              currency: session.currency,
              status:
                session.payment_status === "paid"
                  ? "succeeded"
                  : session.payment_status,
              product_name: "Unknown Product",
            });

            console.log("Payment record saved for user:", userId);
          } else {
            console.warn("Could not find user_id for session:", session.id);
          }
        } catch (dbError) {
          console.error("Error saving payment record:", dbError);
        }
        break;

      case "customer.subscription.created":
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription created:", subscription.id);

        try {
          // 获取用户 ID
          const { data: customerData } = await supabase
            .from("user_stripe_customers")
            .select("user_id")
            .eq("stripe_customer_id", subscription.customer)
            .single();

          if (customerData?.user_id) {
            // 保存订阅记录
            await supabase.from("subscriptions").insert({
              user_id: customerData.user_id,
              stripe_subscription_id: subscription.id,
              stripe_customer_id: subscription.customer,
              status: subscription.status,
              plan_name: subscription.items.data[0]?.price?.nickname || "Pro",
              plan_price: subscription.items.data[0]?.price?.unit_amount || 0,
              plan_interval:
                subscription.items.data[0]?.price?.recurring?.interval ||
                "month",
              current_period_start: new Date(
                (
                  subscription as Stripe.Subscription & {
                    current_period_start: number;
                  }
                ).current_period_start * 1000
              ),
              current_period_end: new Date(
                (
                  subscription as Stripe.Subscription & {
                    current_period_end: number;
                  }
                ).current_period_end * 1000
              ),
              cancel_at_period_end: subscription.cancel_at_period_end,
            });

            console.log(
              "Subscription record saved for user:",
              customerData.user_id
            );
          }
        } catch (dbError) {
          console.error("Error saving subscription record:", dbError);
        }
        break;

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object as Stripe.Subscription;
        console.log("Subscription updated:", updatedSubscription.id);

        try {
          // 更新订阅记录
          await supabase
            .from("subscriptions")
            .update({
              status: updatedSubscription.status,
              current_period_start: new Date(
                (
                  updatedSubscription as Stripe.Subscription & {
                    current_period_start: number;
                  }
                ).current_period_start * 1000
              ),
              current_period_end: new Date(
                (
                  updatedSubscription as Stripe.Subscription & {
                    current_period_end: number;
                  }
                ).current_period_end * 1000
              ),
              cancel_at_period_end: updatedSubscription.cancel_at_period_end,
              updated_at: new Date(),
            })
            .eq("stripe_subscription_id", updatedSubscription.id);

          console.log("Subscription updated:", updatedSubscription.id);
        } catch (dbError) {
          console.error("Error updating subscription record:", dbError);
        }
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription;
        console.log("Subscription cancelled:", deletedSubscription.id);

        try {
          // 更新订阅状态为已取消
          await supabase
            .from("subscriptions")
            .update({
              status: "canceled",
              updated_at: new Date(),
            })
            .eq("stripe_subscription_id", deletedSubscription.id);

          console.log("Subscription cancelled:", deletedSubscription.id);
        } catch (dbError) {
          console.error("Error updating subscription status:", dbError);
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
