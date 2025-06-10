# 主题设计规范

## 色彩系统

### 主要颜色

```css
--color-primary: #FF7A00;
--color-primary-light: #FF9433;
--color-primary-dark: #CC6200;

--color-secondary: #2563EB;
--color-secondary-light: #4B83F0;
--color-secondary-dark: #1E4FBD;

--color-accent: #10B981;
--color-accent-light: #34D399;
--color-accent-dark: #059669;
```

### 中性色

```css
--color-text-primary: #1F2937;
--color-text-secondary: #4B5563;
--color-text-tertiary: #6B7280;

--color-background: #FFFFFF;
--color-background-alt: #F9FAFB;
--color-background-hover: #F3F4F6;

--color-border: #E5E7EB;
--color-border-focus: #D1D5DB;
```

### 功能色

```css
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

## 排版

### 字体家族

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### 字体大小

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### 字重

```css
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;
```

### 行高

```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

## 间距系统

### 基础间距

```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
```

### 布局间距

```css
--layout-gutter: var(--spacing-4);
--layout-margin: var(--spacing-6);
--layout-container: 1280px;
```

## 圆角

```css
--radius-none: 0;
--radius-sm: 0.125rem;  /* 2px */
--radius-md: 0.25rem;   /* 4px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-full: 9999px;
```

## 阴影

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## 过渡

```css
--transition-all: all 0.3s ease;
--transition-colors: background-color 0.3s ease, border-color 0.3s ease;
--transition-opacity: opacity 0.3s ease;
--transition-transform: transform 0.3s ease;
```

## 断点

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

## 使用指南

### 1. 主题变量使用

```tsx
// 在组件中使用
const Button = styled.button`
  background-color: var(--color-primary);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  transition: var(--transition-all);
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
`;
```

### 2. 响应式设计

```css
@media (min-width: var(--breakpoint-md)) {
  .container {
    max-width: var(--breakpoint-md);
  }
}
```

### 3. 暗色主题

```css
[data-theme="dark"] {
  --color-background: #1F2937;
  --color-text-primary: #F9FAFB;
  --color-border: #374151;
  /* 其他暗色主题变量 */
}
```

### 4. 主题切换

```tsx
const toggleTheme = () => {
  document.documentElement.setAttribute(
    'data-theme',
    document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'light'
      : 'dark'
  );
};
``` 