import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const modelstudioDev: ApiProduct = {
  id: 'modelstudio-dev',
  name: 'ModelStudio - 云开发机',
  abbreviation: 'Dev',
  description: '云开发机实例的创建与生命周期管理',
  category: 'ai-ml',
  groups: [
    {
      name: '开发机管理',
      endpoints: [
        {
          id: 'modelstudio-dev-create-instance',
          displayName: '创建开发机实例',
          description: '创建开发机实例',
          method: 'POST',
          path: '/modelstudio-dev/v1/instances',
          detailUrl: `${BASE_URL}/modelstudio-dev/create-instance`,
        },
        {
          id: 'modelstudio-dev-delete-instance',
          displayName: '退订开发机实例',
          description: '退订开发机实例',
          method: 'DELETE',
          path: '/modelstudio-dev/v1/instances/{instanceId}',
          detailUrl: `${BASE_URL}/modelstudio-dev/delete-instance`,
        },
        {
          id: 'modelstudio-dev-get-instance',
          displayName: '查看开发机实例详情',
          description: '查看开发机实例详情',
          method: 'GET',
          path: '/modelstudio-dev/v1/instances/{instanceId}',
          detailUrl: `${BASE_URL}/modelstudio-dev/get-instance`,
        },
        {
          id: 'modelstudio-dev-list-instances',
          displayName: '获取开发机实例列表',
          description: '获取开发机实例列表',
          method: 'GET',
          path: '/modelstudio-dev/v1/instances',
          detailUrl: `${BASE_URL}/modelstudio-dev/list-instances`,
        },
        {
          id: 'modelstudio-dev-resume-instance',
          displayName: '恢复开发机实例',
          description: '恢复开发机实例',
          method: 'POST',
          path: '/modelstudio-dev/v1/instances/{instanceId}/resume',
          detailUrl: `${BASE_URL}/modelstudio-dev/resume-instance`,
        },
        {
          id: 'modelstudio-dev-pause-instance',
          displayName: '暂停开发机实例',
          description: '暂停开发机实例',
          method: 'POST',
          path: '/modelstudio-dev/v1/instances/{instanceId}/pause',
          detailUrl: `${BASE_URL}/modelstudio-dev/pause-instance`,
        },
        {
          id: 'modelstudio-dev-update-instance',
          displayName: '更新开发机实例',
          description: '更新开发机实例',
          method: 'PUT',
          path: '/modelstudio-dev/v1/instances/{instanceId}',
          detailUrl: `${BASE_URL}/modelstudio-dev/update-instance`,
        },
      ],
    },
  ],
};
