import { useState } from 'react';
import { useModel, history } from '@umijs/max';
import type { ApiEndpoint } from '@/types/api';
import './index.scss';

interface ExplorerPanelProps {
  endpoint: ApiEndpoint;
  productId: string;
}

export default function ExplorerPanel({ endpoint, productId }: ExplorerPanelProps) {
  const { isLoggedIn } = useModel('global');
  const [response, setResponse] = useState<object | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSend = () => {
    if (!isLoggedIn) {
      history.push(`/login?returnUrl=/api-explorer/${productId}/${endpoint.id}`);
      return;
    }
    setResponse({
      RequestId: 'req-' + Math.random().toString(36).slice(2, 10),
      Action: endpoint.id,
      Status: 'Success',
      Data: {
        message: '调试成功（模拟响应）',
        timestamp: new Date().toISOString(),
      },
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('sk-SenseCoreDemo-fake-token-12345');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="explorer-panel">
      <div className="explorer-panel__header">
        <span className="explorer-panel__method">{endpoint.method}</span>
        <span className="explorer-panel__path">{endpoint.path}</span>
      </div>

      <div className="explorer-panel__body">
        <div className="explorer-panel__section">
          <div className="explorer-panel__section-title">Authorization</div>
          <div className="explorer-panel__auth">
            <div className="explorer-panel__auth-row">
              <span className="explorer-panel__auth-label">Bearer Token</span>
              <div className="explorer-panel__auth-input">
                <code className="explorer-panel__token">sk-SenseCoreDemo***Token</code>
                <button className="explorer-panel__copy-btn" onClick={handleCopy}>
                  {copied ? '已复制' : '复制'}
                </button>
              </div>
            </div>
            <div className="explorer-panel__auth-hint">
              Token 仅供在线调试，生产环境请使用 AK/SK 签名认证
            </div>
            <a
              className="explorer-panel__aksk-link"
              href="https://console.sensecore.cn/cn-sh-01/iam/Security/access-key"
              target="_blank"
              rel="noopener noreferrer"
            >
              获取 AK/SK →
            </a>
          </div>
        </div>

        <div className="explorer-panel__section">
          <div className="explorer-panel__section-header">
            <span className="explorer-panel__section-title">Request</span>
            <button className="explorer-panel__send-btn" onClick={handleSend}>
              Send API Request
            </button>
          </div>
          <div className="explorer-panel__request-info">
            <div className="explorer-panel__info-row">
              <code className="explorer-panel__info-label">Base URL</code>
              <span className="explorer-panel__info-value">https://ecs.cn-sh-01.sensecoreapi.cn</span>
            </div>
          </div>
        </div>

        {response && (
          <div className="explorer-panel__section">
            <div className="explorer-panel__section-title">Response</div>
            <pre className="explorer-panel__response">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
