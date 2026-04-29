import { useModel, history } from '@umijs/max';
import type { ApiEndpoint } from '@/types/api';
import './index.scss';

interface ExplorerPanelProps {
  endpoint: ApiEndpoint;
  productId: string;
}

export default function ExplorerPanel({ endpoint, productId }: ExplorerPanelProps) {
  const { isLoggedIn } = useModel('global');

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const doc = (e.target as HTMLIFrameElement).contentDocument;
      if (!doc) return;
      const style = doc.createElement('style');
      style.textContent = `
        /* Hide the left documentation column, show only right try-it panel */
        .sl-elements article > div { display: flex !important; }
        .sl-elements article > div > div:first-child,
        [class*="col--7"] { display: none !important; }
        .sl-elements article > div > div:nth-child(2),
        [class*="col--5"] {
          width: 100% !important;
          max-width: 100% !important;
          flex: 1 !important;
          padding: 0 !important;
        }
        /* Hide the code examples section (keep only the try-it form above) */
        .sl-elements [class*="TryIt"] ~ div,
        .sl-elements article > div > div:nth-child(2) > div:last-child {
          display: none !important;
        }
        /* Clean up padding and layout */
        body { margin: 0 !important; padding: 0 !important; overflow-x: hidden !important; }
        .sl-elements { padding: 0 !important; }
        #elements-container { padding: 0 !important; }
      `;
      doc.head.appendChild(style);
    } catch {}
  };

  const handleOverlayClick = () => {
    if (!isLoggedIn) {
      history.push(`/login?returnUrl=/api-explorer/${productId}/${endpoint.id}`);
    }
  };

  return (
    <div className="explorer-panel">
      {!isLoggedIn && (
        <div className="explorer-panel__login-overlay" onClick={handleOverlayClick}>
          <div className="explorer-panel__login-prompt">
            <span className="explorer-panel__login-icon">🔒</span>
            <span className="explorer-panel__login-text">登录后可使用 API 调试功能</span>
            <button className="explorer-panel__login-btn">去登录</button>
          </div>
        </div>
      )}
      <iframe
        className="explorer-panel__iframe"
        src={endpoint.detailUrl}
        title={`${endpoint.displayName} - 调试`}
        onLoad={handleIframeLoad}
      />
    </div>
  );
}
