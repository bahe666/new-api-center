import type { ApiProduct } from '@/types/api';

const BASE_URL = 'https://console.sensecore.cn/micro/help/docs/API';

export const acp: ApiProduct = {
  id: 'acp',
  name: '高性能AI算力池 ACP',
  abbreviation: 'ACP',
  description: '高性能 AI 训练任务与 Worker 管理',
  category: 'compute',
  groups: [
    {
      name: '任务管理',
      endpoints: [
        {
          id: 'acp-create-task',
          displayName: '创建任务',
          description: '创建任务',
          method: 'POST',
          path: '/acp/v1/tasks',
          detailUrl: `${BASE_URL}/acp/create-task`,
        },
        {
          id: 'acp-get-task',
          displayName: '查看任务详情',
          description: '查看任务详情',
          method: 'GET',
          path: '/acp/v1/tasks/{taskId}',
          detailUrl: `${BASE_URL}/acp/get-task`,
        },
        {
          id: 'acp-list-tasks',
          displayName: '获取任务列表',
          description: '获取任务列表',
          method: 'GET',
          path: '/acp/v1/tasks',
          detailUrl: `${BASE_URL}/acp/list-tasks`,
        },
        {
          id: 'acp-update-task',
          displayName: '更新任务',
          description: '更新任务',
          method: 'PUT',
          path: '/acp/v1/tasks/{taskId}',
          detailUrl: `${BASE_URL}/acp/update-task`,
        },
        {
          id: 'acp-batch-delete-tasks',
          displayName: '批量删除任务',
          description: '批量删除任务',
          method: 'DELETE',
          path: '/acp/v1/tasks/batch',
          detailUrl: `${BASE_URL}/acp/batch-delete-tasks`,
        },
        {
          id: 'acp-list-workers',
          displayName: '获取Worker列表',
          description: '获取Worker列表',
          method: 'GET',
          path: '/acp/v1/workers',
          detailUrl: `${BASE_URL}/acp/list-workers`,
        },
      ],
    },
  ],
};
