# SenseCore API 中心

SenseCore 云服务 API 完整目录。共 20 个产品，239 个 API 接口。

---

## 块存储 ABS

块存储资源的创建、扩缩容与生命周期管理

产品标识：abs | 分类：storage | API 数量：6

### 创建块存储资源

- **接口ID**: abs-create-volume
- **方法**: POST
- **路径**: `/abs/v1/volumes`
- **描述**: 创建块存储资源

### 删除块存储资源

- **接口ID**: abs-delete-volume
- **方法**: DELETE
- **路径**: `/abs/v1/volumes/{volumeId}`
- **描述**: 删除块存储资源

### 查看块存储资源详情

- **接口ID**: abs-get-volume
- **方法**: GET
- **路径**: `/abs/v1/volumes/{volumeId}`
- **描述**: 查看块存储资源详情

### 获取块存储资源列表

- **接口ID**: abs-list-volumes
- **方法**: GET
- **路径**: `/abs/v1/volumes`
- **描述**: 获取块存储资源列表

### 块存储资源实例扩缩容

- **接口ID**: abs-resize-volume
- **方法**: PUT
- **路径**: `/abs/v1/volumes/{volumeId}/resize`
- **描述**: 块存储资源实例扩缩容

### 更新块资源实例

- **接口ID**: abs-update-volume
- **方法**: PUT
- **路径**: `/abs/v1/volumes/{volumeId}`
- **描述**: 更新块资源实例

---

## 高性能AI算力池 ACP

高性能 AI 训练任务与 Worker 管理

产品标识：acp | 分类：compute | API 数量：6

### 创建任务

- **接口ID**: acp-create-task
- **方法**: POST
- **路径**: `/acp/v1/tasks`
- **描述**: 创建任务

### 查看任务详情

- **接口ID**: acp-get-task
- **方法**: GET
- **路径**: `/acp/v1/tasks/{taskId}`
- **描述**: 查看任务详情

### 获取任务列表

- **接口ID**: acp-list-tasks
- **方法**: GET
- **路径**: `/acp/v1/tasks`
- **描述**: 获取任务列表

### 更新任务

- **接口ID**: acp-update-task
- **方法**: PUT
- **路径**: `/acp/v1/tasks/{taskId}`
- **描述**: 更新任务

### 批量删除任务

- **接口ID**: acp-batch-delete-tasks
- **方法**: DELETE
- **路径**: `/acp/v1/tasks/batch`
- **描述**: 批量删除任务

### 获取Worker列表

- **接口ID**: acp-list-workers
- **方法**: GET
- **路径**: `/acp/v1/workers`
- **描述**: 获取Worker列表

---

## 存储数据同步工具 ADS

数据同步任务与资源管理

产品标识：ads | 分类：storage | API 数量：6

### 创建同步任务

- **接口ID**: ads-create-sync-task
- **方法**: POST
- **路径**: `/ads/v1/sync-tasks`
- **描述**: 创建同步任务

### 删除同步任务

- **接口ID**: ads-delete-sync-task
- **方法**: DELETE
- **路径**: `/ads/v1/sync-tasks/{taskId}`
- **描述**: 删除同步任务

### 获取同步任务详情

- **接口ID**: ads-get-sync-task
- **方法**: GET
- **路径**: `/ads/v1/sync-tasks/{taskId}`
- **描述**: 获取同步任务详情

### 枚举同步任务列表

- **接口ID**: ads-list-sync-tasks
- **方法**: GET
- **路径**: `/ads/v1/sync-tasks`
- **描述**: 枚举同步任务列表

### 更新同步任务

- **接口ID**: ads-update-sync-task
- **方法**: PUT
- **路径**: `/ads/v1/sync-tasks/{taskId}`
- **描述**: 更新同步任务

### 创建数据同步工具资源

- **接口ID**: ads-create-resource
- **方法**: POST
- **路径**: `/ads/v1/resources`
- **描述**: 创建数据同步工具资源

---

## 弹性计算集群 AEC2

AI 弹性计算集群资源规格与工作空间管理

产品标识：aec2 | 分类：compute | API 数量：3

### 获取AI弹性计算集群可用资源规格列表

- **接口ID**: aec2-list-resource-specs
- **方法**: GET
- **路径**: `/aec2/v1/resource-specs`
- **描述**: 获取AI弹性计算集群可用资源规格列表

### 查看工作空间详情

- **接口ID**: aec2-get-workspace
- **方法**: GET
- **路径**: `/aec2/v1/workspaces/{workspaceId}`
- **描述**: 查看工作空间详情

### 查看工作空间关联的集群列表

- **接口ID**: aec2-list-workspace-clusters
- **方法**: GET
- **路径**: `/aec2/v1/workspaces/{workspaceId}/clusters`
- **描述**: 查看工作空间关联的集群列表

---

## 文件存储 AFS

文件存储卷挂载点管理

产品标识：afs | 分类：storage | API 数量：1

### 获取卷挂载点客户端信息

- **接口ID**: afs-get-mount-clients
- **方法**: GET
- **路径**: `/afs/v1/mount-points/{mountPointId}/clients`
- **描述**: 获取卷挂载点客户端信息

---

## 数据管理平台 AIDMP

AI 数据集管理、检索与传输

产品标识：aidmp | 分类：ai-ml | API 数量：20

### 创建数据集

- **接口ID**: aidmp-create-dataset
- **方法**: POST
- **路径**: `/aidmp/v1/datasets`
- **描述**: 创建数据集

### 删除数据集

- **接口ID**: aidmp-delete-dataset
- **方法**: DELETE
- **路径**: `/aidmp/v1/datasets/{datasetId}`
- **描述**: 删除数据集

### 获取数据集概览

- **接口ID**: aidmp-get-dataset-overview
- **方法**: GET
- **路径**: `/aidmp/v1/datasets/{datasetId}/overview`
- **描述**: 获取数据集概览

### 获取数据集详情

- **接口ID**: aidmp-get-dataset
- **方法**: GET
- **路径**: `/aidmp/v1/datasets/{datasetId}`
- **描述**: 获取数据集详情

### 获取数据集列表

- **接口ID**: aidmp-list-datasets
- **方法**: GET
- **路径**: `/aidmp/v1/datasets`
- **描述**: 获取数据集列表

### 获取公开数据集列表

- **接口ID**: aidmp-list-public-datasets
- **方法**: GET
- **路径**: `/aidmp/v1/datasets/public`
- **描述**: 获取公开数据集列表

### 检索公开数据集

- **接口ID**: aidmp-search-public-datasets
- **方法**: GET
- **路径**: `/aidmp/v1/datasets/public/search`
- **描述**: 检索公开数据集

### 检索数据集列表

- **接口ID**: aidmp-search-datasets
- **方法**: GET
- **路径**: `/aidmp/v1/datasets/search`
- **描述**: 检索数据集列表

### 添加数据集的成员

- **接口ID**: aidmp-add-dataset-member
- **方法**: POST
- **路径**: `/aidmp/v1/datasets/{datasetId}/members`
- **描述**: 添加数据集的成员

### 移除数据集的成员

- **接口ID**: aidmp-remove-dataset-member
- **方法**: POST
- **路径**: `/aidmp/v1/datasets/{datasetId}/members/remove`
- **描述**: 移除数据集的成员

### 创建文件上传任务

- **接口ID**: aidmp-create-upload-task
- **方法**: POST
- **路径**: `/aidmp/v1/datasets/{datasetId}/upload-tasks`
- **描述**: 创建文件上传任务

### Web端完成文件上传

- **接口ID**: aidmp-complete-upload
- **方法**: POST
- **路径**: `/aidmp/v1/datasets/{datasetId}/upload-tasks/{taskId}/complete`
- **描述**: Web端完成文件上传

### 创建远端提交版本任务

- **接口ID**: aidmp-create-remote-commit
- **方法**: POST
- **路径**: `/aidmp/v1/datasets/{datasetId}/remote-commits`
- **描述**: 创建远端提交版本任务

### 启动服务端版本提交任务

- **接口ID**: aidmp-start-server-commit
- **方法**: POST
- **路径**: `/aidmp/v1/datasets/{datasetId}/server-commits/start`
- **描述**: 启动服务端版本提交任务

### 浏览数据集目录

- **接口ID**: aidmp-browse-directory
- **方法**: GET
- **路径**: `/aidmp/v1/datasets/{datasetId}/directory`
- **描述**: 浏览数据集目录

### 搜索数据集目录

- **接口ID**: aidmp-search-directory
- **方法**: GET
- **路径**: `/aidmp/v1/datasets/{datasetId}/directory/search`
- **描述**: 搜索数据集目录

### 取消数据传输任务

- **接口ID**: aidmp-cancel-transfer-task
- **方法**: POST
- **路径**: `/aidmp/v1/transfer-tasks/{taskId}/cancel`
- **描述**: 取消数据传输任务

### 获取数据传输任务列表

- **接口ID**: aidmp-list-transfer-tasks
- **方法**: GET
- **路径**: `/aidmp/v1/transfer-tasks`
- **描述**: 获取数据传输任务列表

### 创建数据集指定版本导出任务

- **接口ID**: aidmp-create-export-task
- **方法**: POST
- **路径**: `/aidmp/v1/datasets/{datasetId}/export-tasks`
- **描述**: 创建数据集指定版本导出任务

### 自然语言检索图片

- **接口ID**: aidmp-search-images
- **方法**: POST
- **路径**: `/aidmp/v1/datasets/{datasetId}/search-images`
- **描述**: 自然语言检索图片

---

## 对象存储 AOSS

对象存储资源包管理

产品标识：aoss | 分类：storage | API 数量：4

### 创建对象存储资源包

- **接口ID**: aoss-create-package
- **方法**: POST
- **路径**: `/aoss/v1/packages`
- **描述**: 创建对象存储资源包

### 删除对象存储资源包

- **接口ID**: aoss-delete-package
- **方法**: DELETE
- **路径**: `/aoss/v1/packages/{packageId}`
- **描述**: 删除对象存储资源包

### 获取对象存储资源包

- **接口ID**: aoss-get-package
- **方法**: GET
- **路径**: `/aoss/v1/packages/{packageId}`
- **描述**: 获取对象存储资源包

### 变更对象存储资源包

- **接口ID**: aoss-update-package
- **方法**: PUT
- **路径**: `/aoss/v1/packages/{packageId}`
- **描述**: 变更对象存储资源包

---

## 弹性裸金属服务器 BMS

高性能裸金属服务器实例管理

产品标识：bms | 分类：compute | API 数量：14

### 启动裸金属实例

- **接口ID**: bms-start-instance
- **方法**: POST
- **路径**: `/bms/v1/instances/{instanceId}/start`
- **描述**: 启动裸金属实例

### 获取裸金属实例详情

- **接口ID**: bms-get-instance
- **方法**: GET
- **路径**: `/bms/v1/instances/{instanceId}`
- **描述**: 获取裸金属实例详情

### 列举裸金属实例

- **接口ID**: bms-list-instances
- **方法**: GET
- **路径**: `/bms/v1/instances`
- **描述**: 列举裸金属实例

### 重启裸金属实例

- **接口ID**: bms-restart-instance
- **方法**: POST
- **路径**: `/bms/v1/instances/{instanceId}/restart`
- **描述**: 重启裸金属实例

### 重置裸金属实例密码

- **接口ID**: bms-reset-password
- **方法**: POST
- **路径**: `/bms/v1/instances/{instanceId}/reset-password`
- **描述**: 重置裸金属实例密码

### 关机裸金属实例

- **接口ID**: bms-stop-instance
- **方法**: POST
- **路径**: `/bms/v1/instances/{instanceId}/stop`
- **描述**: 关机裸金属实例

### 绑定密钥对

- **接口ID**: bms-bind-keypair
- **方法**: POST
- **路径**: `/bms/v1/keypairs/bind`
- **描述**: 绑定密钥对

### 创建密钥对

- **接口ID**: bms-create-keypair
- **方法**: POST
- **路径**: `/bms/v1/keypairs`
- **描述**: 创建密钥对

### 删除密钥对

- **接口ID**: bms-delete-keypair
- **方法**: DELETE
- **路径**: `/bms/v1/keypairs/{keypairId}`
- **描述**: 删除密钥对

### 获取密钥对

- **接口ID**: bms-get-keypair
- **方法**: GET
- **路径**: `/bms/v1/keypairs/{keypairId}`
- **描述**: 获取密钥对

### 解绑密钥对

- **接口ID**: bms-unbind-keypair
- **方法**: POST
- **路径**: `/bms/v1/keypairs/unbind`
- **描述**: 解绑密钥对

### 批量创建云助手任务

- **接口ID**: bms-batch-create-assistant-tasks
- **方法**: POST
- **路径**: `/bms/v1/assistant-tasks/batch`
- **描述**: 批量创建云助手任务

### 查看云助手任务详情

- **接口ID**: bms-get-assistant-task
- **方法**: GET
- **路径**: `/bms/v1/assistant-tasks/{taskId}`
- **描述**: 查看云助手任务详情

### 获取云助手任务列表

- **接口ID**: bms-list-assistant-tasks
- **方法**: GET
- **路径**: `/bms/v1/assistant-tasks`
- **描述**: 获取云助手任务列表

---

## 费用与成本中心 BOSS

账单统计、计费账户、订单与资源包管理

产品标识：boss | 分类：networking | API 数量：15

### 获取用户视角账单统计列表

- **接口ID**: boss-list-user-bills
- **方法**: GET
- **路径**: `/boss/v1/bills/user`
- **描述**: 获取用户视角账单统计列表

### 获取账单明细

- **接口ID**: boss-get-bill-details
- **方法**: GET
- **路径**: `/boss/v1/bills/details`
- **描述**: 获取账单明细

### 获取计费账户视角账单统计列表

- **接口ID**: boss-list-billing-account-bills
- **方法**: GET
- **路径**: `/boss/v1/bills/billing-account`
- **描述**: 获取计费账户视角账单统计列表

### 获取管理组视角账单统计列表

- **接口ID**: boss-list-management-group-bills
- **方法**: GET
- **路径**: `/boss/v1/bills/management-group`
- **描述**: 获取管理组视角账单统计列表

### 获取资源组视角账单统计列表

- **接口ID**: boss-list-resource-group-bills
- **方法**: GET
- **路径**: `/boss/v1/bills/resource-group`
- **描述**: 获取资源组视角账单统计列表

### 获取订阅视角账单统计列表

- **接口ID**: boss-list-subscription-bills
- **方法**: GET
- **路径**: `/boss/v1/bills/subscription`
- **描述**: 获取订阅视角账单统计列表

### 获取收支明细列表

- **接口ID**: boss-list-transactions
- **方法**: GET
- **路径**: `/boss/v1/transactions`
- **描述**: 获取收支明细列表

### 获取计费账户列表

- **接口ID**: boss-list-billing-accounts
- **方法**: GET
- **路径**: `/boss/v1/billing-accounts`
- **描述**: 获取计费账户列表

### 编辑计费账户

- **接口ID**: boss-update-billing-account
- **方法**: PUT
- **路径**: `/boss/v1/billing-accounts/{accountId}`
- **描述**: 编辑计费账户

### 获取合同包详情与用量

- **接口ID**: boss-get-contract-package
- **方法**: GET
- **路径**: `/boss/v1/contract-packages/{packageId}`
- **描述**: 获取合同包详情与用量

### 获取合同包列表

- **接口ID**: boss-list-contract-packages
- **方法**: GET
- **路径**: `/boss/v1/contract-packages`
- **描述**: 获取合同包列表

### 获取资源包详情与用量

- **接口ID**: boss-get-resource-package
- **方法**: GET
- **路径**: `/boss/v1/resource-packages/{packageId}`
- **描述**: 获取资源包详情与用量

### 获取资源包列表

- **接口ID**: boss-list-resource-packages
- **方法**: GET
- **路径**: `/boss/v1/resource-packages`
- **描述**: 获取资源包列表

### 获取订单详情

- **接口ID**: boss-get-order
- **方法**: GET
- **路径**: `/boss/v1/orders/{orderId}`
- **描述**: 获取订单详情

### 获取订单列表

- **接口ID**: boss-list-orders
- **方法**: GET
- **路径**: `/boss/v1/orders`
- **描述**: 获取订单列表

---

## 云容器实例 CCI

云容器实例的应用部署与配置管理

产品标识：cci | 分类：containers | API 数量：28

### 创建应用

- **接口ID**: cci-create-app
- **方法**: POST
- **路径**: `/cci/v1/apps`
- **描述**: 创建应用

### 删除应用

- **接口ID**: cci-delete-app
- **方法**: DELETE
- **路径**: `/cci/v1/apps/{appId}`
- **描述**: 删除应用

### 获取应用详情

- **接口ID**: cci-get-app
- **方法**: GET
- **路径**: `/cci/v1/apps/{appId}`
- **描述**: 获取应用详情

### 获取应用事件列表

- **接口ID**: cci-list-app-events
- **方法**: GET
- **路径**: `/cci/v1/apps/{appId}/events`
- **描述**: 获取应用事件列表

### 获取我的应用列表

- **接口ID**: cci-list-my-apps
- **方法**: GET
- **路径**: `/cci/v1/apps/mine`
- **描述**: 获取我的应用列表

### 获取应用列表

- **接口ID**: cci-list-apps
- **方法**: GET
- **路径**: `/cci/v1/apps`
- **描述**: 获取应用列表

### 获取应用的实例事件列表

- **接口ID**: cci-list-app-instance-events
- **方法**: GET
- **路径**: `/cci/v1/apps/{appId}/instance-events`
- **描述**: 获取应用的实例事件列表

### 获取应用实例列表

- **接口ID**: cci-list-app-instances
- **方法**: GET
- **路径**: `/cci/v1/apps/{appId}/instances`
- **描述**: 获取应用实例列表

### 确认后进入下一发布阶段

- **接口ID**: cci-confirm-next-stage
- **方法**: POST
- **路径**: `/cci/v1/apps/{appId}/confirm-next-stage`
- **描述**: 确认后进入下一发布阶段

### 启动应用

- **接口ID**: cci-start-app
- **方法**: POST
- **路径**: `/cci/v1/apps/{appId}/start`
- **描述**: 启动应用

### 停止应用

- **接口ID**: cci-stop-app
- **方法**: POST
- **路径**: `/cci/v1/apps/{appId}/stop`
- **描述**: 停止应用

### 撤销升级应用

- **接口ID**: cci-rollback-app
- **方法**: POST
- **路径**: `/cci/v1/apps/{appId}/rollback`
- **描述**: 撤销升级应用

### 更新应用

- **接口ID**: cci-update-app
- **方法**: PUT
- **路径**: `/cci/v1/apps/{appId}`
- **描述**: 更新应用

### 删除实例

- **接口ID**: cci-delete-instance
- **方法**: DELETE
- **路径**: `/cci/v1/instances/{instanceId}`
- **描述**: 删除实例

### 创建Configmap

- **接口ID**: cci-create-configmap
- **方法**: POST
- **路径**: `/cci/v1/configmaps`
- **描述**: 创建Configmap

### 删除Configmap

- **接口ID**: cci-delete-configmap
- **方法**: DELETE
- **路径**: `/cci/v1/configmaps/{configmapId}`
- **描述**: 删除Configmap

### 查询Configmap的基本信息

- **接口ID**: cci-get-configmap
- **方法**: GET
- **路径**: `/cci/v1/configmaps/{configmapId}`
- **描述**: 查询Configmap的基本信息

### 列出Configmap使用情况

- **接口ID**: cci-list-configmap-usage
- **方法**: GET
- **路径**: `/cci/v1/configmaps/{configmapId}/usage`
- **描述**: 列出Configmap使用情况

### 查询Configmap列表

- **接口ID**: cci-list-configmaps
- **方法**: GET
- **路径**: `/cci/v1/configmaps`
- **描述**: 查询Configmap列表

### 修改Configmap的基本信息

- **接口ID**: cci-update-configmap
- **方法**: PUT
- **路径**: `/cci/v1/configmaps/{configmapId}`
- **描述**: 修改Configmap的基本信息

### 创建Secret

- **接口ID**: cci-create-secret
- **方法**: POST
- **路径**: `/cci/v1/secrets`
- **描述**: 创建Secret

### 删除Secret

- **接口ID**: cci-delete-secret
- **方法**: DELETE
- **路径**: `/cci/v1/secrets/{secretId}`
- **描述**: 删除Secret

### 查询Secret的基本信息

- **接口ID**: cci-get-secret
- **方法**: GET
- **路径**: `/cci/v1/secrets/{secretId}`
- **描述**: 查询Secret的基本信息

### 列出Secret使用情况

- **接口ID**: cci-list-secret-usage
- **方法**: GET
- **路径**: `/cci/v1/secrets/{secretId}/usage`
- **描述**: 列出Secret使用情况

### 查询Secret列表

- **接口ID**: cci-list-secrets
- **方法**: GET
- **路径**: `/cci/v1/secrets`
- **描述**: 查询Secret列表

### 修改Secret的基本信息

- **接口ID**: cci-update-secret
- **方法**: PUT
- **路径**: `/cci/v1/secrets/{secretId}`
- **描述**: 修改Secret的基本信息

### 创建Service

- **接口ID**: cci-create-service
- **方法**: POST
- **路径**: `/cci/v1/services`
- **描述**: 创建Service

### 删除Service

- **接口ID**: cci-delete-service
- **方法**: DELETE
- **路径**: `/cci/v1/services/{serviceId}`
- **描述**: 删除Service

---

## 容器镜像服务 CCR

容器镜像的查询与管理

产品标识：ccr | 分类：containers | API 数量：2

### 删除指定镜像站资源下的指定镜像

- **接口ID**: ccr-delete-image
- **方法**: DELETE
- **路径**: `/ccr/v1/registries/{registryId}/images/{imageId}`
- **描述**: 删除指定镜像站资源下的指定镜像

### 查询指定镜像站资源下的镜像列表

- **接口ID**: ccr-list-images
- **方法**: GET
- **路径**: `/ccr/v1/registries/{registryId}/images`
- **描述**: 查询指定镜像站资源下的镜像列表

---

## 云监控服务 CMS

日志导出、监控指标查询与操作审计

产品标识：cms | 分类：containers | API 数量：26

### 创建将日志导出到OSS的配置

- **接口ID**: cms-create-log-export-oss-config
- **方法**: POST
- **路径**: `/cms/v1/log-export/oss-configs`
- **描述**: 创建将日志导出到OSS的配置

### 获取将日志导出到OSS的配置

- **接口ID**: cms-get-log-export-oss-config
- **方法**: GET
- **路径**: `/cms/v1/log-export/oss-configs/{configId}`
- **描述**: 获取将日志导出到OSS的配置

### 更新将日志导出到OSS的配置

- **接口ID**: cms-update-log-export-oss-config
- **方法**: PUT
- **路径**: `/cms/v1/log-export/oss-configs/{configId}`
- **描述**: 更新将日志导出到OSS的配置

### 创建日志导出任务

- **接口ID**: cms-create-log-export-task
- **方法**: POST
- **路径**: `/cms/v1/log-export/tasks`
- **描述**: 创建日志导出任务

### 获取日志导出任务详情

- **接口ID**: cms-get-log-export-task
- **方法**: GET
- **路径**: `/cms/v1/log-export/tasks/{taskId}`
- **描述**: 获取日志导出任务详情

### 列出所有的日志导出任务

- **接口ID**: cms-list-log-export-tasks
- **方法**: GET
- **路径**: `/cms/v1/log-export/tasks`
- **描述**: 列出所有的日志导出任务

### 检查日志导出任务的状态

- **接口ID**: cms-check-log-export-task-status
- **方法**: GET
- **路径**: `/cms/v1/log-export/tasks/{taskId}/status`
- **描述**: 检查日志导出任务的状态

### 创建租户日志导出

- **接口ID**: cms-create-tenant-log-export
- **方法**: POST
- **路径**: `/cms/v1/log-export/tenant-tasks`
- **描述**: 创建租户日志导出

### 获取租户日志导出任务详情

- **接口ID**: cms-get-tenant-log-export-task
- **方法**: GET
- **路径**: `/cms/v1/log-export/tenant-tasks/{taskId}`
- **描述**: 获取租户日志导出任务详情

### 列出租户日志导出任务

- **接口ID**: cms-list-tenant-log-export-tasks
- **方法**: GET
- **路径**: `/cms/v1/log-export/tenant-tasks`
- **描述**: 列出租户日志导出任务

### 查询日志流中特定产品的日志

- **接口ID**: cms-query-product-logs
- **方法**: GET
- **路径**: `/cms/v1/logs/products/{productId}`
- **描述**: 查询日志流中特定产品的日志

### 查询特定日志条目周围的日志

- **接口ID**: cms-query-context-logs
- **方法**: GET
- **路径**: `/cms/v1/logs/{logId}/context`
- **描述**: 查询特定日志条目周围的日志

### 查询日志实时流过滤器

- **接口ID**: cms-query-log-stream-filters
- **方法**: GET
- **路径**: `/cms/v1/log-streams/filters`
- **描述**: 查询日志实时流过滤器

### 列出日志流的可用产品

- **接口ID**: cms-list-log-stream-products
- **方法**: GET
- **路径**: `/cms/v1/log-streams/products`
- **描述**: 列出日志流的可用产品

### 签名查询令牌

- **接口ID**: cms-sign-query-token
- **方法**: POST
- **路径**: `/cms/v1/logs/sign-token`
- **描述**: 签名查询令牌

### 生成用于签名日志实时流请求的令牌

- **接口ID**: cms-sign-log-stream-token
- **方法**: POST
- **路径**: `/cms/v1/log-streams/sign-token`
- **描述**: 生成用于签名日志实时流请求的令牌

### 查询指标

- **接口ID**: cms-query-metrics
- **方法**: GET
- **路径**: `/cms/v1/metrics`
- **描述**: 查询指标

### 枚举监控空间资源

- **接口ID**: cms-list-monitor-space-resources
- **方法**: GET
- **路径**: `/cms/v1/monitor-spaces/{spaceId}/resources`
- **描述**: 枚举监控空间资源

### 查询监控空间的使用情况信息

- **接口ID**: cms-get-monitor-space-usage
- **方法**: GET
- **路径**: `/cms/v1/monitor-spaces/{spaceId}/usage`
- **描述**: 查询监控空间的使用情况信息

### 获取自定义过滤器列表

- **接口ID**: cms-list-custom-filters
- **方法**: GET
- **路径**: `/cms/v1/custom-filters`
- **描述**: 获取自定义过滤器列表

### 查询自定义过滤器值

- **接口ID**: cms-query-custom-filter-values
- **方法**: GET
- **路径**: `/cms/v1/custom-filters/{filterId}/values`
- **描述**: 查询自定义过滤器值

### 列出可用于查询操作日志的操作过滤器

- **接口ID**: cms-list-operation-filters
- **方法**: GET
- **路径**: `/cms/v1/operation-logs/filters`
- **描述**: 列出可用于查询操作日志的操作过滤器

### 列出可用于查询操作日志的操作产品

- **接口ID**: cms-list-operation-products
- **方法**: GET
- **路径**: `/cms/v1/operation-logs/products`
- **描述**: 列出可用于查询操作日志的操作产品

### 查询用于过滤操作日志的操作过滤器值

- **接口ID**: cms-query-operation-filter-values
- **方法**: GET
- **路径**: `/cms/v1/operation-logs/filters/{filterId}/values`
- **描述**: 查询用于过滤操作日志的操作过滤器值

### 根据指定的条件检索操作日志

- **接口ID**: cms-query-operation-logs
- **方法**: GET
- **路径**: `/cms/v1/operation-logs`
- **描述**: 根据指定的条件检索操作日志

### 查询仪表板的过滤器

- **接口ID**: cms-query-dashboard-filters
- **方法**: GET
- **路径**: `/cms/v1/dashboards/filters`
- **描述**: 查询仪表板的过滤器

---

## 云服务器 ECS

弹性可伸缩的云服务器实例管理

产品标识：ecs | 分类：compute | API 数量：10

### 获取云服务器实例列表

- **接口ID**: ecs-list-instances
- **方法**: GET
- **路径**: `/ecs/v1/instances`
- **描述**: 获取云服务器实例列表

### 查看云服务器实例详情

- **接口ID**: ecs-get-instance
- **方法**: GET
- **路径**: `/ecs/v1/instances/{instanceId}`
- **描述**: 查看云服务器实例详情

### 启动云服务器实例

- **接口ID**: ecs-start-instance
- **方法**: POST
- **路径**: `/ecs/v1/instances/{instanceId}/start`
- **描述**: 启动云服务器实例

### 停止云服务器实例

- **接口ID**: ecs-stop-instance
- **方法**: POST
- **路径**: `/ecs/v1/instances/{instanceId}/stop`
- **描述**: 停止云服务器实例

### 重启云服务器实例

- **接口ID**: ecs-restart-instance
- **方法**: POST
- **路径**: `/ecs/v1/instances/{instanceId}/restart`
- **描述**: 重启云服务器实例

### 删除云服务器实例

- **接口ID**: ecs-delete-instance
- **方法**: DELETE
- **路径**: `/ecs/v1/instances/{instanceId}`
- **描述**: 删除云服务器实例

### 更新云服务器实例

- **接口ID**: ecs-update-instance
- **方法**: PUT
- **路径**: `/ecs/v1/instances/{instanceId}`
- **描述**: 更新云服务器实例

### 重置云服务器实例密码

- **接口ID**: ecs-reset-password
- **方法**: POST
- **路径**: `/ecs/v1/instances/{instanceId}/reset-password`
- **描述**: 重置云服务器实例密码

### 绑定云服务器实例卷

- **接口ID**: ecs-bind-volume
- **方法**: POST
- **路径**: `/ecs/v1/instances/{instanceId}/volumes`
- **描述**: 绑定云服务器实例卷

### 卸载云服务器实例磁盘

- **接口ID**: ecs-unbind-disk
- **方法**: POST
- **路径**: `/ecs/v1/instances/{instanceId}/disks/unbind`
- **描述**: 卸载云服务器实例磁盘

---

## 弹性公网IP EIP

弹性公网 IP 管理与访问控制

产品标识：eip | 分类：networking | API 数量：3

### 查看 EIP 实例详情

- **接口ID**: eip-get-instance
- **方法**: GET
- **路径**: `/eip/v1/instances/{instanceId}`
- **描述**: 查看 EIP 实例详情

### 获取某个EIP对应的 DNATRules 列表

- **接口ID**: eip-list-dnat-rules
- **方法**: GET
- **路径**: `/eip/v1/instances/{instanceId}/dnat-rules`
- **描述**: 获取某个EIP对应的 DNATRules 列表

### 获取EIP访问控制白名单列表

- **接口ID**: eip-list-whitelist
- **方法**: GET
- **路径**: `/eip/v1/instances/{instanceId}/whitelist`
- **描述**: 获取EIP访问控制白名单列表

---

## 用户访问控制 IAM

用户、用户组与 Access Key 管理

产品标识：iam | 分类：networking | API 数量：16

### 创建用户

- **接口ID**: iam-create-user
- **方法**: POST
- **路径**: `/iam/v1/users`
- **描述**: 创建用户

### 获取用户信息

- **接口ID**: iam-get-user
- **方法**: GET
- **路径**: `/iam/v1/users/{userId}`
- **描述**: 获取用户信息

### 获取用户列表

- **接口ID**: iam-list-users
- **方法**: GET
- **路径**: `/iam/v1/users`
- **描述**: 获取用户列表

### 更新用户信息

- **接口ID**: iam-update-user
- **方法**: PUT
- **路径**: `/iam/v1/users/{userId}`
- **描述**: 更新用户信息

### 创建用户组

- **接口ID**: iam-create-group
- **方法**: POST
- **路径**: `/iam/v1/groups`
- **描述**: 创建用户组

### 删除用户组

- **接口ID**: iam-delete-group
- **方法**: DELETE
- **路径**: `/iam/v1/groups/{groupId}`
- **描述**: 删除用户组

### 获取用户组信息

- **接口ID**: iam-get-group
- **方法**: GET
- **路径**: `/iam/v1/groups/{groupId}`
- **描述**: 获取用户组信息

### 获取用户组列表

- **接口ID**: iam-list-groups
- **方法**: GET
- **路径**: `/iam/v1/groups`
- **描述**: 获取用户组列表

### 更新用户组信息

- **接口ID**: iam-update-group
- **方法**: PUT
- **路径**: `/iam/v1/groups/{groupId}`
- **描述**: 更新用户组信息

### 将用户添加到指定的用户组

- **接口ID**: iam-add-user-to-group
- **方法**: POST
- **路径**: `/iam/v1/groups/{groupId}/users`
- **描述**: 将用户添加到指定的用户组

### 获取用户组里的用户列表

- **接口ID**: iam-list-group-users
- **方法**: GET
- **路径**: `/iam/v1/groups/{groupId}/users`
- **描述**: 获取用户组里的用户列表

### 将用户从用户组中移除

- **接口ID**: iam-remove-user-from-group
- **方法**: DELETE
- **路径**: `/iam/v1/groups/{groupId}/users/{userId}`
- **描述**: 将用户从用户组中移除

### 创建AK

- **接口ID**: iam-create-ak
- **方法**: POST
- **路径**: `/iam/v1/access-keys`
- **描述**: 创建AK

### 删除AK

- **接口ID**: iam-delete-ak
- **方法**: DELETE
- **路径**: `/iam/v1/access-keys/{akId}`
- **描述**: 删除AK

### 修改AK状态

- **接口ID**: iam-update-ak-status
- **方法**: PUT
- **路径**: `/iam/v1/access-keys/{akId}/status`
- **描述**: 修改AK状态

### 获取用户AK列表

- **接口ID**: iam-list-aks
- **方法**: GET
- **路径**: `/iam/v1/access-keys`
- **描述**: 获取用户AK列表

---

## ModelStudio - 云开发机

云开发机实例的创建与生命周期管理

产品标识：modelstudio-dev | 分类：ai-ml | API 数量：7

### 创建开发机实例

- **接口ID**: modelstudio-dev-create-instance
- **方法**: POST
- **路径**: `/modelstudio-dev/v1/instances`
- **描述**: 创建开发机实例

### 退订开发机实例

- **接口ID**: modelstudio-dev-delete-instance
- **方法**: DELETE
- **路径**: `/modelstudio-dev/v1/instances/{instanceId}`
- **描述**: 退订开发机实例

### 查看开发机实例详情

- **接口ID**: modelstudio-dev-get-instance
- **方法**: GET
- **路径**: `/modelstudio-dev/v1/instances/{instanceId}`
- **描述**: 查看开发机实例详情

### 获取开发机实例列表

- **接口ID**: modelstudio-dev-list-instances
- **方法**: GET
- **路径**: `/modelstudio-dev/v1/instances`
- **描述**: 获取开发机实例列表

### 恢复开发机实例

- **接口ID**: modelstudio-dev-resume-instance
- **方法**: POST
- **路径**: `/modelstudio-dev/v1/instances/{instanceId}/resume`
- **描述**: 恢复开发机实例

### 暂停开发机实例

- **接口ID**: modelstudio-dev-pause-instance
- **方法**: POST
- **路径**: `/modelstudio-dev/v1/instances/{instanceId}/pause`
- **描述**: 暂停开发机实例

### 更新开发机实例

- **接口ID**: modelstudio-dev-update-instance
- **方法**: PUT
- **路径**: `/modelstudio-dev/v1/instances/{instanceId}`
- **描述**: 更新开发机实例

---

## ModelStudio - 推理服务

模型推理服务的部署、伸缩与令牌管理

产品标识：modelstudio-inference | 分类：ai-ml | API 数量：24

### 获取服务详情

- **接口ID**: modelstudio-inference-get-service
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/services/{serviceId}`
- **描述**: 获取服务详情

### 获取服务列表

- **接口ID**: modelstudio-inference-list-services
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/services`
- **描述**: 获取服务列表

### 上线服务

- **接口ID**: modelstudio-inference-online-service
- **方法**: POST
- **路径**: `/modelstudio-inference/v1/services/{serviceId}/online`
- **描述**: 上线服务

### 下线服务

- **接口ID**: modelstudio-inference-offline-service
- **方法**: POST
- **路径**: `/modelstudio-inference/v1/services/{serviceId}/offline`
- **描述**: 下线服务

### 模型预下载

- **接口ID**: modelstudio-inference-predownload-model
- **方法**: POST
- **路径**: `/modelstudio-inference/v1/services/{serviceId}/predownload`
- **描述**: 模型预下载

### 健康检查

- **接口ID**: modelstudio-inference-health-check
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/services/{serviceId}/health`
- **描述**: 健康检查

### 获取实例详情

- **接口ID**: modelstudio-inference-get-instance
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/instances/{instanceId}`
- **描述**: 获取实例详情

### 获取实例列表

- **接口ID**: modelstudio-inference-list-instances
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/instances`
- **描述**: 获取实例列表

### 批量更新实例

- **接口ID**: modelstudio-inference-batch-update-instances
- **方法**: PUT
- **路径**: `/modelstudio-inference/v1/instances/batch`
- **描述**: 批量更新实例

### 创建弹性伸缩规则

- **接口ID**: modelstudio-inference-create-scaling-rule
- **方法**: POST
- **路径**: `/modelstudio-inference/v1/scaling-rules`
- **描述**: 创建弹性伸缩规则

### 更新弹性伸缩规则

- **接口ID**: modelstudio-inference-update-scaling-rule
- **方法**: PUT
- **路径**: `/modelstudio-inference/v1/scaling-rules/{ruleId}`
- **描述**: 更新弹性伸缩规则

### 删除弹性伸缩规则

- **接口ID**: modelstudio-inference-delete-scaling-rule
- **方法**: DELETE
- **路径**: `/modelstudio-inference/v1/scaling-rules/{ruleId}`
- **描述**: 删除弹性伸缩规则

### 复制伸缩策略

- **接口ID**: modelstudio-inference-copy-scaling-policy
- **方法**: POST
- **路径**: `/modelstudio-inference/v1/scaling-policies/copy`
- **描述**: 复制伸缩策略

### 创建弹性伸缩策略计划

- **接口ID**: modelstudio-inference-create-scaling-plan
- **方法**: POST
- **路径**: `/modelstudio-inference/v1/scaling-plans`
- **描述**: 创建弹性伸缩策略计划

### 获取缩放计划详情

- **接口ID**: modelstudio-inference-get-scaling-plan
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/scaling-plans/{planId}`
- **描述**: 获取缩放计划详情

### 获取缩放计划列表

- **接口ID**: modelstudio-inference-list-scaling-plans
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/scaling-plans`
- **描述**: 获取缩放计划列表

### 更新缩放计划

- **接口ID**: modelstudio-inference-update-scaling-plan
- **方法**: PUT
- **路径**: `/modelstudio-inference/v1/scaling-plans/{planId}`
- **描述**: 更新缩放计划

### 删除缩放计划

- **接口ID**: modelstudio-inference-delete-scaling-plan
- **方法**: DELETE
- **路径**: `/modelstudio-inference/v1/scaling-plans/{planId}`
- **描述**: 删除缩放计划

### 创建令牌

- **接口ID**: modelstudio-inference-create-token
- **方法**: POST
- **路径**: `/modelstudio-inference/v1/tokens`
- **描述**: 创建令牌

### 获取令牌

- **接口ID**: modelstudio-inference-get-token
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/tokens/{tokenId}`
- **描述**: 获取令牌

### 获取令牌列表

- **接口ID**: modelstudio-inference-list-tokens
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/tokens`
- **描述**: 获取令牌列表

### 更新令牌

- **接口ID**: modelstudio-inference-update-token
- **方法**: PUT
- **路径**: `/modelstudio-inference/v1/tokens/{tokenId}`
- **描述**: 更新令牌

### 删除令牌

- **接口ID**: modelstudio-inference-delete-token
- **方法**: DELETE
- **路径**: `/modelstudio-inference/v1/tokens/{tokenId}`
- **描述**: 删除令牌

### 校验实例名

- **接口ID**: modelstudio-inference-validate-instance-name
- **方法**: GET
- **路径**: `/modelstudio-inference/v1/instances/validate-name`
- **描述**: 校验实例名

---

## ModelStudio - 知识库

知识库应用、知识管理与 RAG 搜索

产品标识：modelstudio-knowledge | 分类：ai-ml | API 数量：29

### 创建知识库

- **接口ID**: modelstudio-knowledge-create-kb
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/knowledge-bases`
- **描述**: 创建知识库

### 删除知识库

- **接口ID**: modelstudio-knowledge-delete-kb
- **方法**: DELETE
- **路径**: `/modelstudio-knowledge/v1/knowledge-bases/{kbId}`
- **描述**: 删除知识库

### 检索知识库列表

- **接口ID**: modelstudio-knowledge-list-kb
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/knowledge-bases`
- **描述**: 检索知识库列表

### 创建知识

- **接口ID**: modelstudio-knowledge-create-knowledge
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/knowledge-bases/{kbId}/knowledge`
- **描述**: 创建知识

### 删除知识

- **接口ID**: modelstudio-knowledge-delete-knowledge
- **方法**: DELETE
- **路径**: `/modelstudio-knowledge/v1/knowledge/{knowledgeId}`
- **描述**: 删除知识

### 获取知识详情

- **接口ID**: modelstudio-knowledge-get-knowledge
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/knowledge/{knowledgeId}`
- **描述**: 获取知识详情

### 检索知识列表

- **接口ID**: modelstudio-knowledge-list-knowledge
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/knowledge-bases/{kbId}/knowledge`
- **描述**: 检索知识列表

### 检索分段列表

- **接口ID**: modelstudio-knowledge-list-segments
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/knowledge/{knowledgeId}/segments`
- **描述**: 检索分段列表

### 知识库RAG搜索

- **接口ID**: modelstudio-knowledge-rag-search
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/knowledge-bases/{kbId}/rag-search`
- **描述**: 知识库RAG搜索

### 创建知识导入任务

- **接口ID**: modelstudio-knowledge-create-import-task
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/import-tasks`
- **描述**: 创建知识导入任务

### 启动知识导入任务

- **接口ID**: modelstudio-knowledge-start-import-task
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/import-tasks/{taskId}/start`
- **描述**: 启动知识导入任务

### 取消知识导入任务

- **接口ID**: modelstudio-knowledge-cancel-import-task
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/import-tasks/{taskId}/cancel`
- **描述**: 取消知识导入任务

### 获取知识导入任务详情

- **接口ID**: modelstudio-knowledge-get-import-task
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/import-tasks/{taskId}`
- **描述**: 获取知识导入任务详情

### 检索知识导入任务列表

- **接口ID**: modelstudio-knowledge-list-import-tasks
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/import-tasks`
- **描述**: 检索知识导入任务列表

### 批量预签名上传文件URL

- **接口ID**: modelstudio-knowledge-batch-presign-upload
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/uploads/presign-batch`
- **描述**: 批量预签名上传文件URL

### 完成大文件分片上传

- **接口ID**: modelstudio-knowledge-complete-multipart-upload
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/uploads/{uploadId}/complete`
- **描述**: 完成大文件分片上传

### 预签名大文件分片上传的URL

- **接口ID**: modelstudio-knowledge-presign-multipart-upload
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/uploads/presign-multipart`
- **描述**: 预签名大文件分片上传的URL

### 创建知识库应用程序

- **接口ID**: modelstudio-knowledge-create-app
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/apps`
- **描述**: 创建知识库应用程序

### 获取知识库应用程序详情

- **接口ID**: modelstudio-knowledge-get-app
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/apps/{appId}`
- **描述**: 获取知识库应用程序详情

### 检索知识库应用程序列表

- **接口ID**: modelstudio-knowledge-list-apps
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/apps`
- **描述**: 检索知识库应用程序列表

### 更新应用程序

- **接口ID**: modelstudio-knowledge-update-app
- **方法**: PUT
- **路径**: `/modelstudio-knowledge/v1/apps/{appId}`
- **描述**: 更新应用程序

### 批量创建知识库应用发布

- **接口ID**: modelstudio-knowledge-batch-create-releases
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/apps/{appId}/releases/batch`
- **描述**: 批量创建知识库应用发布

### 获取应用发布详情

- **接口ID**: modelstudio-knowledge-get-release
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/apps/{appId}/releases/{releaseId}`
- **描述**: 获取应用发布详情

### 展示应用发布记录

- **接口ID**: modelstudio-knowledge-list-releases
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/apps/{appId}/releases`
- **描述**: 展示应用发布记录

### 知识库对话体验

- **接口ID**: modelstudio-knowledge-chat-experience
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/chat/experience`
- **描述**: 知识库对话体验

### 应用发布后的会话接口

- **接口ID**: modelstudio-knowledge-chat-release
- **方法**: POST
- **路径**: `/modelstudio-knowledge/v1/chat/release`
- **描述**: 应用发布后的会话接口

### 获取对话详情

- **接口ID**: modelstudio-knowledge-get-conversation
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/conversations/{conversationId}`
- **描述**: 获取对话详情

### 获取所有模型

- **接口ID**: modelstudio-knowledge-list-models
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/models`
- **描述**: 获取所有模型

### 检索所有搜索历史

- **接口ID**: modelstudio-knowledge-list-search-history
- **方法**: GET
- **路径**: `/modelstudio-knowledge/v1/search-history`
- **描述**: 检索所有搜索历史

---

## 资源管理 RM

管理组、资源组与订阅的创建与管理

产品标识：rm | 分类：networking | API 数量：18

### 创建管理组

- **接口ID**: rm-create-management-group
- **方法**: POST
- **路径**: `/rm/v1/management-groups`
- **描述**: 创建管理组

### 获取管理组信息

- **接口ID**: rm-get-management-group
- **方法**: GET
- **路径**: `/rm/v1/management-groups/{groupId}`
- **描述**: 获取管理组信息

### 获取管理组列表

- **接口ID**: rm-list-management-groups
- **方法**: GET
- **路径**: `/rm/v1/management-groups`
- **描述**: 获取管理组列表

### 更新管理组信息

- **接口ID**: rm-update-management-group
- **方法**: PUT
- **路径**: `/rm/v1/management-groups/{groupId}`
- **描述**: 更新管理组信息

### 创建资源组

- **接口ID**: rm-create-resource-group
- **方法**: POST
- **路径**: `/rm/v1/resource-groups`
- **描述**: 创建资源组

### 获取资源组信息

- **接口ID**: rm-get-resource-group
- **方法**: GET
- **路径**: `/rm/v1/resource-groups/{groupId}`
- **描述**: 获取资源组信息

### 获取任意权限的资源组列表

- **接口ID**: rm-list-resource-groups
- **方法**: GET
- **路径**: `/rm/v1/resource-groups`
- **描述**: 获取任意权限的资源组列表

### 根据资源组获取计费账户信息

- **接口ID**: rm-get-resource-group-billing-account
- **方法**: GET
- **路径**: `/rm/v1/resource-groups/{groupId}/billing-account`
- **描述**: 根据资源组获取计费账户信息

### 创建订阅

- **接口ID**: rm-create-subscription
- **方法**: POST
- **路径**: `/rm/v1/subscriptions`
- **描述**: 创建订阅

### 获取订阅信息

- **接口ID**: rm-get-subscription
- **方法**: GET
- **路径**: `/rm/v1/subscriptions/{subscriptionId}`
- **描述**: 获取订阅信息

### 获取订阅列表

- **接口ID**: rm-list-subscriptions
- **方法**: GET
- **路径**: `/rm/v1/subscriptions`
- **描述**: 获取订阅列表

### 更新订阅绑定的计费账户信息

- **接口ID**: rm-update-subscription-billing-account
- **方法**: PUT
- **路径**: `/rm/v1/subscriptions/{subscriptionId}/billing-account`
- **描述**: 更新订阅绑定的计费账户信息

### 更新订阅名称

- **接口ID**: rm-update-subscription-name
- **方法**: PUT
- **路径**: `/rm/v1/subscriptions/{subscriptionId}/name`
- **描述**: 更新订阅名称

### 根据订阅标识获取计费账户信息

- **接口ID**: rm-get-subscription-billing-account
- **方法**: GET
- **路径**: `/rm/v1/subscriptions/{subscriptionId}/billing-account`
- **描述**: 根据订阅标识获取计费账户信息

### 获取某个订阅的操作记录

- **接口ID**: rm-list-subscription-operations
- **方法**: GET
- **路径**: `/rm/v1/subscriptions/{subscriptionId}/operations`
- **描述**: 获取某个订阅的操作记录

### 获取资源详情

- **接口ID**: rm-get-resource
- **方法**: GET
- **路径**: `/rm/v1/resources/{resourceId}`
- **描述**: 获取资源详情

### 获取资源统计列表

- **接口ID**: rm-list-resource-stats
- **方法**: GET
- **路径**: `/rm/v1/resources/stats`
- **描述**: 获取资源统计列表

### 获取任意权限资源列表

- **接口ID**: rm-list-resources
- **方法**: GET
- **路径**: `/rm/v1/resources`
- **描述**: 获取任意权限资源列表

---

## 私有网络 VPC

私有网络实例管理

产品标识：vpc | 分类：networking | API 数量：1

### 查看 VPC 实例详情

- **接口ID**: vpc-get-instance
- **方法**: GET
- **路径**: `/vpc/v1/instances/{instanceId}`
- **描述**: 查看 VPC 实例详情

---

