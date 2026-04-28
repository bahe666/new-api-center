import { useState } from 'react';
import { useModel, history, useSearchParams } from '@umijs/max';
import './login.scss';

export default function LoginPage() {
  const { login } = useModel('global');
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    const returnUrl = searchParams.get('returnUrl') || '/api-explorer';
    history.push(returnUrl);
  };

  return (
    <div className="login-page">
      <form className="login-page__card" onSubmit={handleSubmit}>
        <div className="login-page__header">
          <h1 className="login-page__title">登录 SenseCore</h1>
          <p className="login-page__subtitle">登录后即可使用 API 在线调试功能</p>
        </div>

        <div className="login-page__field">
          <label className="login-page__label">用户名 / 邮箱</label>
          <input
            className="login-page__input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="输入任意内容"
          />
        </div>

        <div className="login-page__field">
          <label className="login-page__label">密码</label>
          <input
            className="login-page__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入任意内容"
          />
        </div>

        <button type="submit" className="login-page__submit">
          登 录
        </button>

        <p className="login-page__hint">Demo 模式：输入任意内容即可登录</p>
      </form>
    </div>
  );
}
