import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const ads: ApiProduct = {
  id: 'ads',
  name: '存储数据同步工具 ADS',
  abbreviation: 'ADS',
  description: '数据同步任务与资源管理',
  category: 'storage',
  groups: [
    {
      name: '同步任务',
      endpoints: [
        {
          id: 'ads-create-sync-task',
          displayName: '创建同步任务',
          description: '创建同步任务',
          method: 'POST',
          path: '/ads/v1/sync-tasks',
          detailUrl: `${BASE_URL}/ads/create-sync-task`,
        },
        {
          id: 'ads-delete-sync-task',
          displayName: '删除同步任务',
          description: '删除同步任务',
          method: 'DELETE',
          path: '/ads/v1/sync-tasks/{taskId}',
          detailUrl: `${BASE_URL}/ads/delete-sync-task`,
        },
        {
          id: 'ads-get-sync-task',
          displayName: '获取同步任务详情',
          description: '获取同步任务详情',
          method: 'GET',
          path: '/ads/v1/sync-tasks/{taskId}',
          detailUrl: `${BASE_URL}/ads/get-sync-task`,
        },
        {
          id: 'ads-list-sync-tasks',
          displayName: '枚举同步任务列表',
          description: '枚举同步任务列表',
          method: 'GET',
          path: '/ads/v1/sync-tasks',
          detailUrl: `${BASE_URL}/ads/list-sync-tasks`,
        },
        {
          id: 'ads-update-sync-task',
          displayName: '更新同步任务',
          description: '更新同步任务',
          method: 'PUT',
          path: '/ads/v1/sync-tasks/{taskId}',
          detailUrl: `${BASE_URL}/ads/update-sync-task`,
        },
        {
          id: 'ads-create-resource',
          displayName: '创建数据同步工具资源',
          description: '创建数据同步工具资源',
          method: 'POST',
          path: '/ads/v1/resources',
          detailUrl: `${BASE_URL}/ads/create-resource`,
        },
      ],
    },
  ],
};
