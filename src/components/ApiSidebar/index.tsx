import { useState, useMemo, useEffect, useCallback } from 'react';
import { history, Link } from '@umijs/max';
import { getAllProducts, getCategoryByProductId } from '@/data';
import type { ApiProduct } from '@/types/api';
import './index.scss';

interface ApiSidebarProps {
  currentProductId: string;
  currentEndpointId?: string;
}

function getApiCount(product: ApiProduct): number {
  let count = 0;
  for (const g of product.groups) {
    count += g.endpoints.length;
  }
  return count;
}

export default function ApiSidebar({ currentProductId, currentEndpointId }: ApiSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set([currentProductId]));
  const allProducts = getAllProducts();

  useEffect(() => {
    setExpandedIds((prev) => {
      if (prev.has(currentProductId)) return prev;
      const next = new Set(prev);
      next.add(currentProductId);
      return next;
    });
  }, [currentProductId]);

  const handleProductClick = useCallback((productId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
    if (productId !== currentProductId) {
      history.push(`/apis/${productId}`);
    }
  }, [currentProductId]);

  const lowerQuery = searchQuery.toLowerCase().trim();

  const filteredProducts = useMemo(() => {
    if (!lowerQuery) return allProducts;
    return allProducts.filter((product) => {
      if (
        product.name.toLowerCase().includes(lowerQuery) ||
        product.abbreviation.toLowerCase().includes(lowerQuery)
      ) {
        return true;
      }
      for (const group of product.groups) {
        for (const ep of group.endpoints) {
          if (ep.displayName.toLowerCase().includes(lowerQuery)) {
            return true;
          }
        }
      }
      return false;
    });
  }, [allProducts, lowerQuery]);

  return (
    <aside className="api-sidebar">
      <div className="api-sidebar__title">
        <Link to="/apis/ecs" className="api-sidebar__title-text">SenseCore API 中心</Link>
      </div>
      <div className="api-sidebar__search">
        <input
          type="text"
          className="api-sidebar__search-input"
          placeholder="搜索产品或 API..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <nav className="api-sidebar__nav">
        {filteredProducts.map((product) => {
          const isExpanded = expandedIds.has(product.id);
          const isCurrent = product.id === currentProductId;
          const category = getCategoryByProductId(product.id);
          const categoryColor = category?.color || '#6366f1';
          const totalCount = getApiCount(product);
          const matchCount = lowerQuery
            ? product.groups.reduce((sum, g) =>
                sum + g.endpoints.filter((ep) =>
                  ep.displayName.toLowerCase().includes(lowerQuery)
                ).length, 0)
            : totalCount;
          const displayCount = lowerQuery ? matchCount : totalCount;

          return (
            <div key={product.id} className="api-sidebar__product">
              <div
                className={`api-sidebar__product-row${isCurrent ? ' api-sidebar__product-row--active' : ''}`}
                onClick={() => handleProductClick(product.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleProductClick(product.id); }}
              >
                <span className="api-sidebar__product-arrow">
                  {isExpanded ? '▾' : '▸'}
                </span>
                <span
                  className="api-sidebar__product-icon"
                  style={{ backgroundColor: categoryColor }}
                >
                  {product.abbreviation}
                </span>
                <span className="api-sidebar__product-name">{product.name}</span>
                <span className="api-sidebar__product-count">{displayCount}</span>
              </div>

              {isExpanded && (
                <div className="api-sidebar__tree">
                  {product.groups.map((group) => {
                    const filteredEndpoints = lowerQuery
                      ? group.endpoints.filter((ep) =>
                          ep.displayName.toLowerCase().includes(lowerQuery),
                        )
                      : group.endpoints;
                    if (lowerQuery && filteredEndpoints.length === 0) return null;

                    return (
                      <div key={group.name} className="api-sidebar__group">
                        <div className="api-sidebar__group-label">{group.name}</div>
                        <ul className="api-sidebar__endpoint-list">
                          {filteredEndpoints.map((ep) => (
                            <li key={ep.id}>
                              <span
                                className={`api-sidebar__endpoint-link${ep.id === currentEndpointId ? ' api-sidebar__endpoint-link--active' : ''}`}
                                onClick={() => history.push(`/apis/${product.id}/${ep.id}`)}
                                role="link"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter') history.push(`/apis/${product.id}/${ep.id}`); }}
                              >
                                {ep.displayName}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="api-sidebar__empty">没有匹配的产品或 API</div>
        )}
      </nav>
    </aside>
  );
}
