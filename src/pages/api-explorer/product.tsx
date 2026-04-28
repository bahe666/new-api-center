import { useState } from 'react';
import { useParams, history } from '@umijs/max';
import { getProductById } from '@/data';
import ApiSidebar from '@/components/ApiSidebar';
import './product.scss';

const methodColors: Record<string, string> = {
  GET: '#22c55e',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  DELETE: '#ef4444',
  PATCH: '#a855f7',
};

export default function ProductListPage() {
  const { product: productId } = useParams<{ product: string }>();
  const product = getProductById(productId!);
  const [searchQuery, setSearchQuery] = useState('');

  if (!product) {
    return (
      <div className="product-list__not-found">
        <h2>产品未找到</h2>
        <p>找不到 ID 为 &quot;{productId}&quot; 的产品。</p>
      </div>
    );
  }

  const allEndpoints = product.groups.flatMap((g) =>
    g.endpoints.map((ep) => ({ ...ep })),
  );

  const lowerQuery = searchQuery.toLowerCase().trim();
  const filteredEndpoints = lowerQuery
    ? allEndpoints.filter(
        (ep) =>
          ep.displayName.toLowerCase().includes(lowerQuery) ||
          ep.description.toLowerCase().includes(lowerQuery),
      )
    : allEndpoints;

  return (
    <div className="product-list">
      <ApiSidebar currentProductId={product.id} />
      <div className="product-list__content">
        <div className="product-list__header">
          <h1 className="product-list__title">{product.name}</h1>
          <p className="product-list__desc">{product.description}</p>
        </div>

        <div className="product-list__toolbar">
          <input
            type="text"
            className="product-list__search"
            placeholder="搜索 API 名称或描述..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="product-list__count">共 {filteredEndpoints.length} 个 API</span>
        </div>

        <div className="product-list__table">
          <div className="product-list__table-header">
            <span className="product-list__col product-list__col--name">API 名称</span>
            <span className="product-list__col product-list__col--desc">描述</span>
            <span className="product-list__col product-list__col--path">请求路径</span>
            <span className="product-list__col product-list__col--action">操作</span>
          </div>
          {filteredEndpoints.map((ep) => (
            <div
              key={ep.id}
              className="product-list__row"
              onClick={() => history.push(`/api-explorer/${product.id}/${ep.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') history.push(`/api-explorer/${product.id}/${ep.id}`); }}
            >
              <span className="product-list__col product-list__col--name product-list__col--bold">
                {ep.displayName}
              </span>
              <span className="product-list__col product-list__col--desc product-list__col--secondary">
                {ep.description}
              </span>
              <span className="product-list__col product-list__col--path">
                <span className="product-list__method" style={{ color: methodColors[ep.method] || '#6b7280' }}>
                  {ep.method}
                </span>
                <span className="product-list__path-text">{ep.path}</span>
              </span>
              <span className="product-list__col product-list__col--action" onClick={(e) => e.stopPropagation()}>
                {ep.docUrl ? (
                  <a href={ep.docUrl} target="_blank" rel="noopener noreferrer" className="product-list__doc-link">
                    查看文档
                  </a>
                ) : (
                  <span className="product-list__doc-link product-list__doc-link--disabled">查看文档</span>
                )}
              </span>
            </div>
          ))}
          {filteredEndpoints.length === 0 && (
            <div className="product-list__empty">没有匹配的 API</div>
          )}
        </div>
      </div>
    </div>
  );
}
