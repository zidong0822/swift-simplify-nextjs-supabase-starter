# 动画设计指南

## animate-ui 动画库

Swift Simplify 使用 `animate-ui` 动画库（v0.0.4）来创建流畅的用户界面动画。

### 安装

动画库已经包含在项目依赖中：

```json
{
  "dependencies": {
    "animate-ui": "^0.0.4"
  }
}
```

### 基础动画

1. **淡入淡出**
```tsx
import { FadeIn, FadeOut } from 'animate-ui'

// 组件示例
<FadeIn duration={0.3}>
  <div>淡入内容</div>
</FadeIn>
```

2. **滑动**
```tsx
import { SlideUp, SlideDown } from 'animate-ui'

// 组件示例
<SlideUp delay={0.2}>
  <div>向上滑入</div>
</SlideUp>
```

### 动画配置

1. **时间设置**
```tsx
// 动画持续时间
duration?: number // 默认: 0.3秒

// 动画延迟
delay?: number // 默认: 0秒

// 动画缓动函数
easing?: string // 默认: 'ease'
```

2. **动画属性**
```tsx
// 初始状态
initial?: object

// 动画状态
animate?: object

// 退出状态
exit?: object
```

### 最佳实践

1. **性能优化**
   - 使用 `will-change` 提示浏览器
   - 避免同时运行过多动画
   - 优先使用 transform 和 opacity

2. **可访问性**
   - 提供 `prefers-reduced-motion` 支持
   - 避免闪烁和剧烈运动
   - 保持动画时长适中

3. **响应式设计**
   - 在移动设备上使用简化动画
   - 考虑设备性能调整动画
   - 提供优雅降级方案

### 常用动画组合

1. **列表动画**
```tsx
import { StaggerChildren } from 'animate-ui'

// 组件示例
<StaggerChildren stagger={0.1}>
  {items.map(item => (
    <FadeIn key={item.id}>
      <div>{item.content}</div>
    </FadeIn>
  ))}
</StaggerChildren>
```

2. **页面转场**
```tsx
import { PageTransition } from 'animate-ui'

// 组件示例
<PageTransition>
  <div>页面内容</div>
</PageTransition>
```

### 自定义动画

1. **创建自定义动画**
```tsx
import { createAnimation } from 'animate-ui'

const CustomAnimation = createAnimation({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
})
```

2. **组合动画**
```tsx
import { combineAnimations } from 'animate-ui'

const CombinedAnimation = combineAnimations([
  FadeIn,
  SlideUp
])
```

### 动画触发器

1. **滚动触发**
```tsx
import { ScrollAnimation } from 'animate-ui'

// 组件示例
<ScrollAnimation>
  <div>滚动时显示的内容</div>
</ScrollAnimation>
```

2. **悬停触发**
```tsx
import { HoverAnimation } from 'animate-ui'

// 组件示例
<HoverAnimation>
  <div>悬停时的动画效果</div>
</HoverAnimation>
```

## 项目动画规范

1. **交互反馈**
   - 按钮点击效果
   - 表单提交状态
   - 加载动画
   - 错误提示

2. **页面转场**
   - 路由切换动画
   - 模态框显示/隐藏
   - 列表项进入/退出
   - 卡片展开/收起

3. **微交互**
   - 图标动画
   - 提示信息
   - 状态变化
   - 进度指示 