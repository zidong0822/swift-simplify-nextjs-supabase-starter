# 组件设计规范

## 基础组件

### 按钮 (Button)

#### 变体
```tsx
// 主要按钮
<Button variant="primary">
  确认操作
</Button>

// 次要按钮
<Button variant="secondary">
  取消操作
</Button>

// 危险按钮
<Button variant="danger">
  删除
</Button>
```

#### 尺寸
- `sm`: 小型按钮
- `md`: 中型按钮（默认）
- `lg`: 大型按钮

#### 状态
- 默认
- 悬停
- 点击
- 禁用
- 加载中

### 输入框 (Input)

#### 类型
- 文本输入
- 密码输入
- 数字输入
- 搜索输入

#### 状态
- 默认
- 聚焦
- 错误
- 禁用
- 只读

### 选择器 (Select)

#### 功能
- 单选
- 多选
- 搜索过滤
- 分组选项

#### 交互
- 键盘导航
- 清除选择
- 自定义选项渲染

## 复合组件

### 表单 (Form)

#### 布局
- 垂直布局
- 水平布局
- 网格布局

#### 验证
- 实时验证
- 提交验证
- 自定义验证规则

### 表格 (Table)

#### 功能
- 排序
- 筛选
- 分页
- 选择

#### 自定义
- 自定义列渲染
- 展开行
- 固定列
- 虚拟滚动

### 对话框 (Dialog)

#### 类型
- 确认对话框
- 表单对话框
- 信息对话框
- 自定义对话框

#### 动画
- 淡入淡出
- 滑动
- 缩放

## 反馈组件

### 通知 (Toast)

#### 类型
- 成功
- 错误
- 警告
- 信息

#### 位置
- 顶部居中
- 右上角
- 右下角
- 左下角

### 加载中 (Loading)

#### 变体
- 旋转器
- 进度条
- 骨架屏
- 自定义动画

## 导航组件

### 导航栏 (Navbar)

#### 布局
- 固定顶部
- 响应式菜单
- 下拉菜单

### 标签页 (Tabs)

#### 样式
- 默认标签
- 卡片式标签
- 垂直标签

#### 功能
- 可关闭
- 可拖拽
- 溢出处理

## 数据展示

### 卡片 (Card)

#### 结构
- 标题
- 内容
- 操作区
- 封面图

### 列表 (List)

#### 类型
- 基础列表
- 头像列表
- 操作列表
- 虚拟列表

## 布局组件

### 网格 (Grid)

#### 特性
- 响应式
- 间距控制
- 对齐方式
- 排序

### 分割面板 (Split)

#### 功能
- 可调整大小
- 最小/最大限制
- 折叠/展开

## 最佳实践

1. **组件命名**
   - 使用 PascalCase
   - 语义化命名
   - 添加适当前缀

2. **Props 设计**
   - 必要性判断
   - 类型定义
   - 默认值设置

3. **样式封装**
   - 使用 CSS Modules
   - 主题定制
   - 响应式设计

4. **性能优化**
   - 组件拆分
   - 状态提升
   - 记忆化处理 