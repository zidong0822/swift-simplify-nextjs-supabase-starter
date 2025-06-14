import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, AlertCircle } from "lucide-react";
import { stripe } from "@/lib/stripe-server";
import { createClient } from "@/supabase/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/#pricing");
  }

  try {
    // 验证用户身份
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      redirect("/login");
    }

    // 从 Stripe 获取支付会话信息
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      session_id,
      {
        expand: ["line_items", "payment_intent"],
      }
    );

    if (checkoutSession.payment_status !== "paid") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              支付处理中
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              您的支付正在处理中，请稍后查看订单状态。
            </p>
            <Button asChild className="w-full">
              <Link href="/dashboard/billing">查看订单状态</Link>
            </Button>
          </div>
        </div>
      );
    }

    // 检查数据库中的支付记录
    const supabase = await createClient();
    const { data: paymentRecord, error } = await supabase
      .from("payments")
      .select("*")
      .eq("stripe_session_id", session_id)
      .eq("user_id", session.user.id)
      .single();

    console.log("Payment record from DB:", paymentRecord);
    console.log("DB query error:", error);

    // 如果数据库中没有记录，手动创建一条
    if (!paymentRecord && error?.code === "PGRST116") {
      console.log("Creating payment record manually...");

      const { data: newPaymentRecord, error: insertError } = await supabase
        .from("payments")
        .insert({
          user_id: session.user.id,
          stripe_session_id: session_id,
          stripe_payment_intent_id: checkoutSession.payment_intent as string,
          amount: checkoutSession.amount_total || 0,
          currency: checkoutSession.currency || "usd",
          status: "succeeded",
          product_name:
            checkoutSession.line_items?.data[0]?.description ||
            "Unknown Product",
        })
        .select()
        .single();

      console.log("Manually created payment record:", newPaymentRecord);
      console.log("Insert error:", insertError);
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            支付成功！
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            感谢您的购买！您的支付已成功处理。
          </p>

          {/* 显示支付详情 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">支付详情</h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">订单号:</span> {session_id}
              </p>
              <p>
                <span className="font-medium">金额:</span> $
                {(checkoutSession.amount_total || 0) / 100}
              </p>
              <p>
                <span className="font-medium">状态:</span>
                <span className="text-green-600 ml-1">已支付</span>
              </p>
              {paymentRecord && (
                <p>
                  <span className="font-medium">数据库记录:</span>
                  <span className="text-green-600 ml-1">已保存</span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/dashboard/billing">查看订单详情</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in success page:", error);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            处理错误
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            处理您的支付信息时出现错误，请联系客服。
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/dashboard/billing">查看订单状态</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
