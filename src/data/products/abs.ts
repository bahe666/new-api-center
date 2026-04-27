import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const abs: ApiProduct = {
  id: 'abs',
  name: '块存储 ABS',
  abbreviation: 'ABS',
  description: '块存储资源的创建、扩缩容与生命周期管理',
  category: 'storage',
  groups: [
    {
      name: '存储管理',
      endpoints: [
        {
          id: 'abs-create-volume',
          displayName: '创建块存储资源',
          description: '创建块存储资源',
          method: 'POST',
          path: '/abs/v1/volumes',
          detailUrl: `${BASE_URL}/abs/create-volume`,
        },
        {
          id: 'abs-delete-volume',
          displayName: '删除块存储资源',
          description: '删除块存储资源',
          method: 'DELETE',
          path: '/abs/v1/volumes/{volumeId}',
          detailUrl: `${BASE_URL}/abs/delete-volume`,
        },
        {
          id: 'abs-get-volume',
          displayName: '查看块存储资源详情',
          description: '查看块存储资源详情',
          method: 'GET',
          path: '/abs/v1/volumes/{volumeId}',
          detailUrl: `${BASE_URL}/abs/get-volume`,
        },
        {
          id: 'abs-list-volumes',
          displayName: '获取块存储资源列表',
          description: '获取块存储资源列表',
          method: 'GET',
          path: '/abs/v1/volumes',
          detailUrl: `${BASE_URL}/abs/list-volumes`,
        },
        {
          id: 'abs-resize-volume',
          displayName: '块存储资源实例扩缩容',
          description: '块存储资源实例扩缩容',
          method: 'PUT',
          path: '/abs/v1/volumes/{volumeId}/resize',
          detailUrl: `${BASE_URL}/abs/resize-volume`,
        },
        {
          id: 'abs-update-volume',
          displayName: '更新块资源实例',
          description: '更新块资源实例',
          method: 'PUT',
          path: '/abs/v1/volumes/{volumeId}',
          detailUrl: `${BASE_URL}/abs/update-volume`,
        },
      ],
    },
  ],
};
