"use client";

import { 
  Header,
  Hero,
  TargetUsers,
  Features,
  Testimonials,
  GetStarted,
  FAQ,
  Pricing,
  CTA,
  Footer
} from '@/components/layout';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto">
      {/* 导航栏 */}
      <Header />
      
      {/* 主要内容区域 */}
      <main className="flex-1 pt-16">
        {/* Hero 主页面展示区 */}
        <Hero />
        
        {/* Target Users 目标用户区域 */}
        <div id="target-users">
          <TargetUsers />
        </div>
        
        {/* Features 功能特性区域 */}
        <div id="features">
          <Features />
        </div>
        
        {/* Testimonials 用户评价区域 */}
        <div id="testimonials">
          <Testimonials />
        </div>
        
        {/* Get Started 开始使用指南 */}
        <div id="get-started">
          <GetStarted />
        </div>
        
        {/* FAQ 常见问题 */}
        <div id="faq">
          <FAQ />
        </div>
        
        {/* Pricing 价格方案 */}
        <div id="pricing">
          <Pricing />
        </div>
        
        {/* CTA 行动号召区域 */}
        <div id="cta">
          <CTA />
        </div>
      </main>
      
      {/* Footer 页脚 */}
      <Footer />
    </div>
  );
}
