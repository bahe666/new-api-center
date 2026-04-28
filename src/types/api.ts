export type ApiCategory = 'compute' | 'ai-ml' | 'containers' | 'storage' | 'networking';

export interface CategoryMeta {
  id: ApiCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  products: string[];
}

export interface ApiProduct {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  category: ApiCategory;
  groups: ApiGroup[];
}

export interface ApiGroup {
  name: string;
  endpoints: ApiEndpoint[];
}

export interface ApiParameter {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'object' | 'array';
  required: boolean;
  description: string;
  placeholder?: string;
  defaultValue?: string;
}

export interface ApiEndpoint {
  id: string;
  displayName: string;
  description: string;
  method: string;
  path: string;
  detailUrl: string;
  docUrl?: string;
  parameters?: ApiParameter[];
}
