import Pricing from "@/components/layout/Pricing";

export default function PricingTestPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">价格配置测试</h1>
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">当前配置：</h2>
          <ul className="text-sm space-y-1">
            <li>• showToggle: false (不显示切换器)</li>
            <li>• showOneTime: false (不显示一次性购买)</li>
            <li>• showSubscription: true (显示订阅模式)</li>
            <li>• showYearlySubscription: true (显示年度订阅)</li>
            <li>• defaultMode: subscription</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            预期结果：只显示年度订阅计划，不显示切换器
          </p>
        </div>
        <Pricing />
      </div>
    </div>
  );
} 