import { useState, useEffect } from 'react';
import type { ApiEndpoint } from '@/types/api';
import './index.scss';

interface DocPanelProps {
  endpoint: ApiEndpoint;
  debugResult: object | null;
}

export default function DocPanel({ endpoint, debugResult }: DocPanelProps) {
  const [activeTab, setActiveTab] = useState<'doc' | 'result'>('doc');

  useEffect(() => {
    if (debugResult) setActiveTab('result');
  }, [debugResult]);

  return (
    <div className="doc-panel">
      <div className="doc-panel__tabs">
        <button
          className={`doc-panel__tab${activeTab === 'doc' ? ' doc-panel__tab--active' : ''}`}
          onClick={() => setActiveTab('doc')}
        >
          文档说明
        </button>
        <button
          className={`doc-panel__tab${activeTab === 'result' ? ' doc-panel__tab--active' : ''}`}
          onClick={() => setActiveTab('result')}
        >
          调试结果
        </button>
      </div>

      <div className="doc-panel__content">
        {activeTab === 'doc' && (
          <iframe
            className="doc-panel__iframe"
            src={endpoint.detailUrl}
            title={endpoint.displayName}
          />
        )}
        {activeTab === 'result' && (
          <div className="doc-panel__result">
            {debugResult ? (
              <pre className="doc-panel__json">{JSON.stringify(debugResult, null, 2)}</pre>
            ) : (
              <div className="doc-panel__empty">
                <div className="doc-panel__empty-icon">📋</div>
                <div className="doc-panel__empty-text">点击「发起调试」查看响应结果</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
