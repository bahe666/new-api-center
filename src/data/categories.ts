import type { CategoryMeta } from '@/types/api';

export const categories: CategoryMeta[] = [
  {
    id: 'compute',
    name: '计算',
    description: '弹性云服务器、裸金属、AI 算力池等计算资源管理',
    icon: 'CloudServerOutlined',
    color: '#6366f1',
    products: ['ecs', 'aec2', 'bms', 'acp'],
  },
  {
    id: 'ai-ml',
    name: 'AI & ML',
    description: 'ModelStudio 开发机、推理服务、知识库及数据管理',
    icon: 'ExperimentOutlined',
    color: '#8b5cf6',
    products: ['modelstudio-dev', 'modelstudio-inference', 'modelstudio-knowledge', 'aidmp'],
  },
  {
    id: 'containers',
    name: '容器 & DevOps',
    description: '云容器实例、镜像服务、云监控等运维工具',
    icon: 'ContainerOutlined',
    color: '#06b6d4',
    products: ['cci', 'ccr', 'cms'],
  },
  {
    id: 'storage',
    name: '存储 & 数据',
    description: '块存储、对象存储、文件存储及数据同步服务',
    icon: 'DatabaseOutlined',
    color: '#14b8a6',
    products: ['abs', 'aoss', 'afs', 'ads'],
  },
  {
    id: 'networking',
    name: '网络 & 安全',
    description: '私有网络、弹性 IP、访问控制、资源管理及费用中心',
    icon: 'SafetyOutlined',
    color: '#f97316',
    products: ['vpc', 'eip', 'iam', 'rm', 'boss'],
  },
];
