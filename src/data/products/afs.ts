import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const afs: ApiProduct = {
  id: 'afs',
  name: '文件存储 AFS',
  abbreviation: 'AFS',
  description: '文件存储卷挂载点管理',
  category: 'storage',
  groups: [
    {
      name: '挂载点',
      endpoints: [
        {
          id: 'afs-get-mount-clients',
          displayName: '获取卷挂载点客户端信息',
          description: '获取卷挂载点客户端信息',
          method: 'GET',
          path: '/afs/v1/mount-points/{mountPointId}/clients',
          detailUrl: `${BASE_URL}/afs/get-mount-clients`,
        },
      ],
    },
  ],
};
