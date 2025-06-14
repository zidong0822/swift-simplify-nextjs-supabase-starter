import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          支付成功！
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          感谢您的订阅！您的账户已经升级，现在可以享受所有高级功能。
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/dashboard">前往控制台</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">返回首页</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 