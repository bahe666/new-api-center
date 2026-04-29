import { useState, useRef, useEffect } from 'react';
import type { ApiEndpoint } from '@/types/api';
import './index.scss';

interface DocPanelProps {
  endpoint: ApiEndpoint;
}

type TabKey = 'params' | 'docs' | 'code';

const PARAMS_CSS = `
  /* Show only the left documentation column (parameters + responses) */
  .sl-elements article > div > div:nth-child(2),
  [class*="col--5"] { display: none !important; }
  .sl-elements article > div > div:first-child,
  [class*="col--7"] { width: 100% !important; max-width: 100% !important; flex: 1 !important; }
  /* Hide the API title (already shown in middle panel header) */
  .sl-elements article > div > div:first-child > div > h2:first-child,
  .sl-elements article > div > div:first-child > div > p:first-of-type { display: none !important; }
  body { margin: 0 !important; padding: 16px !important; overflow-x: hidden !important; }
  .sl-elements { padding: 0 !important; }
  #elements-container { padding: 0 !important; }
`;

const CODE_CSS = `
  /* Show only the code examples section (bottom of right column) */
  .sl-elements article > div > div:first-child,
  [class*="col--7"] { display: none !important; }
  .sl-elements article > div > div:nth-child(2),
  [class*="col--5"] { width: 100% !important; max-width: 100% !important; flex: 1 !important; padding: 0 !important; }
  /* Hide the try-it form area, keep only code examples */
  .openapi-method-endpoint,
  .details__demo-panel,
  .sl-elements article > div > div:nth-child(2) > div > div:nth-child(1),
  .sl-elements article > div > div:nth-child(2) > div > div:nth-child(2),
  .sl-elements article > div > div:nth-child(2) > div > div:nth-child(3) {
    display: none !important;
  }
  .tabs-container, [class*="tabList_"], [class*="tabs-container"] {
    display: block !important;
  }
  body { margin: 0 !important; padding: 16px !important; overflow-x: hidden !important; }
  .sl-elements { padding: 0 !important; }
  #elements-container { padding: 0 !important; }
`;

export default function DocPanel({ endpoint }: DocPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('params');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const injectCSS = (iframe: HTMLIFrameElement, css: string) => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;
      const existing = doc.getElementById('doc-panel-inject');
      if (existing) existing.remove();
      const style = doc.createElement('style');
      style.id = 'doc-panel-inject';
      style.textContent = css;
      doc.head.appendChild(style);
    } catch {}
  };

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    if (activeTab === 'params') {
      injectCSS(e.currentTarget, PARAMS_CSS);
    } else if (activeTab === 'code') {
      injectCSS(e.currentTarget, CODE_CSS);
    }
  };

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      if (activeTab === 'params') {
        injectCSS(iframeRef.current, PARAMS_CSS);
      } else if (activeTab === 'code') {
        injectCSS(iframeRef.current, CODE_CSS);
      }
    }
  }, [activeTab]);

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
        {activeTab === 'docs' ? (
          <iframe
            key={`docs-${endpoint.id}`}
            className="doc-panel__iframe"
            src={endpoint.detailUrl.replace('.html', '-doc.html')}
            title={`${endpoint.displayName} - 文档说明`}
          />
        ) : (
          <iframe
            key={`${activeTab}-${endpoint.id}`}
            ref={iframeRef}
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
