import { useState } from 'react';
import { useModel, history } from '@umijs/max';
import type { ApiEndpoint } from '@/types/api';
import './index.scss';

interface ExplorerPanelProps {
  endpoint: ApiEndpoint;
  productId: string;
  onDebug: () => void;
}

export default function ExplorerPanel({ endpoint, productId, onDebug }: ExplorerPanelProps) {
  const { isLoggedIn } = useModel('global');
  const [authCollapsed, setAuthCollapsed] = useState(false);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [showRequired, setShowRequired] = useState(false);

  const params = endpoint.parameters || [];
  const displayParams = showRequired ? params.filter((p) => p.required) : params;
  const requiredCount = params.filter((p) => p.required).length;

  const handleDebug = () => {
    if (!isLoggedIn) {
      history.push(`/login?returnUrl=/api-explorer/${productId}/${endpoint.id}`);
      return;
    }
    onDebug();
  };

  const handleClear = () => {
    setParamValues({});
  };

  return (
    <div className="explorer-panel">
      <div className="explorer-panel__header">
        <div className="explorer-panel__title-area">
          <span className="explorer-panel__name">{endpoint.displayName}</span>
          <span className="explorer-panel__method">{endpoint.method}</span>
        </div>
        <button className="explorer-panel__debug-btn" onClick={handleDebug}>
          发起调试
        </button>
      </div>

      <div className="explorer-panel__body">
        {!authCollapsed && (
          <div className="explorer-panel__auth-card">
            <div className="explorer-panel__auth-header">
              <span className="explorer-panel__auth-title">鉴权信息</span>
              <span className="explorer-panel__auth-toggle" onClick={() => setAuthCollapsed(true)}>收起</span>
            </div>
            <div className="explorer-panel__auth-content">
              <div className="explorer-panel__token-row">
                <code className="explorer-panel__token-value">Bearer sk-SenseCoreDemo***Token</code>
                <span
                  className="explorer-panel__token-copy"
                  onClick={() => { navigator.clipboard.writeText('sk-SenseCoreDemo-fake-token-12345'); }}
                >
                  复制
                </span>
              </div>
              <div className="explorer-panel__auth-hint">
                仅供调试 · 生产环境请用 AK/SK ·{' '}
                <a href="https://console.sensecore.cn/cn-sh-01/iam/Security/access-key" target="_blank" rel="noopener noreferrer">
                  获取 AK/SK
                </a>
              </div>
            </div>
          </div>
        )}

        {authCollapsed && (
          <div className="explorer-panel__auth-collapsed" onClick={() => setAuthCollapsed(false)}>
            <span className="explorer-panel__auth-title">🔑</span>
            <code className="explorer-panel__token-value">sk-***Token</code>
            <span className="explorer-panel__token-copy" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText('sk-SenseCoreDemo-fake-token-12345'); }}>
              复制
            </span>
            <span className="explorer-panel__auth-expand">展开 ▾</span>
          </div>
        )}

        <div className="explorer-panel__region">
          <span className="explorer-panel__region-label">服务Region</span>
          <select className="explorer-panel__region-select">
            <option>cn-shanghai-1</option>
            <option>cn-beijing-1</option>
          </select>
        </div>

        <div className="explorer-panel__params-header">
          <span className="explorer-panel__params-title">输入参数</span>
          <label className="explorer-panel__required-filter">
            <input type="checkbox" checked={showRequired} onChange={(e) => setShowRequired(e.target.checked)} />
            只看必填
          </label>
        </div>

        <div className="explorer-panel__params-list">
          {displayParams.map((param) => (
            <div
              key={param.name}
              className={`explorer-panel__param-row${param.required ? ' explorer-panel__param-row--required' : ''}`}
            >
              <span className="explorer-panel__param-required">{param.required ? '*' : ''}</span>
              <div className="explorer-panel__param-info">
                <div className="explorer-panel__param-name">{param.name}</div>
                <div className="explorer-panel__param-type">{param.type}</div>
              </div>
              <input
                className="explorer-panel__param-input"
                placeholder={param.placeholder || ''}
                value={paramValues[param.name] || ''}
                onChange={(e) => setParamValues((prev) => ({ ...prev, [param.name]: e.target.value }))}
              />
            </div>
          ))}
          {displayParams.length === 0 && (
            <div className="explorer-panel__params-empty">无参数</div>
          )}
        </div>
      </div>

      <div className="explorer-panel__footer">
        <span className="explorer-panel__params-count">{params.length} 个参数 · {requiredCount} 必填</span>
        <button className="explorer-panel__clear-btn" onClick={handleClear}>全部清空</button>
      </div>
    </div>
  );
}
