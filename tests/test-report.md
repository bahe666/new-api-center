# 测试执行报告

## 测试概要

| 分类 | 通过 | 失败 | 待验证 |
|---|---|---|---|
| TC-01 路由与导航 | 5 | 0 | 4 |
| TC-02 侧边栏行为 | 2 | 1 | 7 |
| TC-03 产品列表页 | 3 | 0 | 4 |
| TC-04 全局搜索 | 3 | 0 | 13 |
| TC-05 ECS 详情一致性 | 2 | 1 (严重) | 9 |
| TC-06 跨页面交互 | 1 | 1 | 2 |
| TC-07 视觉与布局 | 3 | 0 | 2 |

---

## 🔴 严重 BUG

### BUG-01: ECS API 详情内容完全不匹配原站（TC-05-01 ~ TC-05-10）

**严重程度**: P0 — 核心功能失败

**现象**: `ecs-docs.ts` 中的内容是 agent 编造的假数据，不是从原站抓取的真实内容。

**具体差异（以"获取云服务器实例列表"为例）**:

| 检查项 | 原站 | 当前门户 | 匹配 |
|---|---|---|---|
| 请求路径 | `/compute/ecs/data/v1/ecsInstances` | `/ecs/v1/instances` | ❌ |
| Base URL | `ecs.cn-sh-01.sensecoreapi.cn` | `api.sensecore.cn` | ❌ |
| 参数 subscription_name (string) 描述"订阅" | ✅ | ❌ 不存在 | ❌ |
| 参数 resource_group_name (string) 描述"资源组" | ✅ | ❌ 不存在 | ❌ |
| 参数 zone (string) 描述"可用区" | ✅ | ❌ 不存在 | ❌ |
| 参数 filter (string) 描述"列表过滤器" | ✅ | ❌ 不存在 | ❌ |
| 参数 order_by (string) 描述"排列顺序" | ✅ | ❌ 不存在 | ❌ |
| 参数 page_size (int32) 描述"返回的最大项目数" | ✅ | ❌ 不存在 | ❌ |
| 参数 page_token (string) 描述"下一页令牌" | ✅ | ❌ 不存在 | ❌ |
| 假参数 pageNum/name/status/flavorId/vpcId | 不存在 | ✅ 存在 | ❌ 多余 |
| Response: ecs_instances (object[]) | ✅ | ❌ 不存在 | ❌ |
| Response: next_page_token (string) | ✅ | ❌ 不存在 | ❌ |
| Response: total_size (int32) | ✅ | ❌ 不存在 | ❌ |
| 可折叠 `<details>` 面板 | ✅ | ❌ 0个 | ❌ |

**修复方案**: 必须从原站逐个抓取 10 个 ECS API 的真实 HTML 内容，替换 `ecs-docs.ts`。

---

### BUG-02: 侧边栏折叠不生效（TC-02-02）

**严重程度**: P1 — 交互功能异常

**现象**: 点击已展开产品的箭头/行区域无法折叠。`<Link>` 的 `stopPropagation` 与外层 `onClick` 的 toggle 逻辑冲突。

**根因**: agent-browser（和真实用户点击）命中的是 `<Link>` 元素区域，`e.stopPropagation()` 阻止了事件冒泡到外层 `div` 的 `toggleExpand`。

**修复方案**: 箭头区域单独处理 toggle，产品名区域只做导航，两者不嵌套。

---

### BUG-03: iframe 详情页 URL slug 可能不匹配原站（TC-06-04）

**严重程度**: P2 — 非 ECS 产品详情页可能加载失败

**现象**: AEC2 的 iframe src 为 `/micro/help/docs/API/aec2/list-resource-specs`，但原站实际 slug 格式不同（原站使用类似 `elastic-compute-cluster-service-list-resource-specs` 的长 slug）。iframe 可能加载 404。

**修复方案**: 更新所有产品数据文件中的 `detailUrl` 为原站真实 URL。

---

## ✅ 已通过的测试

| 用例 | 结果 |
|---|---|
| TC-01-01: 根路径重定向 → /apis/ecs | ✅ |
| TC-01-02: 侧边栏产品名点击导航 | ✅ |
| TC-01-03: 侧边栏端点点击导航 | ✅ |
| TC-01-04: 表格行点击导航 | ✅ |
| TC-01-05: 面包屑产品链接 | ✅ (文本正确) |
| TC-02-01: 初始展开状态 (ECS展开, 19个折叠) | ✅ |
| TC-03-01: ECS API 表格 10 行 | ✅ |
| TC-04-01: 搜索框存在 | ✅ |
| TC-04-02: 输入触发下拉 | ✅ |
| TC-04-03: 搜索结果分组 | ✅ |
| TC-07-01: 导航栏 sticky (position=sticky top=0 z=300) | ✅ |
| TC-07-02: 布局不重叠 (sidebar 240px + content 1040px) | ✅ |

---

## 📋 待验证（手动检查）

以下测试需要更深入的交互或视觉检查，建议人工验证：

- TC-01-06: 面包屑无分类层级
- TC-01-07: 浏览器前进/后退
- TC-02-03: 多产品同时展开
- TC-02-05: 当前端点蓝色高亮样式
- TC-02-09: 侧边栏独立滚动
- TC-03-02: Method 颜色正确性
- TC-03-03: 表格行 hover 效果
- TC-04-05 ~ TC-04-16: 搜索高亮、键盘导航、ESC关闭等
- TC-05-02 ~ TC-05-10: 其余 9 个 ECS API 的内容（预期全部 ❌，同 BUG-01）
- TC-07-03 ~ TC-07-05: 视觉细节
