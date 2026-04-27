import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const boss: ApiProduct = {
  id: 'boss',
  name: '费用与成本中心 BOSS',
  abbreviation: 'BOSS',
  description: '账单统计、计费账户、订单与资源包管理',
  category: 'networking',
  groups: [
    {
      name: '账单',
      endpoints: [
        {
          id: 'boss-list-user-bills',
          displayName: '获取用户视角账单统计列表',
          description: '获取用户视角账单统计列表',
          method: 'GET',
          path: '/boss/v1/bills/user',
          detailUrl: `${BASE_URL}/boss/list-user-bills`,
        },
        {
          id: 'boss-get-bill-details',
          displayName: '获取账单明细',
          description: '获取账单明细',
          method: 'GET',
          path: '/boss/v1/bills/details',
          detailUrl: `${BASE_URL}/boss/get-bill-details`,
        },
        {
          id: 'boss-list-billing-account-bills',
          displayName: '获取计费账户视角账单统计列表',
          description: '获取计费账户视角账单统计列表',
          method: 'GET',
          path: '/boss/v1/bills/billing-account',
          detailUrl: `${BASE_URL}/boss/list-billing-account-bills`,
        },
        {
          id: 'boss-list-management-group-bills',
          displayName: '获取管理组视角账单统计列表',
          description: '获取管理组视角账单统计列表',
          method: 'GET',
          path: '/boss/v1/bills/management-group',
          detailUrl: `${BASE_URL}/boss/list-management-group-bills`,
        },
        {
          id: 'boss-list-resource-group-bills',
          displayName: '获取资源组视角账单统计列表',
          description: '获取资源组视角账单统计列表',
          method: 'GET',
          path: '/boss/v1/bills/resource-group',
          detailUrl: `${BASE_URL}/boss/list-resource-group-bills`,
        },
        {
          id: 'boss-list-subscription-bills',
          displayName: '获取订阅视角账单统计列表',
          description: '获取订阅视角账单统计列表',
          method: 'GET',
          path: '/boss/v1/bills/subscription',
          detailUrl: `${BASE_URL}/boss/list-subscription-bills`,
        },
        {
          id: 'boss-list-transactions',
          displayName: '获取收支明细列表',
          description: '获取收支明细列表',
          method: 'GET',
          path: '/boss/v1/transactions',
          detailUrl: `${BASE_URL}/boss/list-transactions`,
        },
      ],
    },
    {
      name: '计费账户',
      endpoints: [
        {
          id: 'boss-list-billing-accounts',
          displayName: '获取计费账户列表',
          description: '获取计费账户列表',
          method: 'GET',
          path: '/boss/v1/billing-accounts',
          detailUrl: `${BASE_URL}/boss/list-billing-accounts`,
        },
        {
          id: 'boss-update-billing-account',
          displayName: '编辑计费账户',
          description: '编辑计费账户',
          method: 'PUT',
          path: '/boss/v1/billing-accounts/{accountId}',
          detailUrl: `${BASE_URL}/boss/update-billing-account`,
        },
      ],
    },
    {
      name: '合同与资源包',
      endpoints: [
        {
          id: 'boss-get-contract-package',
          displayName: '获取合同包详情与用量',
          description: '获取合同包详情与用量',
          method: 'GET',
          path: '/boss/v1/contract-packages/{packageId}',
          detailUrl: `${BASE_URL}/boss/get-contract-package`,
        },
        {
          id: 'boss-list-contract-packages',
          displayName: '获取合同包列表',
          description: '获取合同包列表',
          method: 'GET',
          path: '/boss/v1/contract-packages',
          detailUrl: `${BASE_URL}/boss/list-contract-packages`,
        },
        {
          id: 'boss-get-resource-package',
          displayName: '获取资源包详情与用量',
          description: '获取资源包详情与用量',
          method: 'GET',
          path: '/boss/v1/resource-packages/{packageId}',
          detailUrl: `${BASE_URL}/boss/get-resource-package`,
        },
        {
          id: 'boss-list-resource-packages',
          displayName: '获取资源包列表',
          description: '获取资源包列表',
          method: 'GET',
          path: '/boss/v1/resource-packages',
          detailUrl: `${BASE_URL}/boss/list-resource-packages`,
        },
      ],
    },
    {
      name: '订单',
      endpoints: [
        {
          id: 'boss-get-order',
          displayName: '获取订单详情',
          description: '获取订单详情',
          method: 'GET',
          path: '/boss/v1/orders/{orderId}',
          detailUrl: `${BASE_URL}/boss/get-order`,
        },
        {
          id: 'boss-list-orders',
          displayName: '获取订单列表',
          description: '获取订单列表',
          method: 'GET',
          path: '/boss/v1/orders',
          detailUrl: `${BASE_URL}/boss/list-orders`,
        },
      ],
    },
  ],
};
