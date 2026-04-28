# API Center v2 — 设计文档

## 概述

将现有 SenseCore API 中心改版为参考火山引擎 API Explorer 的三栏调试界面，同时保留产品列表页（沿用上版布局）。新增控制台级别引导弹窗、模拟登录拦截，去掉内部新手指引。

**目标用户：** SenseCore 控制台用户（开发者），通过导航栏「文档 > API Explorer」进入。

**技术方案：** 基于现有项目演进（方案 A），复用数据层和 ApiSidebar 组件，重构页面层。

---

## 路由结构

| 路由 | 页面组件 | 说明 |
|---|---|---|
| `/` | ConsoleHome | 假控制台主页（空壳），每次访问触发引导弹窗 |
| `/login` | LoginPage | 模拟登录页，输入任意内容即可登录 |
| `/api-explorer` | ProductList | 产品列表页（重定向到 `/api-explorer/ecs`） |
| `/api-explorer/:product` | ProductList | 侧边栏 + API 表格，展示指定产品的所有 API |
| `/api-explorer/:product/:endpoint` | ExplorerPage | 三栏调试界面 |

---

## 页面设计

### 1. 假控制台主页 (`/`)

**内容：** 仅导航栏 + 空白占位区域。

**引导弹窗：**
- 每次访问自动触发（demo 行为；生产环境仅首次登录触发）
- 全屏遮罩 + spotlight 高亮导航栏「文档」按钮
- 气泡弹窗内容："API 中心全新升级 — API Explorer 已迁移至导航栏「文档」菜单下"
- 按钮「知道了」关闭弹窗

### 2. 产品列表页 (`/api-explorer/:product`)

**布局：** 与上一版本首页一致 — 左侧 ApiSidebar + 右侧主内容区。

**左侧 ApiSidebar（复用）：**
- 标题「SenseCore API 中心」可点击回到列表首页
- 搜索框（搜索产品或 API）
- 产品树：可展开/折叠，显示分组和端点列表，带 API 数量统计

**右侧主内容区：**
- 产品标题 + 描述
- 搜索工具栏 + API 数量统计
- API 表格，4 列：
  - API 名称（粗体）
  - 描述
  - 请求路径（Method 彩色标签 + path）
  - 操作（「查看文档」链接 → 新标签打开帮助中心对应 URL）
- 点击行（操作列除外）→ 导航到 `/api-explorer/:product/:endpoint`

### 3. 三栏调试界面 (`/api-explorer/:product/:endpoint`)

**整体布局：** 导航栏 + 三栏（左 220px | 中弹性 | 右 380px）

#### 左栏 — 产品侧边栏 (220px)

复用 ApiSidebar 组件，与列表页共享。当前 API 高亮，点击切换 → 中栏/右栏内容更新。

#### 中栏 — 调试面板 (弹性宽度)

从上到下：

1. **标题栏**（固定在顶部）
   - 左：API 名称（如 `StartInstance`） + Method 标签 + 简述
   - 右：「发起调试」按钮（始终可见）

2. **可滚动内容区**
   - **鉴权信息卡片**（可收起）
     - 蓝色背景卡片
     - 展示 Bearer Token（脱敏） + 复制按钮
     - 提示：仅供调试 / 生产环境用 AK/SK / 获取 AK/SK 链接
     - 收起后仅显示一行 Token + 复制
   - **Region 选择器**（下拉框，背景色区分）
   - **输入参数区**
     - 标题 + 「只看必填」勾选框
     - 参数列表：表格行形式，每行含参数名、类型、输入框
     - 必填参数行用黄色背景 + 红色 `*` 标识
     - 每行输入框可填写值

3. **底部信息栏**（固定）
   - 参数统计（如 "3 个参数 · 1 必填"）
   - 「全部清空」按钮

#### 右栏 — 文档与结果 (380px)

两个 Tab：

1. **文档说明**（默认激活）
   - 通过 iframe 加载本地抓取的帮助中心 HTML 文件
   - 文件路径：`public/api-docs/{product}/{endpoint-id}.html`
   - 内容：该 API 的使用说明、请求参数说明、响应参数说明

2. **调试结果**
   - 点击「发起调试」后切换到此 Tab
   - 展示 mock 的请求信息（URL、Headers、Body）和响应结果（JSON）
   - 未发起调试时显示空状态提示

### 4. 模拟登录页 (`/login`)

**布局：** 导航栏 + 居中登录卡片。

**登录卡片：**
- 标题："登录 SenseCore"
- 副标题："登录后即可使用 API 在线调试功能"
- 表单：用户名/邮箱 + 密码（输入任意内容即可）
- 提交后：localStorage 设置登录态 → 跳回 `returnUrl`（来源页）

**登录态控制：**
- 默认未登录：浏览列表页、查看文档 Tab 不受限
- 点击「发起调试」时检查登录态，未登录 → 跳转 `/login?returnUrl=当前URL`
- 登录后：导航栏用户区显示用户名，「发起调试」正常执行

---

## 导航栏设计

**样式：** 沿用上版控制台风格（深色背景 `#1a1a2e`，48px 高）。

**「文档」下拉框：**
- hover 触发下拉
- 三个选项：
  - 文档中心 → 跳转帮助中心 URL（新标签）
  - API Explorer → `/api-explorer`（当前页面路由）
  - 统一命令行 → 占位链接或外部 URL
- 当前处于 API Explorer 时高亮该选项

**右侧用户区域：**
- 未登录：显示「登录」按钮
- 已登录：显示用户名/头像

---

## 数据层

**完全复用现有数据层，不做改动：**
- `src/types/api.ts` — 类型定义
- `src/data/categories.ts` — 5 个分类
- `src/data/products/*.ts` — 20 个产品文件
- `src/data/index.ts` — 聚合导出 + 查询函数

**新增字段（在 ApiEndpoint 中）：**
- `docUrl: string` — 帮助中心对应 API 的文档 URL（用于表格「查看文档」链接）
- `parameters: ApiParameter[]` — 参数列表（用于中栏表单渲染）

```typescript
interface ApiParameter {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'object' | 'array';
  required: boolean;
  description: string;
  placeholder?: string;
  defaultValue?: string;
}
```

**docUrl 示例：**
```
https://console.sensecore.cn/cn-sh-01/help/docs/cloud-foundation/compute/ecs/openAPI_V1/get-ecs-instance
```

**说明：** 参数数据初期仅 ECS 产品填充真实参数（从帮助中心文档抓取），其余产品使用模板占位参数。docUrl 初期仅 ECS 填充真实 URL，其余产品使用占位 URL 或空值。

---

## 静态文档文件

**路径：** `public/api-docs/{product}/{endpoint-id}.html`

**来源：** 从帮助中心（`console.sensecore.cn/cn-sh-01/help/docs/...`）抓取 API 文档内容部分（`.theme-doc-markdown` 或等效选择器），包裹在最小化 HTML 模板中。

**当前状态：** 已有 ECS 的 14 个文件，后续按需扩展其他产品。

**右栏 iframe 加载方式：** 同域 iframe，src 指向 `/api-docs/{product}/{endpoint-id}.html`。

---

## 全局状态管理

**现有 model 改造（`src/models/global.ts`）：**

```typescript
export default function useGlobalModel() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => 
    localStorage.getItem('sensecore-logged-in') === 'true'
  );
  const [guideVisible, setGuideVisible] = useState(false);

  const login = () => {
    localStorage.setItem('sensecore-logged-in', 'true');
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem('sensecore-logged-in');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout, guideVisible, setGuideVisible };
}
```

删除原有 `searchOpen` 和 `guideOpen`（旧搜索 Modal 和旧引导功能不再需要）。

---

## 组件清单

| 组件 | 状态 | 说明 |
|---|---|---|
| `GlobalNav` | 改造 | 新增「文档」下拉框 + 登录状态显示 |
| `ApiSidebar` | 复用 | 不变，产品列表页和三栏页共享 |
| `ExplorerPanel` | 新建 | 三栏中间面板（标题 + 鉴权 + 参数表单） |
| `DocPanel` | 新建 | 三栏右侧面板（Tab 切换 + iframe + 调试结果） |
| `AuthNotice` | 新建 | 可收起的鉴权信息卡片（蓝色） |
| `ParamForm` | 新建 | 参数表单（根据 parameters 数据渲染） |
| `MockResult` | 新建 | 模拟调试结果展示 |
| `ConsoleGuide` | 新建 | 控制台引导弹窗（遮罩 + spotlight + 气泡） |
| `OnboardingGuide` | 删除 | 不再需要 |
| `AuthGuide` | 删除 | 功能合并到 AuthNotice |

---

## 文件结构变化

```
src/
├── models/
│   └── global.ts                    # 改造：登录态 + 引导状态
├── layouts/
│   └── index.tsx                    # 改造：去掉 OnboardingGuide，简化
├── pages/
│   ├── index.tsx                    # 新建：假控制台主页
│   ├── login.tsx                    # 新建：模拟登录页
│   └── api-explorer/
│       ├── product.tsx              # 改造：沿用上版，增加「查看文档」列
│       └── explorer.tsx             # 新建：三栏调试界面
├── components/
│   ├── GlobalNav/                   # 改造：增加「文档」下拉框
│   ├── ApiSidebar/                  # 复用：不变
│   ├── ExplorerPanel/               # 新建
│   ├── DocPanel/                    # 新建
│   ├── AuthNotice/                  # 新建
│   ├── ParamForm/                   # 新建
│   ├── MockResult/                  # 新建
│   ├── ConsoleGuide/                # 新建
│   ├── OnboardingGuide/             # 删除
│   └── AuthGuide/                   # 删除
├── data/                            # 复用：不变（仅 type 扩展）
├── types/
│   └── api.ts                       # 扩展：增加 parameters 和 docUrl
└── styles/
    ├── variables.scss               # 复用
    └── global.scss                  # 复用
```

---

## 非功能需求

- **RAG 文档输出：** 构建时生成 `api-overview.json`，包含所有产品/API 的结构化元数据（名称、描述、方法、路径），供小助手 RAG 知识库导入。格式为 JSON，不做前端页面。
- **响应式：** 三栏布局在窄屏（< 1024px）时右栏折叠为抽屉/Tab；移动端侧边栏收起。
- **部署：** Vercel，SPA 路由回退（vercel.json rewrites）。
- **浏览器兼容：** Chrome/Edge/Firefox 最新版。

---

## 不做的事项

- API 文档页跳转 API Explorer 的按钮（需求 5，暂缓）
- 真实 API 调用（仅 mock 响应）
- 暗色模式（不在此版本范围）
- Cmd+K 全局搜索 Modal（不在此版本范围）
- SDK 示例 / CLI 示例 / 签名工具 / 调用历史 Tab（仅保留文档说明 + 调试结果）
