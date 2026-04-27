import { useState, useCallback } from 'react';
import './index.scss';

const DEMO_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.demo_token_for_testing';
const STORAGE_KEY = 'sensecore-auth-guide-collapsed';

export default function AuthGuide() {
  const [collapsed, setCollapsed] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === 'true',
  );
  const [copied, setCopied] = useState(false);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const copyToken = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(DEMO_TOKEN);
      setCopied(true);
      window.dispatchEvent(new CustomEvent('auth-guide-token-copied'));
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = DEMO_TOKEN;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      window.dispatchEvent(new CustomEvent('auth-guide-token-copied'));
      setTimeout(() => setCopied(false), 1500);
    }
  }, []);

  return (
    <div className="auth-guide">
      <div className="auth-guide__header" onClick={toggleCollapse}>
        <span className="auth-guide__icon">&#128273;</span>
        <span className="auth-guide__title">如何调用此 API</span>
        <span className="auth-guide__toggle">
          {collapsed ? '展开 ↓' : '收起 ↑'}
        </span>
      </div>
      {!collapsed && (
        <div className="auth-guide__body">
          <div className="auth-guide__section">
            <div className="auth-guide__section-title">在线调试</div>
            <div className="auth-guide__steps">
              <div className="auth-guide__step">
                <span className="auth-guide__step-num">1</span>
                <span>复制 Bearer Token</span>
                <span className="auth-guide__token">{DEMO_TOKEN}</span>
                <button className="auth-guide__copy-btn" onClick={copyToken}>
                  {copied ? '已复制' : '复制'}
                </button>
              </div>
              <div className="auth-guide__step">
                <span className="auth-guide__step-num">2</span>
                <span>粘贴到右侧「Bearer Token」输入框</span>
              </div>
              <div className="auth-guide__step">
                <span className="auth-guide__step-num">3</span>
                <span>点击「Send API Request」发起调用</span>
              </div>
            </div>
          </div>
          <div className="auth-guide__section">
            <div className="auth-guide__section-title">正式接入（生产环境）</div>
            <div className="auth-guide__steps">
              <div className="auth-guide__step">
                <span className="auth-guide__step-num">1</span>
                <span>前往控制台创建 AccessKey</span>
                <a
                  href="https://console.sensecore.cn/cn-sh-01/iam/Security/access-key"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="auth-guide__link"
                >
                  前往获取 AK/SK &rarr;
                </a>
              </div>
              <div className="auth-guide__step">
                <span className="auth-guide__step-num">2</span>
                <span>使用 AK ID + AK Secret 对请求进行签名</span>
              </div>
              <div className="auth-guide__step">
                <span className="auth-guide__step-num">3</span>
                <span>AK Secret 仅创建时显示，请妥善保存</span>
              </div>
            </div>
          </div>
          <div className="auth-guide__warning">
            &#9888;&#65039; Bearer Token 仅限在线调试，有效期有限，正式项目请使用 AK/SK
          </div>
        </div>
      )}
    </div>
  );
}
