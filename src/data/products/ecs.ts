import type { ApiProduct } from '@/types/api';

const ECS_DOCS_BASE = '/api-docs/ecs';

export const ecs: ApiProduct = {
  id: 'ecs',
  name: '云服务器 ECS',
  abbreviation: 'ECS',
  description: '弹性可伸缩的云服务器实例管理',
  category: 'compute',
  groups: [
    {
      name: '实例管理',
      endpoints: [
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
        {
          id: 'ecs-stop-instance',
          displayName: '停止云服务器实例',
          description: '停止云服务器实例',
          method: 'POST',
          path: '/ecs/v1/instances/{instanceId}/stop',
          detailUrl: `${ECS_DOCS_BASE}/ecs-stop-instance.html`,
        },
        {
          id: 'ecs-restart-instance',
          displayName: '重启云服务器实例',
          description: '重启云服务器实例',
          method: 'POST',
          path: '/ecs/v1/instances/{instanceId}/restart',
          detailUrl: `${ECS_DOCS_BASE}/ecs-restart-instance.html`,
        },
        {
          id: 'ecs-delete-instance',
          displayName: '删除云服务器实例',
          description: '删除云服务器实例',
          method: 'DELETE',
          path: '/ecs/v1/instances/{instanceId}',
          detailUrl: `${ECS_DOCS_BASE}/ecs-delete-instance.html`,
        },
        {
          id: 'ecs-update-instance',
          displayName: '更新云服务器实例',
          description: '更新云服务器实例',
          method: 'PUT',
          path: '/ecs/v1/instances/{instanceId}',
          detailUrl: `${ECS_DOCS_BASE}/ecs-update-instance.html`,
        },
        {
          id: 'ecs-reset-password',
          displayName: '重置云服务器实例密码',
          description: '重置云服务器实例密码',
          method: 'POST',
          path: '/ecs/v1/instances/{instanceId}/reset-password',
          detailUrl: `${ECS_DOCS_BASE}/ecs-reset-password.html`,
        },
      ],
    },
    {
      name: '磁盘',
      endpoints: [
        {
          id: 'ecs-bind-volume',
          displayName: '绑定云服务器实例卷',
          description: '绑定云服务器实例卷',
          method: 'POST',
          path: '/ecs/v1/instances/{instanceId}/volumes',
          detailUrl: `${ECS_DOCS_BASE}/ecs-bind-volume.html`,
        },
        {
          id: 'ecs-unbind-disk',
          displayName: '卸载云服务器实例磁盘',
          description: '卸载云服务器实例磁盘',
          method: 'POST',
          path: '/ecs/v1/instances/{instanceId}/disks/unbind',
          detailUrl: `${ECS_DOCS_BASE}/ecs-unbind-disk.html`,
        },
      ],
    },
  ],
};
