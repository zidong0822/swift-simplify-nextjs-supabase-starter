// 支持的语言列表
export const locales = ['en', 'zh', 'ja'] as const;
export type Locale = (typeof locales)[number];

// 语言名称映射
export const languageNames = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
} as const; 