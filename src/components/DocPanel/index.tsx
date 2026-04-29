import { useState } from 'react';
import type { ApiEndpoint } from '@/types/api';
import './index.scss';

interface DocPanelProps {
  endpoint: ApiEndpoint;
}

type TabKey = 'params' | 'docs' | 'code';

export default function DocPanel({ endpoint }: DocPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('params');

  const injectStyles = (iframe: HTMLIFrameElement, tab: TabKey) => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      const existing = doc.getElementById('panel-inject-style');
      if (existing) existing.remove();

      const style = doc.createElement('style');
      style.id = 'panel-inject-style';

      if (tab === 'params') {
        // Show only the left documentation column (parameters + responses)
        style.textContent = `
          .sl-elements article > div > div:nth-child(2),
          [class*="col--5"], [class*="col-5"],
          .TryItPanel, [class*="TryIt"] { display: none !important; }
          .sl-elements article > div > div:first-child,
          [class*="col--7"], [class*="col-7"] { width: 100% !important; max-width: 100% !important; flex: 1 !important; }
          body { padding: 16px !important; }
        `;
      } else if (tab === 'code') {
        // Show only the code examples section (right column, bottom part)
        style.textContent = `
          .sl-elements article > div > div:first-child,
          [class*="col--7"], [class*="col-7"] { display: none !important; }
          .sl-elements article > div > div:nth-child(2),
          [class*="col--5"], [class*="col-5"] { width: 100% !important; max-width: 100% !important; flex: 1 !important; }
          .TryItPanel, [class*="TryIt"],
          [class*="HttpOperation"] > div:nth-child(2) > div:first-child,
          [class*="HttpOperation"] > div:nth-child(2) > div:nth-child(2) { display: none !important; }
          body { padding: 16px !important; }
        `;
      } else {
        // docs tab - show everything but simplify
        style.textContent = `
          body { padding: 16px !important; }
        `;
      }

      doc.head.appendChild(style);
    } catch {}
  };

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    injectStyles(e.currentTarget, activeTab);
  };

  const iframeSrc = activeTab === 'docs' && endpoint.docUrl
    ? endpoint.docUrl
    : endpoint.detailUrl;

  return (
    <div className="doc-panel">
      <div className="doc-panel__tabs">
        <button
          className={`doc-panel__tab${activeTab === 'params' ? ' doc-panel__tab--active' : ''}`}
          onClick={() => setActiveTab('params')}
        >
          参数说明
        </button>
        <button
          className={`doc-panel__tab${activeTab === 'docs' ? ' doc-panel__tab--active' : ''}`}
          onClick={() => setActiveTab('docs')}
        >
          文档说明
        </button>
        <button
          className={`doc-panel__tab${activeTab === 'code' ? ' doc-panel__tab--active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          代码示例
        </button>
      </div>

      <div className="doc-panel__content">
        {activeTab === 'docs' && endpoint.docUrl ? (
          <iframe
            key={`docs-${endpoint.id}`}
            className="doc-panel__iframe"
            src={endpoint.docUrl}
            title={`${endpoint.displayName} - 文档说明`}
          />
        ) : (
          <iframe
            key={`${activeTab}-${endpoint.id}`}
            className="doc-panel__iframe"
            src={endpoint.detailUrl}
            title={`${endpoint.displayName} - ${activeTab === 'params' ? '参数说明' : '代码示例'}`}
            onLoad={handleIframeLoad}
          />
        )}
      </div>
    </div>
  );
}
