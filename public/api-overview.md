# SenseCore API Explorer 使用指南

本文档供智能助手使用。当用户询问如何调用某个 API 时，请根据本文档定位对应的 API Explorer 页面并引导用户完成调试。

> **名称说明**：API Explorer 即原来的「API 中心」，经过改版升级后统一更名为 API Explorer。如果用户提到「API 中心」，请理解为同一产品。

---

## 一、API Explorer 入口

API Explorer 的入口位于 SenseCore 控制台导航栏的「**文档**」下拉菜单中，点击「**API Explorer**」即可进入。

直达链接：https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer

---

## 二、首页结构（产品列表页）

进入 API Explorer 后，首先看到的是产品列表页，布局如下：

- **左侧栏**：产品导航树，列出所有 20 个云服务产品，可展开查看每个产品下的 API 列表
- **右侧主区域**：当前选中产品的 API 表格，包含 API 名称、描述、请求方法和路径
- **表格操作列**：每个 API 有「查看文档」链接，可跳转到帮助中心的详细文档

点击表格中的任意一行 API，即可进入该 API 的调试页面（三栏界面）。

---

## 三、API 调试页面结构（三栏界面）

调试页面分为三栏：

### 左栏 — 产品导航

与首页相同的产品树，可随时切换到其他 API，无需返回首页。

### 中栏 — 调试面板

从上到下包含：

1. **API 标题**：显示当前 API 的名称、HTTP 方法和请求路径
2. **Bearer Token**：提供一个调试用的 Token，点击「复制」按钮可复制到剪贴板
3. **AK/SK 提醒**：提示用户正式环境应使用 AK/SK 签名认证，并提供获取链接
4. **调试表单**：包含 Base URL、Bearer Token 输入框和可选参数
5. **Send API Request 按钮**：点击发起模拟调用

> **注意**：未登录用户点击调试面板时会被引导到登录页面。

### 右栏 — 文档与示例

包含三个标签页：

- **参数说明**：该 API 的请求参数、响应格式和错误码说明
- **文档说明**：来自帮助中心的完整使用文档（请求示例、响应示例等）
- **代码示例**：多语言调用代码（curl、Python、Go、Node.js 等）

---

## 四、调试步骤

引导用户按以下步骤操作：

1. 进入对应 API 的调试页面（通过下方链接直达）
2. 在中栏点击「复制」获取 Bearer Token
3. 将 Token 粘贴到调试表单的 Bearer Token 输入框中
4. 填写必要的请求参数
5. 点击「Send API Request」发起调用
6. 查看返回的响应结果

> **正式接入提醒**：Bearer Token 仅供在线调试使用。正式环境请前往 [IAM 控制台](https://console.sensecore.cn/cn-sh-01/iam/Security/access-key) 创建 AccessKey，使用 AK/SK 签名认证方式调用 API。
