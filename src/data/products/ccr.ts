import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const ccr: ApiProduct = {
  id: 'ccr',
  name: '容器镜像服务 CCR',
  abbreviation: 'CCR',
  description: '容器镜像的查询与管理',
  category: 'containers',
  groups: [
    {
      name: '镜像管理',
      endpoints: [
        {
          id: 'ccr-delete-image',
          displayName: '删除指定镜像站资源下的指定镜像',
          description: '删除指定镜像站资源下的指定镜像',
          method: 'DELETE',
          path: '/ccr/v1/registries/{registryId}/images/{imageId}',
          detailUrl: `${BASE_URL}/ccr/delete-image`,
        },
        {
          id: 'ccr-list-images',
          displayName: '查询指定镜像站资源下的镜像列表',
          description: '查询指定镜像站资源下的镜像列表',
          method: 'GET',
          path: '/ccr/v1/registries/{registryId}/images',
          detailUrl: `${BASE_URL}/ccr/list-images`,
        },
      ],
    },
  ],
};
