import { useState } from 'react';
import { Link, useParams, history } from '@umijs/max';
import { getProductById } from '@/data';
import ApiSidebar from '@/components/ApiSidebar';
import './product.scss';

const methodColors: Record<string, string> = {
  GET: 'var(--color-get)',
  POST: 'var(--color-post)',
  PUT: 'var(--color-put)',
  DELETE: 'var(--color-delete)',
  PATCH: 'var(--color-patch)',
};

export default function ProductPage() {
  const { product: productId } = useParams<{ product: string }>();
  const product = getProductById(productId!);
  const [searchQuery, setSearchQuery] = useState('');

  if (!product) {
    return (
      <div className="product-page__not-found">
        <h2>产品未找到</h2>
        <p>
          找不到 ID 为 "{productId}" 的产品。
        </p>
        <Link to="/apis/ecs">返回 API 目录</Link>
      </div>
    );
  }

  // Flatten all endpoints
  const allEndpoints = product.groups.flatMap((g) =>
    g.endpoints.map((ep) => ({ ...ep })),
  );

  // Filter by search
  const lowerQuery = searchQuery.toLowerCase().trim();
  const filteredEndpoints = lowerQuery
    ? allEndpoints.filter(
        (ep) =>
          ep.displayName.toLowerCase().includes(lowerQuery) ||
          ep.description.toLowerCase().includes(lowerQuery),
      )
    : allEndpoints;

  return (
    <div className="product-page">
      <ApiSidebar currentProductId={product.id} />
      <main className="product-page__content">
        {/* Product header */}
        <div className="product-page__header">
          <div className="product-page__header-left">
            <h1 className="product-page__title">{product.name}</h1>
            <p className="product-page__desc">{product.description}</p>
          </div>
        </div>

        {/* Search + count bar */}
        <div className="product-page__toolbar">
          <input
            type="text"
            className="product-page__search-input"
            placeholder="搜索 API 名称或描述..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="product-page__count">
            共 {filteredEndpoints.length} 个 API
          </span>
        </div>

        {/* API Table */}
        <div className="product-page__table">
          <div className="product-page__table-header">
            <span className="product-page__col-name">API 名称</span>
            <span className="product-page__col-desc">描述</span>
            <span className="product-page__col-path">请求路径</span>
          </div>
          {filteredEndpoints.map((ep) => (
            <div
              key={ep.id}
              className="product-page__table-row"
              onClick={() => history.push(`/apis/${product.id}/${ep.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') history.push(`/apis/${product.id}/${ep.id}`);
              }}
            >
              <span className="product-page__col-name product-page__col-name--bold">
                {ep.displayName}
              </span>
              <span className="product-page__col-desc product-page__col-desc--secondary">
                {ep.description}
              </span>
              <span className="product-page__col-path">
                <span
                  className="product-page__method"
                  style={{ color: methodColors[ep.method] || 'var(--text-tertiary)' }}
                >
                  {ep.method}
                </span>
                <span className="product-page__path">{ep.path}</span>
              </span>
            </div>
          ))}
          {filteredEndpoints.length === 0 && (
            <div className="product-page__empty">
              没有匹配的 API
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
