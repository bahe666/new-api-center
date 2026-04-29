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

---

## 五、API 目录

以下是所有可调试的 API 列表。每个 API 提供了直达调试页面的链接。

### 块存储 ABS

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建块存储资源 | POST | `/abs/v1/volumes` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/abs/abs-create-volume) |
| 删除块存储资源 | DELETE | `/abs/v1/volumes/{volumeId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/abs/abs-delete-volume) |
| 查看块存储资源详情 | GET | `/abs/v1/volumes/{volumeId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/abs/abs-get-volume) |
| 获取块存储资源列表 | GET | `/abs/v1/volumes` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/abs/abs-list-volumes) |
| 块存储资源实例扩缩容 | PUT | `/abs/v1/volumes/{volumeId}/resize` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/abs/abs-resize-volume) |
| 更新块资源实例 | PUT | `/abs/v1/volumes/{volumeId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/abs/abs-update-volume) |

### 高性能AI算力池 ACP

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建任务 | POST | `/acp/v1/tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/acp/acp-create-task) |
| 查看任务详情 | GET | `/acp/v1/tasks/{taskId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/acp/acp-get-task) |
| 获取任务列表 | GET | `/acp/v1/tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/acp/acp-list-tasks) |
| 更新任务 | PUT | `/acp/v1/tasks/{taskId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/acp/acp-update-task) |
| 批量删除任务 | DELETE | `/acp/v1/tasks/batch` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/acp/acp-batch-delete-tasks) |
| 获取Worker列表 | GET | `/acp/v1/workers` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/acp/acp-list-workers) |

### 存储数据同步工具 ADS

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建同步任务 | POST | `/ads/v1/sync-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ads/ads-create-sync-task) |
| 删除同步任务 | DELETE | `/ads/v1/sync-tasks/{taskId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ads/ads-delete-sync-task) |
| 获取同步任务详情 | GET | `/ads/v1/sync-tasks/{taskId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ads/ads-get-sync-task) |
| 枚举同步任务列表 | GET | `/ads/v1/sync-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ads/ads-list-sync-tasks) |
| 更新同步任务 | PUT | `/ads/v1/sync-tasks/{taskId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ads/ads-update-sync-task) |
| 创建数据同步工具资源 | POST | `/ads/v1/resources` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ads/ads-create-resource) |

### 弹性计算集群 AEC2

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 获取AI弹性计算集群可用资源规格列表 | GET | `/aec2/v1/resource-specs` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aec2/aec2-list-resource-specs) |
| 查看工作空间详情 | GET | `/aec2/v1/workspaces/{workspaceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aec2/aec2-get-workspace) |
| 查看工作空间关联的集群列表 | GET | `/aec2/v1/workspaces/{workspaceId}/clusters` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aec2/aec2-list-workspace-clusters) |

### 文件存储 AFS

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 获取卷挂载点客户端信息 | GET | `/afs/v1/mount-points/{mountPointId}/clients` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/afs/afs-get-mount-clients) |

### 数据管理平台 AIDMP

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建数据集 | POST | `/aidmp/v1/datasets` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-create-dataset) |
| 删除数据集 | DELETE | `/aidmp/v1/datasets/{datasetId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-delete-dataset) |
| 获取数据集概览 | GET | `/aidmp/v1/datasets/{datasetId}/overview` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-get-dataset-overview) |
| 获取数据集详情 | GET | `/aidmp/v1/datasets/{datasetId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-get-dataset) |
| 获取数据集列表 | GET | `/aidmp/v1/datasets` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-list-datasets) |
| 获取公开数据集列表 | GET | `/aidmp/v1/datasets/public` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-list-public-datasets) |
| 检索公开数据集 | GET | `/aidmp/v1/datasets/public/search` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-search-public-datasets) |
| 检索数据集列表 | GET | `/aidmp/v1/datasets/search` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-search-datasets) |
| 添加数据集的成员 | POST | `/aidmp/v1/datasets/{datasetId}/members` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-add-dataset-member) |
| 移除数据集的成员 | POST | `/aidmp/v1/datasets/{datasetId}/members/remove` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-remove-dataset-member) |
| 创建文件上传任务 | POST | `/aidmp/v1/datasets/{datasetId}/upload-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-create-upload-task) |
| Web端完成文件上传 | POST | `/aidmp/v1/datasets/{datasetId}/upload-tasks/{taskId}/complete` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-complete-upload) |
| 创建远端提交版本任务 | POST | `/aidmp/v1/datasets/{datasetId}/remote-commits` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-create-remote-commit) |
| 启动服务端版本提交任务 | POST | `/aidmp/v1/datasets/{datasetId}/server-commits/start` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-start-server-commit) |
| 浏览数据集目录 | GET | `/aidmp/v1/datasets/{datasetId}/directory` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-browse-directory) |
| 搜索数据集目录 | GET | `/aidmp/v1/datasets/{datasetId}/directory/search` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-search-directory) |
| 取消数据传输任务 | POST | `/aidmp/v1/transfer-tasks/{taskId}/cancel` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-cancel-transfer-task) |
| 获取数据传输任务列表 | GET | `/aidmp/v1/transfer-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-list-transfer-tasks) |
| 创建数据集指定版本导出任务 | POST | `/aidmp/v1/datasets/{datasetId}/export-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-create-export-task) |
| 自然语言检索图片 | POST | `/aidmp/v1/datasets/{datasetId}/search-images` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aidmp/aidmp-search-images) |

### 对象存储 AOSS

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建对象存储资源包 | POST | `/aoss/v1/packages` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aoss/aoss-create-package) |
| 删除对象存储资源包 | DELETE | `/aoss/v1/packages/{packageId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aoss/aoss-delete-package) |
| 获取对象存储资源包 | GET | `/aoss/v1/packages/{packageId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aoss/aoss-get-package) |
| 变更对象存储资源包 | PUT | `/aoss/v1/packages/{packageId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/aoss/aoss-update-package) |

### 弹性裸金属服务器 BMS

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 启动裸金属实例 | POST | `/bms/v1/instances/{instanceId}/start` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-start-instance) |
| 获取裸金属实例详情 | GET | `/bms/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-get-instance) |
| 列举裸金属实例 | GET | `/bms/v1/instances` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-list-instances) |
| 重启裸金属实例 | POST | `/bms/v1/instances/{instanceId}/restart` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-restart-instance) |
| 重置裸金属实例密码 | POST | `/bms/v1/instances/{instanceId}/reset-password` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-reset-password) |
| 关机裸金属实例 | POST | `/bms/v1/instances/{instanceId}/stop` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-stop-instance) |
| 绑定密钥对 | POST | `/bms/v1/keypairs/bind` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-bind-keypair) |
| 创建密钥对 | POST | `/bms/v1/keypairs` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-create-keypair) |
| 删除密钥对 | DELETE | `/bms/v1/keypairs/{keypairId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-delete-keypair) |
| 获取密钥对 | GET | `/bms/v1/keypairs/{keypairId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-get-keypair) |
| 解绑密钥对 | POST | `/bms/v1/keypairs/unbind` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-unbind-keypair) |
| 批量创建云助手任务 | POST | `/bms/v1/assistant-tasks/batch` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-batch-create-assistant-tasks) |
| 查看云助手任务详情 | GET | `/bms/v1/assistant-tasks/{taskId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-get-assistant-task) |
| 获取云助手任务列表 | GET | `/bms/v1/assistant-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/bms/bms-list-assistant-tasks) |

### 费用与成本中心 BOSS

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 获取用户视角账单统计列表 | GET | `/boss/v1/bills/user` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-user-bills) |
| 获取账单明细 | GET | `/boss/v1/bills/details` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-get-bill-details) |
| 获取计费账户视角账单统计列表 | GET | `/boss/v1/bills/billing-account` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-billing-account-bills) |
| 获取管理组视角账单统计列表 | GET | `/boss/v1/bills/management-group` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-management-group-bills) |
| 获取资源组视角账单统计列表 | GET | `/boss/v1/bills/resource-group` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-resource-group-bills) |
| 获取订阅视角账单统计列表 | GET | `/boss/v1/bills/subscription` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-subscription-bills) |
| 获取收支明细列表 | GET | `/boss/v1/transactions` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-transactions) |
| 获取计费账户列表 | GET | `/boss/v1/billing-accounts` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-billing-accounts) |
| 编辑计费账户 | PUT | `/boss/v1/billing-accounts/{accountId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-update-billing-account) |
| 获取合同包详情与用量 | GET | `/boss/v1/contract-packages/{packageId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-get-contract-package) |
| 获取合同包列表 | GET | `/boss/v1/contract-packages` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-contract-packages) |
| 获取资源包详情与用量 | GET | `/boss/v1/resource-packages/{packageId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-get-resource-package) |
| 获取资源包列表 | GET | `/boss/v1/resource-packages` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-resource-packages) |
| 获取订单详情 | GET | `/boss/v1/orders/{orderId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-get-order) |
| 获取订单列表 | GET | `/boss/v1/orders` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/boss/boss-list-orders) |

### 云容器实例 CCI

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建应用 | POST | `/cci/v1/apps` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-create-app) |
| 删除应用 | DELETE | `/cci/v1/apps/{appId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-delete-app) |
| 获取应用详情 | GET | `/cci/v1/apps/{appId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-get-app) |
| 获取应用事件列表 | GET | `/cci/v1/apps/{appId}/events` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-list-app-events) |
| 获取我的应用列表 | GET | `/cci/v1/apps/mine` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-list-my-apps) |
| 获取应用列表 | GET | `/cci/v1/apps` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-list-apps) |
| 获取应用的实例事件列表 | GET | `/cci/v1/apps/{appId}/instance-events` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-list-app-instance-events) |
| 获取应用实例列表 | GET | `/cci/v1/apps/{appId}/instances` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-list-app-instances) |
| 确认后进入下一发布阶段 | POST | `/cci/v1/apps/{appId}/confirm-next-stage` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-confirm-next-stage) |
| 启动应用 | POST | `/cci/v1/apps/{appId}/start` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-start-app) |
| 停止应用 | POST | `/cci/v1/apps/{appId}/stop` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-stop-app) |
| 撤销升级应用 | POST | `/cci/v1/apps/{appId}/rollback` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-rollback-app) |
| 更新应用 | PUT | `/cci/v1/apps/{appId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-update-app) |
| 删除实例 | DELETE | `/cci/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-delete-instance) |
| 创建Configmap | POST | `/cci/v1/configmaps` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-create-configmap) |
| 删除Configmap | DELETE | `/cci/v1/configmaps/{configmapId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-delete-configmap) |
| 查询Configmap的基本信息 | GET | `/cci/v1/configmaps/{configmapId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-get-configmap) |
| 列出Configmap使用情况 | GET | `/cci/v1/configmaps/{configmapId}/usage` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-list-configmap-usage) |
| 查询Configmap列表 | GET | `/cci/v1/configmaps` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-list-configmaps) |
| 修改Configmap的基本信息 | PUT | `/cci/v1/configmaps/{configmapId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-update-configmap) |
| 创建Secret | POST | `/cci/v1/secrets` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-create-secret) |
| 删除Secret | DELETE | `/cci/v1/secrets/{secretId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-delete-secret) |
| 查询Secret的基本信息 | GET | `/cci/v1/secrets/{secretId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-get-secret) |
| 列出Secret使用情况 | GET | `/cci/v1/secrets/{secretId}/usage` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-list-secret-usage) |
| 查询Secret列表 | GET | `/cci/v1/secrets` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-list-secrets) |
| 修改Secret的基本信息 | PUT | `/cci/v1/secrets/{secretId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-update-secret) |
| 创建Service | POST | `/cci/v1/services` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-create-service) |
| 删除Service | DELETE | `/cci/v1/services/{serviceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cci/cci-delete-service) |

### 容器镜像服务 CCR

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 删除指定镜像站资源下的指定镜像 | DELETE | `/ccr/v1/registries/{registryId}/images/{imageId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ccr/ccr-delete-image) |
| 查询指定镜像站资源下的镜像列表 | GET | `/ccr/v1/registries/{registryId}/images` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ccr/ccr-list-images) |

### 云监控服务 CMS

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建将日志导出到OSS的配置 | POST | `/cms/v1/log-export/oss-configs` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-create-log-export-oss-config) |
| 获取将日志导出到OSS的配置 | GET | `/cms/v1/log-export/oss-configs/{configId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-get-log-export-oss-config) |
| 更新将日志导出到OSS的配置 | PUT | `/cms/v1/log-export/oss-configs/{configId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-update-log-export-oss-config) |
| 创建日志导出任务 | POST | `/cms/v1/log-export/tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-create-log-export-task) |
| 获取日志导出任务详情 | GET | `/cms/v1/log-export/tasks/{taskId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-get-log-export-task) |
| 列出所有的日志导出任务 | GET | `/cms/v1/log-export/tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-list-log-export-tasks) |
| 检查日志导出任务的状态 | GET | `/cms/v1/log-export/tasks/{taskId}/status` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-check-log-export-task-status) |
| 创建租户日志导出 | POST | `/cms/v1/log-export/tenant-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-create-tenant-log-export) |
| 获取租户日志导出任务详情 | GET | `/cms/v1/log-export/tenant-tasks/{taskId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-get-tenant-log-export-task) |
| 列出租户日志导出任务 | GET | `/cms/v1/log-export/tenant-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-list-tenant-log-export-tasks) |
| 查询日志流中特定产品的日志 | GET | `/cms/v1/logs/products/{productId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-query-product-logs) |
| 查询特定日志条目周围的日志 | GET | `/cms/v1/logs/{logId}/context` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-query-context-logs) |
| 查询日志实时流过滤器 | GET | `/cms/v1/log-streams/filters` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-query-log-stream-filters) |
| 列出日志流的可用产品 | GET | `/cms/v1/log-streams/products` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-list-log-stream-products) |
| 签名查询令牌 | POST | `/cms/v1/logs/sign-token` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-sign-query-token) |
| 生成用于签名日志实时流请求的令牌 | POST | `/cms/v1/log-streams/sign-token` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-sign-log-stream-token) |
| 查询指标 | GET | `/cms/v1/metrics` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-query-metrics) |
| 枚举监控空间资源 | GET | `/cms/v1/monitor-spaces/{spaceId}/resources` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-list-monitor-space-resources) |
| 查询监控空间的使用情况信息 | GET | `/cms/v1/monitor-spaces/{spaceId}/usage` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-get-monitor-space-usage) |
| 获取自定义过滤器列表 | GET | `/cms/v1/custom-filters` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-list-custom-filters) |
| 查询自定义过滤器值 | GET | `/cms/v1/custom-filters/{filterId}/values` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-query-custom-filter-values) |
| 列出可用于查询操作日志的操作过滤器 | GET | `/cms/v1/operation-logs/filters` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-list-operation-filters) |
| 列出可用于查询操作日志的操作产品 | GET | `/cms/v1/operation-logs/products` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-list-operation-products) |
| 查询用于过滤操作日志的操作过滤器值 | GET | `/cms/v1/operation-logs/filters/{filterId}/values` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-query-operation-filter-values) |
| 根据指定的条件检索操作日志 | GET | `/cms/v1/operation-logs` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-query-operation-logs) |
| 查询仪表板的过滤器 | GET | `/cms/v1/dashboards/filters` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/cms/cms-query-dashboard-filters) |

### 云服务器 ECS

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 获取云服务器实例列表 | GET | `/ecs/v1/instances` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-list-instances) |
| 查看云服务器实例详情 | GET | `/ecs/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-get-instance) |
| 启动云服务器实例 | POST | `/ecs/v1/instances/{instanceId}/start` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-start-instance) |
| 停止云服务器实例 | POST | `/ecs/v1/instances/{instanceId}/stop` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-stop-instance) |
| 重启云服务器实例 | POST | `/ecs/v1/instances/{instanceId}/restart` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-restart-instance) |
| 删除云服务器实例 | DELETE | `/ecs/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-delete-instance) |
| 更新云服务器实例 | PUT | `/ecs/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-update-instance) |
| 重置云服务器实例密码 | POST | `/ecs/v1/instances/{instanceId}/reset-password` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-reset-password) |
| 绑定云服务器实例卷 | POST | `/ecs/v1/instances/{instanceId}/volumes` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-bind-volume) |
| 卸载云服务器实例磁盘 | POST | `/ecs/v1/instances/{instanceId}/disks/unbind` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/ecs/ecs-unbind-disk) |

### 弹性公网IP EIP

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 查看 EIP 实例详情 | GET | `/eip/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/eip/eip-get-instance) |
| 获取某个EIP对应的 DNATRules 列表 | GET | `/eip/v1/instances/{instanceId}/dnat-rules` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/eip/eip-list-dnat-rules) |
| 获取EIP访问控制白名单列表 | GET | `/eip/v1/instances/{instanceId}/whitelist` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/eip/eip-list-whitelist) |

### 用户访问控制 IAM

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建用户 | POST | `/iam/v1/users` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-create-user) |
| 获取用户信息 | GET | `/iam/v1/users/{userId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-get-user) |
| 获取用户列表 | GET | `/iam/v1/users` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-list-users) |
| 更新用户信息 | PUT | `/iam/v1/users/{userId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-update-user) |
| 创建用户组 | POST | `/iam/v1/groups` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-create-group) |
| 删除用户组 | DELETE | `/iam/v1/groups/{groupId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-delete-group) |
| 获取用户组信息 | GET | `/iam/v1/groups/{groupId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-get-group) |
| 获取用户组列表 | GET | `/iam/v1/groups` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-list-groups) |
| 更新用户组信息 | PUT | `/iam/v1/groups/{groupId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-update-group) |
| 将用户添加到指定的用户组 | POST | `/iam/v1/groups/{groupId}/users` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-add-user-to-group) |
| 获取用户组里的用户列表 | GET | `/iam/v1/groups/{groupId}/users` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-list-group-users) |
| 将用户从用户组中移除 | DELETE | `/iam/v1/groups/{groupId}/users/{userId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-remove-user-from-group) |
| 创建AK | POST | `/iam/v1/access-keys` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-create-ak) |
| 删除AK | DELETE | `/iam/v1/access-keys/{akId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-delete-ak) |
| 修改AK状态 | PUT | `/iam/v1/access-keys/{akId}/status` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-update-ak-status) |
| 获取用户AK列表 | GET | `/iam/v1/access-keys` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/iam/iam-list-aks) |

### ModelStudio - 云开发机

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建开发机实例 | POST | `/modelstudio-dev/v1/instances` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-dev/modelstudio-dev-create-instance) |
| 退订开发机实例 | DELETE | `/modelstudio-dev/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-dev/modelstudio-dev-delete-instance) |
| 查看开发机实例详情 | GET | `/modelstudio-dev/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-dev/modelstudio-dev-get-instance) |
| 获取开发机实例列表 | GET | `/modelstudio-dev/v1/instances` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-dev/modelstudio-dev-list-instances) |
| 恢复开发机实例 | POST | `/modelstudio-dev/v1/instances/{instanceId}/resume` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-dev/modelstudio-dev-resume-instance) |
| 暂停开发机实例 | POST | `/modelstudio-dev/v1/instances/{instanceId}/pause` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-dev/modelstudio-dev-pause-instance) |
| 更新开发机实例 | PUT | `/modelstudio-dev/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-dev/modelstudio-dev-update-instance) |

### ModelStudio - 推理服务

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 获取服务详情 | GET | `/modelstudio-inference/v1/services/{serviceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-get-service) |
| 获取服务列表 | GET | `/modelstudio-inference/v1/services` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-list-services) |
| 上线服务 | POST | `/modelstudio-inference/v1/services/{serviceId}/online` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-online-service) |
| 下线服务 | POST | `/modelstudio-inference/v1/services/{serviceId}/offline` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-offline-service) |
| 模型预下载 | POST | `/modelstudio-inference/v1/services/{serviceId}/predownload` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-predownload-model) |
| 健康检查 | GET | `/modelstudio-inference/v1/services/{serviceId}/health` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-health-check) |
| 获取实例详情 | GET | `/modelstudio-inference/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-get-instance) |
| 获取实例列表 | GET | `/modelstudio-inference/v1/instances` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-list-instances) |
| 批量更新实例 | PUT | `/modelstudio-inference/v1/instances/batch` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-batch-update-instances) |
| 创建弹性伸缩规则 | POST | `/modelstudio-inference/v1/scaling-rules` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-create-scaling-rule) |
| 更新弹性伸缩规则 | PUT | `/modelstudio-inference/v1/scaling-rules/{ruleId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-update-scaling-rule) |
| 删除弹性伸缩规则 | DELETE | `/modelstudio-inference/v1/scaling-rules/{ruleId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-delete-scaling-rule) |
| 复制伸缩策略 | POST | `/modelstudio-inference/v1/scaling-policies/copy` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-copy-scaling-policy) |
| 创建弹性伸缩策略计划 | POST | `/modelstudio-inference/v1/scaling-plans` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-create-scaling-plan) |
| 获取缩放计划详情 | GET | `/modelstudio-inference/v1/scaling-plans/{planId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-get-scaling-plan) |
| 获取缩放计划列表 | GET | `/modelstudio-inference/v1/scaling-plans` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-list-scaling-plans) |
| 更新缩放计划 | PUT | `/modelstudio-inference/v1/scaling-plans/{planId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-update-scaling-plan) |
| 删除缩放计划 | DELETE | `/modelstudio-inference/v1/scaling-plans/{planId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-delete-scaling-plan) |
| 创建令牌 | POST | `/modelstudio-inference/v1/tokens` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-create-token) |
| 获取令牌 | GET | `/modelstudio-inference/v1/tokens/{tokenId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-get-token) |
| 获取令牌列表 | GET | `/modelstudio-inference/v1/tokens` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-list-tokens) |
| 更新令牌 | PUT | `/modelstudio-inference/v1/tokens/{tokenId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-update-token) |
| 删除令牌 | DELETE | `/modelstudio-inference/v1/tokens/{tokenId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-delete-token) |
| 校验实例名 | GET | `/modelstudio-inference/v1/instances/validate-name` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-inference/modelstudio-inference-validate-instance-name) |

### ModelStudio - 知识库

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建知识库 | POST | `/modelstudio-knowledge/v1/knowledge-bases` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-create-kb) |
| 删除知识库 | DELETE | `/modelstudio-knowledge/v1/knowledge-bases/{kbId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-delete-kb) |
| 检索知识库列表 | GET | `/modelstudio-knowledge/v1/knowledge-bases` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-list-kb) |
| 创建知识 | POST | `/modelstudio-knowledge/v1/knowledge-bases/{kbId}/knowledge` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-create-knowledge) |
| 删除知识 | DELETE | `/modelstudio-knowledge/v1/knowledge/{knowledgeId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-delete-knowledge) |
| 获取知识详情 | GET | `/modelstudio-knowledge/v1/knowledge/{knowledgeId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-get-knowledge) |
| 检索知识列表 | GET | `/modelstudio-knowledge/v1/knowledge-bases/{kbId}/knowledge` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-list-knowledge) |
| 检索分段列表 | GET | `/modelstudio-knowledge/v1/knowledge/{knowledgeId}/segments` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-list-segments) |
| 知识库RAG搜索 | POST | `/modelstudio-knowledge/v1/knowledge-bases/{kbId}/rag-search` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-rag-search) |
| 创建知识导入任务 | POST | `/modelstudio-knowledge/v1/import-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-create-import-task) |
| 启动知识导入任务 | POST | `/modelstudio-knowledge/v1/import-tasks/{taskId}/start` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-start-import-task) |
| 取消知识导入任务 | POST | `/modelstudio-knowledge/v1/import-tasks/{taskId}/cancel` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-cancel-import-task) |
| 获取知识导入任务详情 | GET | `/modelstudio-knowledge/v1/import-tasks/{taskId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-get-import-task) |
| 检索知识导入任务列表 | GET | `/modelstudio-knowledge/v1/import-tasks` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-list-import-tasks) |
| 批量预签名上传文件URL | POST | `/modelstudio-knowledge/v1/uploads/presign-batch` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-batch-presign-upload) |
| 完成大文件分片上传 | POST | `/modelstudio-knowledge/v1/uploads/{uploadId}/complete` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-complete-multipart-upload) |
| 预签名大文件分片上传的URL | POST | `/modelstudio-knowledge/v1/uploads/presign-multipart` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-presign-multipart-upload) |
| 创建知识库应用程序 | POST | `/modelstudio-knowledge/v1/apps` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-create-app) |
| 获取知识库应用程序详情 | GET | `/modelstudio-knowledge/v1/apps/{appId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-get-app) |
| 检索知识库应用程序列表 | GET | `/modelstudio-knowledge/v1/apps` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-list-apps) |
| 更新应用程序 | PUT | `/modelstudio-knowledge/v1/apps/{appId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-update-app) |
| 批量创建知识库应用发布 | POST | `/modelstudio-knowledge/v1/apps/{appId}/releases/batch` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-batch-create-releases) |
| 获取应用发布详情 | GET | `/modelstudio-knowledge/v1/apps/{appId}/releases/{releaseId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-get-release) |
| 展示应用发布记录 | GET | `/modelstudio-knowledge/v1/apps/{appId}/releases` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-list-releases) |
| 知识库对话体验 | POST | `/modelstudio-knowledge/v1/chat/experience` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-chat-experience) |
| 应用发布后的会话接口 | POST | `/modelstudio-knowledge/v1/chat/release` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-chat-release) |
| 获取对话详情 | GET | `/modelstudio-knowledge/v1/conversations/{conversationId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-get-conversation) |
| 获取所有模型 | GET | `/modelstudio-knowledge/v1/models` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-list-models) |
| 检索所有搜索历史 | GET | `/modelstudio-knowledge/v1/search-history` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/modelstudio-knowledge/modelstudio-knowledge-list-search-history) |

### 资源管理 RM

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 创建管理组 | POST | `/rm/v1/management-groups` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-create-management-group) |
| 获取管理组信息 | GET | `/rm/v1/management-groups/{groupId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-get-management-group) |
| 获取管理组列表 | GET | `/rm/v1/management-groups` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-list-management-groups) |
| 更新管理组信息 | PUT | `/rm/v1/management-groups/{groupId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-update-management-group) |
| 创建资源组 | POST | `/rm/v1/resource-groups` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-create-resource-group) |
| 获取资源组信息 | GET | `/rm/v1/resource-groups/{groupId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-get-resource-group) |
| 获取任意权限的资源组列表 | GET | `/rm/v1/resource-groups` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-list-resource-groups) |
| 根据资源组获取计费账户信息 | GET | `/rm/v1/resource-groups/{groupId}/billing-account` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-get-resource-group-billing-account) |
| 创建订阅 | POST | `/rm/v1/subscriptions` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-create-subscription) |
| 获取订阅信息 | GET | `/rm/v1/subscriptions/{subscriptionId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-get-subscription) |
| 获取订阅列表 | GET | `/rm/v1/subscriptions` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-list-subscriptions) |
| 更新订阅绑定的计费账户信息 | PUT | `/rm/v1/subscriptions/{subscriptionId}/billing-account` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-update-subscription-billing-account) |
| 更新订阅名称 | PUT | `/rm/v1/subscriptions/{subscriptionId}/name` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-update-subscription-name) |
| 根据订阅标识获取计费账户信息 | GET | `/rm/v1/subscriptions/{subscriptionId}/billing-account` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-get-subscription-billing-account) |
| 获取某个订阅的操作记录 | GET | `/rm/v1/subscriptions/{subscriptionId}/operations` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-list-subscription-operations) |
| 获取资源详情 | GET | `/rm/v1/resources/{resourceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-get-resource) |
| 获取资源统计列表 | GET | `/rm/v1/resources/stats` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-list-resource-stats) |
| 获取任意权限资源列表 | GET | `/rm/v1/resources` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/rm/rm-list-resources) |

### 私有网络 VPC

| API 名称 | 方法 | 路径 | 调试链接 |
|---------|------|------|----------|
| 查看 VPC 实例详情 | GET | `/vpc/v1/instances/{instanceId}` | [去调试](https://new-api-center-bachs-projects-76845f03.vercel.app/api-explorer/vpc/vpc-get-instance) |

