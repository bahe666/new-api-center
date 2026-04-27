import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const aoss: ApiProduct = {
  id: 'aoss',
  name: '对象存储 AOSS',
  abbreviation: 'AOSS',
  description: '对象存储资源包管理',
  category: 'storage',
  groups: [
    {
      name: '资源包管理',
      endpoints: [
        {
          id: 'aoss-create-package',
          displayName: '创建对象存储资源包',
          description: '创建对象存储资源包',
          method: 'POST',
          path: '/aoss/v1/packages',
          detailUrl: `${BASE_URL}/aoss/create-package`,
        },
        {
          id: 'aoss-delete-package',
          displayName: '删除对象存储资源包',
          description: '删除对象存储资源包',
          method: 'DELETE',
          path: '/aoss/v1/packages/{packageId}',
          detailUrl: `${BASE_URL}/aoss/delete-package`,
        },
        {
          id: 'aoss-get-package',
          displayName: '获取对象存储资源包',
          description: '获取对象存储资源包',
          method: 'GET',
          path: '/aoss/v1/packages/{packageId}',
          detailUrl: `${BASE_URL}/aoss/get-package`,
        },
        {
          id: 'aoss-update-package',
          displayName: '变更对象存储资源包',
          description: '变更对象存储资源包',
          method: 'PUT',
          path: '/aoss/v1/packages/{packageId}',
          detailUrl: `${BASE_URL}/aoss/update-package`,
        },
      ],
    },
  ],
};
