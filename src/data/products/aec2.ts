import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const aec2: ApiProduct = {
  id: 'aec2',
  name: '弹性计算集群 AEC2',
  abbreviation: 'AEC2',
  description: 'AI 弹性计算集群资源规格与工作空间管理',
  category: 'compute',
  groups: [
    {
      name: '集群管理',
      endpoints: [
        {
          id: 'aec2-list-resource-specs',
          displayName: '获取AI弹性计算集群可用资源规格列表',
          description: '获取AI弹性计算集群可用资源规格列表',
          method: 'GET',
          path: '/aec2/v1/resource-specs',
          detailUrl: `${BASE_URL}/aec2/list-resource-specs`,
        },
        {
          id: 'aec2-get-workspace',
          displayName: '查看工作空间详情',
          description: '查看工作空间详情',
          method: 'GET',
          path: '/aec2/v1/workspaces/{workspaceId}',
          detailUrl: `${BASE_URL}/aec2/get-workspace`,
        },
        {
          id: 'aec2-list-workspace-clusters',
          displayName: '查看工作空间关联的集群列表',
          description: '查看工作空间关联的集群列表',
          method: 'GET',
          path: '/aec2/v1/workspaces/{workspaceId}/clusters',
          detailUrl: `${BASE_URL}/aec2/list-workspace-clusters`,
        },
      ],
    },
  ],
};
