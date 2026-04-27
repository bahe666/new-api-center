import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const vpc: ApiProduct = {
  id: 'vpc',
  name: '私有网络 VPC',
  abbreviation: 'VPC',
  description: '私有网络实例管理',
  category: 'networking',
  groups: [
    {
      name: 'VPC管理',
      endpoints: [
        {
          id: 'vpc-get-instance',
          displayName: '查看 VPC 实例详情',
          description: '查看 VPC 实例详情',
          method: 'GET',
          path: '/vpc/v1/instances/{instanceId}',
          detailUrl: `${BASE_URL}/vpc/get-instance`,
        },
      ],
    },
  ],
};
