import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // 支持的语言列表
  locales: ['en', 'zh', 'ja'],
  // 默认语言
  defaultLocale: 'en',
  // 不在路由中使用语言前缀
  localePrefix: 'never'
});

export type Locale = (typeof routing.locales)[number]; 