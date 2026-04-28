# API Center v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the SenseCore API Center into a three-column explorer (sidebar + debug panel + docs/results) referencing Volcengine's API Explorer, with a product listing landing page, mock login, and console-level onboarding guide.

**Architecture:** Evolve the existing UmiJS project. Reuse the data layer (20 product files) and ApiSidebar component. Rebuild routes, GlobalNav, and page-level components. New pages: console home, login, product list (evolved), three-column explorer.

**Tech Stack:** UmiJS 4 (@umijs/max), React 18, TypeScript, Sass (SCSS), Ant Design 5 (ConfigProvider only)

---

### Task 1: Update Routes and Global Model

**Files:**
- Modify: `src/.umirc.ts`
- Modify: `src/models/global.ts`

- [ ] **Step 1: Update route configuration**

Replace `.umirc.ts` content:

```typescript
import { defineConfig } from '@umijs/max';

export default defineConfig({
  title: 'SenseCore API 中心',
  favicons: ['/favicon.ico'],
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login' },
    { path: '/api-explorer', redirect: '/api-explorer/ecs' },
    { path: '/api-explorer/:product', component: '@/pages/api-explorer/product' },
    { path: '/api-explorer/:product/:endpoint', component: '@/pages/api-explorer/explorer' },
  ],
  antd: { configProvider: {} },
  layout: false,
  model: {},
  initialState: {},
  hash: true,
  history: { type: 'browser' },
});
```

- [ ] **Step 2: Rewrite global model with login state**

Replace `src/models/global.ts`:

```typescript
import { useState } from 'react';

export default function useGlobalModel() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('sensecore-logged-in') === 'true',
  );

  const login = () => {
    localStorage.setItem('sensecore-logged-in', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('sensecore-logged-in');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
```

- [ ] **Step 3: Verify dev server starts**

Run: `cd /Users/bahe/Desktop/Private/coding/API_Center_Transformation/api-portal && npm run dev`

Expected: Server starts on port 8000/8001 without compilation errors (pages will 404 since components don't exist yet — that's fine).

- [ ] **Step 4: Commit**

```bash
git add .umirc.ts src/models/global.ts
git commit -m "refactor: update routes for v2 and rewrite global model with login state"
```

---

### Task 2: Extend Types and Data Layer

**Files:**
- Modify: `src/types/api.ts`
- Modify: `src/data/products/ecs.ts` (add parameters + docUrl to first 3 endpoints as example)

- [ ] **Step 1: Add ApiParameter interface and extend ApiEndpoint**

Replace `src/types/api.ts`:

```typescript
export type ApiCategory = 'compute' | 'ai-ml' | 'containers' | 'storage' | 'networking';

export interface CategoryMeta {
  id: ApiCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  products: string[];
}

export interface ApiProduct {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  category: ApiCategory;
  groups: ApiGroup[];
}

export interface ApiGroup {
  name: string;
  endpoints: ApiEndpoint[];
}

export interface ApiParameter {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'object' | 'array';
  required: boolean;
  description: string;
  placeholder?: string;
  defaultValue?: string;
}

export interface ApiEndpoint {
  id: string;
  displayName: string;
  description: string;
  method: string;
  path: string;
  detailUrl: string;
  docUrl?: string;
  parameters?: ApiParameter[];
}
```

- [ ] **Step 2: Add parameters and docUrl to ECS first 3 endpoints**

In `src/data/products/ecs.ts`, update the first 3 endpoints in the `实例管理` group to include `parameters` and `docUrl`. Example for `ecs-list-instances`:

```typescript
{
  id: 'ecs-list-instances',
  displayName: '获取云服务器实例列表',
  description: '获取云服务器实例列表',
  method: 'GET',
  path: '/ecs/v1/instances',
  detailUrl: `${ECS_DOCS_BASE}/ecs-list-instances.html`,
  docUrl: 'https://console.sensecore.cn/cn-sh-01/help/docs/cloud-foundation/compute/ecs/openAPI_V1/get-ecs-instance',
  parameters: [
    { name: 'PageNumber', type: 'number', required: false, description: '分页页码', placeholder: '1', defaultValue: '1' },
    { name: 'PageSize', type: 'number', required: false, description: '每页数量', placeholder: '20', defaultValue: '20' },
    { name: 'InstanceId', type: 'string', required: false, description: '实例 ID 过滤', placeholder: 'i-xxxxx' },
    { name: 'Status', type: 'string', required: false, description: '实例状态过滤', placeholder: 'running' },
  ],
},
```

For `ecs-get-instance`:
```typescript
{
  id: 'ecs-get-instance',
  displayName: '查看云服务器实例详情',
  description: '查看云服务器实例详情',
  method: 'GET',
  path: '/ecs/v1/instances/{instanceId}',
  detailUrl: `${ECS_DOCS_BASE}/ecs-get-instance.html`,
  docUrl: 'https://console.sensecore.cn/cn-sh-01/help/docs/cloud-foundation/compute/ecs/openAPI_V1/get-ecs-instance',
  parameters: [
    { name: 'InstanceId', type: 'string', required: true, description: '实例 ID', placeholder: 'i-3tiefmk...' },
  ],
},
```

For `ecs-start-instance`:
```typescript
{
  id: 'ecs-start-instance',
  displayName: '启动云服务器实例',
  description: '启动云服务器实例',
  method: 'POST',
  path: '/ecs/v1/instances/{instanceId}/start',
  detailUrl: `${ECS_DOCS_BASE}/ecs-start-instance.html`,
  docUrl: 'https://console.sensecore.cn/cn-sh-01/help/docs/cloud-foundation/compute/ecs/openAPI_V1/start-instance',
  parameters: [
    { name: 'InstanceId', type: 'string', required: true, description: '实例 ID', placeholder: 'i-3tiefmk...' },
    { name: 'DryRun', type: 'boolean', required: false, description: '是否只预检此次请求', placeholder: 'false', defaultValue: 'false' },
    { name: 'ClientToken', type: 'string', required: false, description: '保证请求幂等性', placeholder: '幂等 Token（可选）' },
  ],
},
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add src/types/api.ts src/data/products/ecs.ts
git commit -m "feat: extend ApiEndpoint with parameters and docUrl fields"
```

---

### Task 3: Rewrite GlobalNav with Dropdown

**Files:**
- Modify: `src/components/GlobalNav/index.tsx`
- Modify: `src/components/GlobalNav/index.scss`

- [ ] **Step 1: Rewrite GlobalNav component**

Replace `src/components/GlobalNav/index.tsx`:

```tsx
import { useState } from 'react';
import { Link, useModel, history } from '@umijs/max';
import './index.scss';

export default function GlobalNav() {
  const { isLoggedIn, logout } = useModel('global');
  const [docDropdownOpen, setDocDropdownOpen] = useState(false);

  return (
    <header className="global-nav">
      <div className="global-nav__inner">
        <div className="global-nav__left">
          <Link to="/" className="global-nav__brand">
            <div className="global-nav__logo-icon">
              <span className="global-nav__logo-dot global-nav__logo-dot--blue" />
              <span className="global-nav__logo-dot global-nav__logo-dot--green" />
              <span className="global-nav__logo-dot global-nav__logo-dot--orange" />
              <span className="global-nav__logo-dot global-nav__logo-dot--purple" />
            </div>
            <span className="global-nav__logo-title">SenseCore</span>
          </Link>
          <span className="global-nav__region">中国上海一区</span>
        </div>

        <div className="global-nav__right">
          <span className="global-nav__link">官网</span>
          <span className="global-nav__link">费用</span>
          <div
            className="global-nav__doc-menu"
            onMouseEnter={() => setDocDropdownOpen(true)}
            onMouseLeave={() => setDocDropdownOpen(false)}
          >
            <span className="global-nav__link global-nav__link--doc">
              文档 <span className="global-nav__arrow">▾</span>
            </span>
            {docDropdownOpen && (
              <div className="global-nav__dropdown">
                <a
                  className="global-nav__dropdown-item"
                  href="https://console.sensecore.cn/cn-sh-01/help"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  文档中心
                </a>
                <span
                  className="global-nav__dropdown-item global-nav__dropdown-item--active"
                  onClick={() => { history.push('/api-explorer'); setDocDropdownOpen(false); }}
                >
                  API Explorer
                </span>
                <span className="global-nav__dropdown-item global-nav__dropdown-item--disabled">
                  统一命令行
                </span>
              </div>
            )}
          </div>

          <div className="global-nav__divider" />

          {isLoggedIn ? (
            <div className="global-nav__user">
              <span className="global-nav__avatar-circle">U</span>
              <span className="global-nav__logout" onClick={logout}>退出</span>
            </div>
          ) : (
            <button
              className="global-nav__login-btn"
              onClick={() => history.push('/login')}
            >
              登录
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Rewrite GlobalNav styles**

Replace `src/components/GlobalNav/index.scss`:

```scss
@use '@/styles/variables' as *;

.global-nav {
  position: sticky;
  top: 0;
  z-index: $z-nav;
  height: 48px;
  background: $color-primary-800;
  display: flex;
  align-items: center;

  &__inner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }

  &__logo-icon {
    display: grid;
    grid-template-columns: 7px 7px;
    grid-template-rows: 7px 7px;
    gap: 2px;
  }

  &__logo-dot {
    width: 7px;
    height: 7px;
    border-radius: 2px;
    &--blue { background: #4361ee; }
    &--green { background: #22c55e; }
    &--orange { background: #f59e0b; }
    &--purple { background: #8b5cf6; }
  }

  &__logo-title {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.02em;
  }

  &__region {
    font-size: 12px;
    color: #94a3b8;
    padding: 3px 8px;
    border: 1px solid #334155;
    border-radius: 4px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__link {
    padding: 6px 10px;
    font-size: 13px;
    color: #cbd5e1;
    cursor: pointer;
    border-radius: 4px;
    transition: color $transition-fast, background-color $transition-fast;
    white-space: nowrap;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }

    &--doc {
      position: relative;
    }
  }

  &__arrow {
    font-size: 10px;
    margin-left: 2px;
  }

  &__doc-menu {
    position: relative;
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    background: #fff;
    border-radius: $radius-md;
    box-shadow: $shadow-lg;
    padding: 6px 0;
    min-width: 150px;
    z-index: $z-dropdown;
  }

  &__dropdown-item {
    display: block;
    padding: 8px 16px;
    font-size: 13px;
    color: #334155;
    cursor: pointer;
    transition: background-color $transition-fast;
    text-decoration: none;

    &:hover {
      background: #f1f5f9;
    }

    &--active {
      color: $color-primary-400;
      font-weight: 500;
      background: $color-primary-50;
    }

    &--disabled {
      color: #94a3b8;
      cursor: not-allowed;

      &:hover {
        background: transparent;
      }
    }
  }

  &__divider {
    width: 1px;
    height: 20px;
    background: #334155;
    margin: 0 8px;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__avatar-circle {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #475569;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__logout {
    font-size: 12px;
    color: #94a3b8;
    cursor: pointer;
    &:hover { color: #fff; }
  }

  &__login-btn {
    padding: 5px 14px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background: $color-primary-400;
    border: none;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: background-color $transition-fast;
    &:hover { background: $color-primary-500; }
  }
}
```

- [ ] **Step 3: Verify renders correctly**

Run dev server, visit `http://localhost:8001/`. Confirm nav bar renders with dark background, logo, region, "文档" dropdown (hover to open), and login button.

- [ ] **Step 4: Commit**

```bash
git add src/components/GlobalNav/
git commit -m "feat: rewrite GlobalNav with doc dropdown menu and login state"
```

---

### Task 4: Simplify Layout (Remove Old Guide)

**Files:**
- Modify: `src/layouts/index.tsx`
- Modify: `src/layouts/index.scss`
- Delete: `src/components/OnboardingGuide/` (entire directory)
- Delete: `src/components/AuthGuide/` (entire directory)

- [ ] **Step 1: Rewrite layout**

Replace `src/layouts/index.tsx`:

```tsx
import { Outlet } from '@umijs/max';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import GlobalNav from '@/components/GlobalNav';
import '@/styles/global.scss';
import './index.scss';

export default function Layout() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{ token: { colorPrimary: '#4361ee', borderRadius: 8 } }}
    >
      <div className="app-layout">
        <GlobalNav />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </ConfigProvider>
  );
}
```

- [ ] **Step 2: Simplify layout SCSS**

Replace `src/layouts/index.scss`:

```scss
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}
```

- [ ] **Step 3: Delete old components**

```bash
rm -rf src/components/OnboardingGuide
rm -rf src/components/AuthGuide
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: simplify layout, remove OnboardingGuide and AuthGuide"
```

---

### Task 5: Console Home Page with Guide

**Files:**
- Create: `src/pages/index.tsx`
- Create: `src/pages/index.scss`
- Create: `src/components/ConsoleGuide/index.tsx`
- Create: `src/components/ConsoleGuide/index.scss`

- [ ] **Step 1: Create ConsoleGuide component**

Create `src/components/ConsoleGuide/index.tsx`:

```tsx
import { useState } from 'react';
import './index.scss';

interface ConsoleGuideProps {
  onClose: () => void;
}

export default function ConsoleGuide({ onClose }: ConsoleGuideProps) {
  return (
    <div className="console-guide">
      <div className="console-guide__overlay" />
      <div className="console-guide__tooltip">
        <div className="console-guide__arrow" />
        <div className="console-guide__title">🎉 API 中心全新升级</div>
        <div className="console-guide__text">
          API Explorer 已迁移至导航栏「<strong>文档</strong>」菜单下。
          <br />
          点击「文档 &gt; API Explorer」即可在线调试所有云服务 API。
        </div>
        <div className="console-guide__actions">
          <button className="console-guide__btn" onClick={onClose}>
            知道了
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ConsoleGuide styles**

Create `src/components/ConsoleGuide/index.scss`:

```scss
@use '@/styles/variables' as *;

.console-guide {
  position: fixed;
  inset: 0;
  z-index: $z-modal;

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }

  &__tooltip {
    position: absolute;
    top: 56px;
    right: 120px;
    background: #fff;
    border-radius: $radius-lg;
    padding: 20px 24px;
    box-shadow: $shadow-xl;
    max-width: 320px;
    z-index: 1;
  }

  &__arrow {
    position: absolute;
    top: -8px;
    right: 40px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
  }

  &__title {
    font-size: 15px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 10px;
  }

  &__text {
    font-size: 13px;
    color: #475569;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__btn {
    padding: 7px 20px;
    background: $color-primary-400;
    color: #fff;
    border: none;
    border-radius: $radius-md;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color $transition-fast;

    &:hover {
      background: $color-primary-500;
    }
  }
}
```

- [ ] **Step 3: Create console home page**

Create `src/pages/index.tsx`:

```tsx
import { useState } from 'react';
import ConsoleGuide from '@/components/ConsoleGuide';
import './index.scss';

export default function ConsoleHome() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="console-home">
      <div className="console-home__placeholder">
        <div className="console-home__icon">🖥️</div>
        <div className="console-home__title">SenseCore 控制台</div>
        <div className="console-home__subtitle">请通过导航栏「文档 &gt; API Explorer」进入 API 调试台</div>
      </div>
      {showGuide && <ConsoleGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
}
```

Create `src/pages/index.scss`:

```scss
.console-home {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;

  &__placeholder {
    text-align: center;
  }

  &__icon {
    font-size: 48px;
    margin-bottom: 12px;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 6px;
  }

  &__subtitle {
    font-size: 13px;
    color: #94a3b8;
  }
}
```

- [ ] **Step 4: Verify**

Visit `http://localhost:8001/`. Confirm: empty console page loads with the guide tooltip overlay pointing at the nav bar area. Click "知道了" dismisses the overlay.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.tsx src/pages/index.scss src/components/ConsoleGuide/
git commit -m "feat: add console home page with onboarding guide tooltip"
```

---

### Task 6: Login Page

**Files:**
- Create: `src/pages/login.tsx`
- Create: `src/pages/login.scss`

- [ ] **Step 1: Create login page**

Create `src/pages/login.tsx`:

```tsx
import { useState } from 'react';
import { useModel, history, useSearchParams } from '@umijs/max';
import './login.scss';

export default function LoginPage() {
  const { login } = useModel('global');
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    const returnUrl = searchParams.get('returnUrl') || '/api-explorer';
    history.push(returnUrl);
  };

  return (
    <div className="login-page">
      <form className="login-page__card" onSubmit={handleSubmit}>
        <div className="login-page__header">
          <h1 className="login-page__title">登录 SenseCore</h1>
          <p className="login-page__subtitle">登录后即可使用 API 在线调试功能</p>
        </div>

        <div className="login-page__field">
          <label className="login-page__label">用户名 / 邮箱</label>
          <input
            className="login-page__input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="输入任意内容"
          />
        </div>

        <div className="login-page__field">
          <label className="login-page__label">密码</label>
          <input
            className="login-page__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入任意内容"
          />
        </div>

        <button type="submit" className="login-page__submit">
          登 录
        </button>

        <p className="login-page__hint">Demo 模式：输入任意内容即可登录</p>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Create login page styles**

Create `src/pages/login.scss`:

```scss
@use '@/styles/variables' as *;

.login-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;

  &__card {
    background: #fff;
    border-radius: $radius-lg;
    padding: 36px 32px;
    box-shadow: $shadow-lg;
    width: 360px;
  }

  &__header {
    text-align: center;
    margin-bottom: 28px;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 6px;
  }

  &__subtitle {
    font-size: 12px;
    color: #94a3b8;
    margin: 0;
  }

  &__field {
    margin-bottom: 16px;
  }

  &__label {
    display: block;
    font-size: 12px;
    color: #475569;
    margin-bottom: 5px;
    font-weight: 500;
  }

  &__input {
    width: 100%;
    padding: 9px 12px;
    border: 1px solid #e2e8f0;
    border-radius: $radius-md;
    font-size: 13px;
    transition: border-color $transition-fast;

    &:focus {
      outline: none;
      border-color: $color-primary-400;
    }
  }

  &__submit {
    width: 100%;
    padding: 10px;
    background: $color-primary-400;
    color: #fff;
    border: none;
    border-radius: $radius-md;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 8px;
    transition: background-color $transition-fast;

    &:hover {
      background: $color-primary-500;
    }
  }

  &__hint {
    text-align: center;
    font-size: 11px;
    color: #94a3b8;
    margin-top: 14px;
  }
}
```

- [ ] **Step 3: Verify**

Visit `http://localhost:8001/login`. Confirm: centered login form renders. Fill any text, submit → redirects to `/api-explorer`. Nav bar shows user avatar (logged in).

- [ ] **Step 4: Commit**

```bash
git add src/pages/login.tsx src/pages/login.scss
git commit -m "feat: add mock login page with localStorage auth"
```

---

### Task 7: Product List Page (Evolved from v1)

**Files:**
- Create: `src/pages/api-explorer/product.tsx`
- Create: `src/pages/api-explorer/product.scss`
- Delete: `src/pages/apis/` (old pages directory)

- [ ] **Step 1: Create product list page**

Create `src/pages/api-explorer/product.tsx`:

```tsx
import { useState } from 'react';
import { useParams, history } from '@umijs/max';
import { getProductById } from '@/data';
import ApiSidebar from '@/components/ApiSidebar';
import './product.scss';

const methodColors: Record<string, string> = {
  GET: '#22c55e',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  DELETE: '#ef4444',
  PATCH: '#a855f7',
};

export default function ProductListPage() {
  const { product: productId } = useParams<{ product: string }>();
  const product = getProductById(productId!);
  const [searchQuery, setSearchQuery] = useState('');

  if (!product) {
    return (
      <div className="product-list__not-found">
        <h2>产品未找到</h2>
        <p>找不到 ID 为 &quot;{productId}&quot; 的产品。</p>
      </div>
    );
  }

  const allEndpoints = product.groups.flatMap((g) =>
    g.endpoints.map((ep) => ({ ...ep })),
  );

  const lowerQuery = searchQuery.toLowerCase().trim();
  const filteredEndpoints = lowerQuery
    ? allEndpoints.filter(
        (ep) =>
          ep.displayName.toLowerCase().includes(lowerQuery) ||
          ep.description.toLowerCase().includes(lowerQuery),
      )
    : allEndpoints;

  return (
    <div className="product-list">
      <ApiSidebar currentProductId={product.id} />
      <div className="product-list__content">
        <div className="product-list__header">
          <h1 className="product-list__title">{product.name}</h1>
          <p className="product-list__desc">{product.description}</p>
        </div>

        <div className="product-list__toolbar">
          <input
            type="text"
            className="product-list__search"
            placeholder="搜索 API 名称或描述..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="product-list__count">共 {filteredEndpoints.length} 个 API</span>
        </div>

        <div className="product-list__table">
          <div className="product-list__table-header">
            <span className="product-list__col product-list__col--name">API 名称</span>
            <span className="product-list__col product-list__col--desc">描述</span>
            <span className="product-list__col product-list__col--path">请求路径</span>
            <span className="product-list__col product-list__col--action">操作</span>
          </div>
          {filteredEndpoints.map((ep) => (
            <div
              key={ep.id}
              className="product-list__row"
              onClick={() => history.push(`/api-explorer/${product.id}/${ep.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') history.push(`/api-explorer/${product.id}/${ep.id}`); }}
            >
              <span className="product-list__col product-list__col--name product-list__col--bold">
                {ep.displayName}
              </span>
              <span className="product-list__col product-list__col--desc product-list__col--secondary">
                {ep.description}
              </span>
              <span className="product-list__col product-list__col--path">
                <span className="product-list__method" style={{ color: methodColors[ep.method] || '#6b7280' }}>
                  {ep.method}
                </span>
                <span className="product-list__path-text">{ep.path}</span>
              </span>
              <span className="product-list__col product-list__col--action" onClick={(e) => e.stopPropagation()}>
                {ep.docUrl ? (
                  <a href={ep.docUrl} target="_blank" rel="noopener noreferrer" className="product-list__doc-link">
                    查看文档
                  </a>
                ) : (
                  <span className="product-list__doc-link product-list__doc-link--disabled">查看文档</span>
                )}
              </span>
            </div>
          ))}
          {filteredEndpoints.length === 0 && (
            <div className="product-list__empty">没有匹配的 API</div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create product list styles**

Create `src/pages/api-explorer/product.scss`:

```scss
@use '@/styles/variables' as *;

.product-list {
  flex: 1;
  display: flex;
  overflow: hidden;

  &__not-found {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #64748b;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  &__header {
    padding: 20px 24px 0;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 4px;
  }

  &__desc {
    font-size: 13px;
    color: #64748b;
    margin: 0;
  }

  &__toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 24px;
  }

  &__search {
    flex: 1;
    max-width: 320px;
    padding: 7px 12px;
    border: 1px solid #e2e8f0;
    border-radius: $radius-md;
    font-size: 12px;
    transition: border-color $transition-fast;

    &:focus {
      outline: none;
      border-color: $color-primary-400;
    }
  }

  &__count {
    font-size: 12px;
    color: #94a3b8;
  }

  &__table {
    padding: 0 24px 24px;
  }

  &__table-header {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #e2e8f0;
    font-size: 11px;
    color: #94a3b8;
    font-weight: 500;
  }

  &__row {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f8fafc;
    cursor: pointer;
    transition: background-color $transition-fast;

    &:hover {
      background: #fafcff;
    }
  }

  &__col {
    &--name { width: 180px; }
    &--desc { flex: 1; }
    &--path { width: 220px; }
    &--action { width: 80px; text-align: center; }
    &--bold { font-weight: 500; color: #1e293b; font-size: 13px; }
    &--secondary { color: #64748b; font-size: 12px; }
  }

  &__method {
    font-weight: 600;
    font-size: 11px;
    margin-right: 6px;
  }

  &__path-text {
    font-size: 11px;
    color: #64748b;
    font-family: $font-code;
  }

  &__doc-link {
    font-size: 11px;
    color: $color-primary-400;
    text-decoration: none;
    font-weight: 500;

    &:hover { text-decoration: underline; }
    &--disabled { color: #cbd5e1; cursor: not-allowed; }
  }

  &__empty {
    padding: 32px 0;
    text-align: center;
    color: #94a3b8;
    font-size: 13px;
  }
}
```

- [ ] **Step 3: Update ApiSidebar links to use /api-explorer prefix**

In `src/components/ApiSidebar/index.tsx`, change all `history.push` and `Link` paths from `/apis/` to `/api-explorer/`:

- Line with `<Link to="/apis/ecs"` → `<Link to="/api-explorer/ecs"`
- Line with `history.push(\`/apis/${productId}\`)` → `history.push(\`/api-explorer/${productId}\`)`
- Line with `history.push(\`/apis/${product.id}/${ep.id}\`)` → `history.push(\`/api-explorer/${product.id}/${ep.id}\`)`

- [ ] **Step 4: Delete old pages**

```bash
rm -rf src/pages/apis
```

- [ ] **Step 5: Verify**

Visit `http://localhost:8001/api-explorer/ecs`. Confirm: sidebar on left + product header + API table on right with a "查看文档" column. Click a row → navigates to `/api-explorer/ecs/{endpoint-id}` (will 404 until next task).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add product list page with doc links, migrate from /apis to /api-explorer"
```

---

### Task 8: Three-Column Explorer Page

**Files:**
- Create: `src/pages/api-explorer/explorer.tsx`
- Create: `src/pages/api-explorer/explorer.scss`
- Create: `src/components/ExplorerPanel/index.tsx`
- Create: `src/components/ExplorerPanel/index.scss`
- Create: `src/components/DocPanel/index.tsx`
- Create: `src/components/DocPanel/index.scss`

- [ ] **Step 1: Create ExplorerPanel (middle column)**

Create `src/components/ExplorerPanel/index.tsx`:

```tsx
import { useState } from 'react';
import { useModel, history } from '@umijs/max';
import type { ApiEndpoint } from '@/types/api';
import './index.scss';

interface ExplorerPanelProps {
  endpoint: ApiEndpoint;
  productId: string;
  onDebug: () => void;
}

export default function ExplorerPanel({ endpoint, productId, onDebug }: ExplorerPanelProps) {
  const { isLoggedIn } = useModel('global');
  const [authCollapsed, setAuthCollapsed] = useState(false);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [showRequired, setShowRequired] = useState(false);

  const params = endpoint.parameters || [];
  const displayParams = showRequired ? params.filter((p) => p.required) : params;
  const requiredCount = params.filter((p) => p.required).length;

  const handleDebug = () => {
    if (!isLoggedIn) {
      history.push(`/login?returnUrl=/api-explorer/${productId}/${endpoint.id}`);
      return;
    }
    onDebug();
  };

  const handleClear = () => {
    setParamValues({});
  };

  return (
    <div className="explorer-panel">
      <div className="explorer-panel__header">
        <div className="explorer-panel__title-area">
          <span className="explorer-panel__name">{endpoint.id.split('-').slice(1).join('-') || endpoint.id}</span>
          <span className="explorer-panel__method">{endpoint.method}</span>
          <span className="explorer-panel__desc">{endpoint.displayName}</span>
        </div>
        <button className="explorer-panel__debug-btn" onClick={handleDebug}>
          发起调试
        </button>
      </div>

      <div className="explorer-panel__body">
        {!authCollapsed && (
          <div className="explorer-panel__auth-card">
            <div className="explorer-panel__auth-header">
              <span className="explorer-panel__auth-title">鉴权信息</span>
              <span className="explorer-panel__auth-toggle" onClick={() => setAuthCollapsed(true)}>收起</span>
            </div>
            <div className="explorer-panel__auth-content">
              <div className="explorer-panel__token-row">
                <code className="explorer-panel__token-value">Bearer sk-SenseCoreDemo***Token</code>
                <span
                  className="explorer-panel__token-copy"
                  onClick={() => { navigator.clipboard.writeText('sk-SenseCoreDemo-fake-token-12345'); }}
                >
                  复制
                </span>
              </div>
              <div className="explorer-panel__auth-hint">
                仅供调试 · 生产环境请用 AK/SK ·{' '}
                <a href="https://console.sensecore.cn/cn-sh-01/iam/Security/access-key" target="_blank" rel="noopener noreferrer">
                  获取 AK/SK
                </a>
              </div>
            </div>
          </div>
        )}

        {authCollapsed && (
          <div className="explorer-panel__auth-collapsed" onClick={() => setAuthCollapsed(false)}>
            <span className="explorer-panel__auth-title">🔑</span>
            <code className="explorer-panel__token-value">sk-***Token</code>
            <span className="explorer-panel__token-copy" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText('sk-SenseCoreDemo-fake-token-12345'); }}>
              复制
            </span>
            <span className="explorer-panel__auth-expand">展开 ▾</span>
          </div>
        )}

        <div className="explorer-panel__region">
          <span className="explorer-panel__region-label">服务Region</span>
          <select className="explorer-panel__region-select">
            <option>cn-shanghai-1</option>
            <option>cn-beijing-1</option>
          </select>
        </div>

        <div className="explorer-panel__params-header">
          <span className="explorer-panel__params-title">输入参数</span>
          <label className="explorer-panel__required-filter">
            <input type="checkbox" checked={showRequired} onChange={(e) => setShowRequired(e.target.checked)} />
            只看必填
          </label>
        </div>

        <div className="explorer-panel__params-list">
          {displayParams.map((param) => (
            <div
              key={param.name}
              className={`explorer-panel__param-row${param.required ? ' explorer-panel__param-row--required' : ''}`}
            >
              <span className="explorer-panel__param-required">{param.required ? '*' : ''}</span>
              <div className="explorer-panel__param-info">
                <div className="explorer-panel__param-name">{param.name}</div>
                <div className="explorer-panel__param-type">{param.type}</div>
              </div>
              <input
                className="explorer-panel__param-input"
                placeholder={param.placeholder || ''}
                value={paramValues[param.name] || ''}
                onChange={(e) => setParamValues((prev) => ({ ...prev, [param.name]: e.target.value }))}
              />
            </div>
          ))}
          {displayParams.length === 0 && (
            <div className="explorer-panel__params-empty">无参数</div>
          )}
        </div>
      </div>

      <div className="explorer-panel__footer">
        <span className="explorer-panel__params-count">{params.length} 个参数 · {requiredCount} 必填</span>
        <button className="explorer-panel__clear-btn" onClick={handleClear}>全部清空</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ExplorerPanel styles**

Create `src/components/ExplorerPanel/index.scss`:

```scss
@use '@/styles/variables' as *;

.explorer-panel {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e2e8f0;

  &__header {
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  &__title-area {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__name { font-size: 15px; font-weight: 600; color: #1e293b; }
  &__method { font-size: 11px; font-weight: 600; color: $color-primary-400; background: $color-primary-50; padding: 1px 6px; border-radius: 3px; }
  &__desc { font-size: 12px; color: #64748b; }

  &__debug-btn {
    padding: 6px 16px;
    background: $color-primary-400;
    color: #fff;
    border: none;
    border-radius: $radius-md;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    flex-shrink: 0;
    transition: background-color $transition-fast;
    &:hover { background: $color-primary-500; }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 12px 16px;
  }

  &__auth-card {
    padding: 12px;
    background: #f0f4ff;
    border: 1px solid #c7d2fe;
    border-radius: $radius-md;
    margin-bottom: 12px;
  }

  &__auth-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  &__auth-title { font-size: 12px; font-weight: 600; color: #4338ca; }
  &__auth-toggle { font-size: 10px; color: #6366f1; cursor: pointer; }

  &__auth-content {}

  &__token-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  &__token-value {
    font-size: 11px;
    background: #e0e7ff;
    padding: 2px 8px;
    border-radius: 3px;
    color: #3730a3;
  }

  &__token-copy {
    font-size: 11px;
    color: $color-primary-400;
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }

  &__auth-hint {
    font-size: 10px;
    color: #6366f1;
    a { color: $color-primary-400; text-decoration: underline; }
  }

  &__auth-collapsed {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: #f0f4ff;
    border: 1px solid #c7d2fe;
    border-radius: $radius-md;
    margin-bottom: 12px;
    cursor: pointer;
  }

  &__auth-expand { font-size: 10px; color: #6366f1; margin-left: auto; }

  &__region {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    background: #f8fafc;
    border-radius: $radius-md;
    margin-bottom: 14px;
  }

  &__region-label { font-size: 11px; color: #64748b; }
  &__region-select {
    font-size: 11px;
    padding: 3px 8px;
    border: 1px solid #e2e8f0;
    border-radius: $radius-sm;
    flex: 1;
  }

  &__params-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &__params-title { font-size: 12px; font-weight: 600; color: #334155; }
  &__required-filter {
    font-size: 11px;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    input { cursor: pointer; }
  }

  &__params-list {
    border: 1px solid #e2e8f0;
    border-radius: $radius-md;
    overflow: hidden;
  }

  &__param-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-bottom: 1px solid #f1f5f9;

    &:last-child { border-bottom: none; }
    &--required { background: #fefce8; }
  }

  &__param-required { width: 10px; color: #dc2626; font-size: 11px; text-align: center; }

  &__param-info { width: 100px; }
  &__param-name { font-size: 12px; font-weight: 500; color: #1e293b; }
  &__param-type { font-size: 10px; color: #94a3b8; }

  &__param-input {
    flex: 1;
    padding: 5px 8px;
    border: 1px solid #e2e8f0;
    border-radius: $radius-sm;
    font-size: 11px;
    &:focus { outline: none; border-color: $color-primary-400; }
  }

  &__params-empty {
    padding: 16px;
    text-align: center;
    color: #94a3b8;
    font-size: 12px;
  }

  &__footer {
    padding: 10px 16px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    background: #fafafa;
  }

  &__params-count { font-size: 11px; color: #94a3b8; }
  &__clear-btn {
    font-size: 11px;
    color: #64748b;
    background: none;
    border: none;
    cursor: pointer;
    &:hover { color: #1e293b; }
  }
}
```

- [ ] **Step 3: Create DocPanel (right column)**

Create `src/components/DocPanel/index.tsx`:

```tsx
import { useState, useEffect } from 'react';
import type { ApiEndpoint } from '@/types/api';
import './index.scss';

interface DocPanelProps {
  endpoint: ApiEndpoint;
  debugResult: object | null;
}

export default function DocPanel({ endpoint, debugResult }: DocPanelProps) {
  const [activeTab, setActiveTab] = useState<'doc' | 'result'>('doc');

  useEffect(() => {
    if (debugResult) setActiveTab('result');
  }, [debugResult]);

  return (
    <div className="doc-panel">
      <div className="doc-panel__tabs">
        <button
          className={`doc-panel__tab${activeTab === 'doc' ? ' doc-panel__tab--active' : ''}`}
          onClick={() => setActiveTab('doc')}
        >
          文档说明
        </button>
        <button
          className={`doc-panel__tab${activeTab === 'result' ? ' doc-panel__tab--active' : ''}`}
          onClick={() => setActiveTab('result')}
        >
          调试结果
        </button>
      </div>

      <div className="doc-panel__content">
        {activeTab === 'doc' && (
          <iframe
            className="doc-panel__iframe"
            src={endpoint.detailUrl}
            title={endpoint.displayName}
          />
        )}
        {activeTab === 'result' && (
          <div className="doc-panel__result">
            {debugResult ? (
              <pre className="doc-panel__json">{JSON.stringify(debugResult, null, 2)}</pre>
            ) : (
              <div className="doc-panel__empty">
                <div className="doc-panel__empty-icon">📋</div>
                <div className="doc-panel__empty-text">点击「发起调试」查看响应结果</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create DocPanel styles**

Create `src/components/DocPanel/index.scss`:

```scss
@use '@/styles/variables' as *;

.doc-panel {
  width: 380px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-left: 1px solid #e2e8f0;

  &__tabs {
    display: flex;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
  }

  &__tab {
    padding: 10px 16px;
    font-size: 12px;
    color: #64748b;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-weight: 500;
    transition: color $transition-fast;

    &--active {
      color: $color-primary-400;
      border-bottom-color: $color-primary-400;
    }

    &:hover:not(&--active) {
      color: #334155;
    }
  }

  &__content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  &__iframe {
    flex: 1;
    border: none;
    width: 100%;
  }

  &__result {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }

  &__json {
    font-family: $font-code;
    font-size: 11px;
    line-height: 1.6;
    color: #1e293b;
    background: #f8fafc;
    padding: 12px;
    border-radius: $radius-md;
    overflow-x: auto;
    margin: 0;
  }

  &__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }

  &__empty-icon { font-size: 32px; margin-bottom: 8px; }
  &__empty-text { font-size: 12px; color: #94a3b8; }
}
```

- [ ] **Step 5: Create Explorer page (three-column layout)**

Create `src/pages/api-explorer/explorer.tsx`:

```tsx
import { useState } from 'react';
import { useParams } from '@umijs/max';
import { getProductById } from '@/data';
import ApiSidebar from '@/components/ApiSidebar';
import ExplorerPanel from '@/components/ExplorerPanel';
import DocPanel from '@/components/DocPanel';
import './explorer.scss';

export default function ExplorerPage() {
  const { product: productId, endpoint: endpointId } = useParams<{ product: string; endpoint: string }>();
  const product = getProductById(productId!);
  const [debugResult, setDebugResult] = useState<object | null>(null);

  if (!product) {
    return <div className="explorer__not-found">产品未找到</div>;
  }

  let endpoint = null;
  for (const group of product.groups) {
    endpoint = group.endpoints.find((ep) => ep.id === endpointId);
    if (endpoint) break;
  }

  if (!endpoint) {
    return <div className="explorer__not-found">API 未找到</div>;
  }

  const handleDebug = () => {
    setDebugResult({
      RequestId: 'req-' + Math.random().toString(36).slice(2, 10),
      Action: endpoint!.id,
      Status: 'Success',
      Data: {
        message: '调试成功（模拟响应）',
        timestamp: new Date().toISOString(),
      },
    });
  };

  return (
    <div className="explorer">
      <ApiSidebar currentProductId={product.id} currentEndpointId={endpointId} />
      <ExplorerPanel endpoint={endpoint} productId={product.id} onDebug={handleDebug} />
      <DocPanel endpoint={endpoint} debugResult={debugResult} />
    </div>
  );
}
```

Create `src/pages/api-explorer/explorer.scss`:

```scss
.explorer {
  flex: 1;
  display: flex;
  overflow: hidden;

  &__not-found {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    font-size: 14px;
  }
}
```

- [ ] **Step 6: Verify**

Visit `http://localhost:8001/api-explorer/ecs/ecs-start-instance`. Confirm:
- Left: sidebar with ECS expanded, "启动云服务器实例" highlighted
- Middle: title bar with "发起调试" button, auth card (blue), region selector, 3 params (InstanceId required, DryRun, ClientToken)
- Right: "文档说明" tab loads iframe, "调试结果" tab shows empty state
- Click "发起调试" while not logged in → redirects to login
- Login → back to explorer → click "发起调试" → right panel switches to "调试结果" with mock JSON

- [ ] **Step 7: Commit**

```bash
git add src/pages/api-explorer/explorer.tsx src/pages/api-explorer/explorer.scss src/components/ExplorerPanel/ src/components/DocPanel/
git commit -m "feat: add three-column API explorer page with debug panel and doc panel"
```

---

### Task 9: Update Vercel Config and Clean Up

**Files:**
- Modify: `vercel.json`
- Delete: old page files if still present

- [ ] **Step 1: Update vercel.json**

Replace `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 2: Delete leftover old files**

```bash
rm -rf src/pages/apis 2>/dev/null
```

- [ ] **Step 3: Verify full flow**

1. Visit `/` → console home with guide popup
2. Dismiss guide → click nav "文档" → dropdown → click "API Explorer"
3. Lands on `/api-explorer/ecs` → product list with sidebar + table
4. Click row → `/api-explorer/ecs/ecs-start-instance` → three-column layout
5. Click "发起调试" → login redirect → login → back to explorer → mock result shown
6. Sidebar click different API → middle + right panels update

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: update vercel config and clean up old files"
```

---

### Task 10: Generate RAG Document

**Files:**
- Create: `scripts/generate-rag-doc.ts`

- [ ] **Step 1: Create RAG document generator script**

Create `scripts/generate-rag-doc.ts`:

```typescript
import * as fs from 'fs';
import * as path from 'path';

// Import data directly (run via tsx or ts-node with paths)
// For simplicity, we'll generate the JSON at build time by reading the compiled output
// This script is run manually: npx tsx scripts/generate-rag-doc.ts

const dataDir = path.resolve(__dirname, '../src/data/products');
const outFile = path.resolve(__dirname, '../public/api-overview.json');

async function main() {
  // Dynamically import all product files
  const products: any[] = [];
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const mod = await import(path.join(dataDir, file));
    const exportName = Object.keys(mod).find(k => k !== 'default');
    if (exportName) {
      products.push(mod[exportName]);
    }
  }

  const overview = products.map(product => ({
    id: product.id,
    name: product.name,
    abbreviation: product.abbreviation,
    description: product.description,
    category: product.category,
    apis: product.groups.flatMap((g: any) =>
      g.endpoints.map((ep: any) => ({
        id: ep.id,
        name: ep.displayName,
        description: ep.description,
        method: ep.method,
        path: ep.path,
      }))
    ),
  }));

  fs.writeFileSync(outFile, JSON.stringify(overview, null, 2), 'utf-8');
  console.log(`Generated ${outFile} with ${products.length} products`);
}

main().catch(console.error);
```

- [ ] **Step 2: Run and verify**

```bash
npx tsx scripts/generate-rag-doc.ts
```

Expected: Creates `public/api-overview.json` with all 20 products and their API metadata.

- [ ] **Step 3: Commit**

```bash
git add scripts/generate-rag-doc.ts public/api-overview.json
git commit -m "feat: add RAG document generator script and initial api-overview.json"
```
