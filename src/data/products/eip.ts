import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const eip: ApiProduct = {
  id: 'eip',
  name: '弹性公网IP EIP',
  abbreviation: 'EIP',
  description: '弹性公网 IP 管理与访问控制',
  category: 'networking',
  groups: [
    {
      name: 'EIP管理',
      endpoints: [
        {
          id: 'eip-get-instance',
          displayName: '查看 EIP 实例详情',
          description: '查看 EIP 实例详情',
          method: 'GET',
          path: '/eip/v1/instances/{instanceId}',
          detailUrl: `${BASE_URL}/eip/get-instance`,
        },
        {
          id: 'eip-list-dnat-rules',
          displayName: '获取某个EIP对应的 DNATRules 列表',
          description: '获取某个EIP对应的 DNATRules 列表',
          method: 'GET',
          path: '/eip/v1/instances/{instanceId}/dnat-rules',
          detailUrl: `${BASE_URL}/eip/list-dnat-rules`,
        },
        {
          id: 'eip-list-whitelist',
          displayName: '获取EIP访问控制白名单列表',
          description: '获取EIP访问控制白名单列表',
          method: 'GET',
          path: '/eip/v1/instances/{instanceId}/whitelist',
          detailUrl: `${BASE_URL}/eip/list-whitelist`,
        },
      ],
    },
  ],
};
