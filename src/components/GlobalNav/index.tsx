import { useState } from 'react';
import { Link, useModel, history } from '@umijs/max';
import './index.scss';

export default function GlobalNav() {
  const { isLoggedIn, logout } = useModel('global');
  const [docDropdownOpen, setDocDropdownOpen] = useState(false);

  return (
    <header className="global-nav">
      <div className="global-nav__inner">
        <div className="global-nav__left">
          <Link to="/" className="global-nav__brand">
            <div className="global-nav__logo-icon">
              <span className="global-nav__logo-dot global-nav__logo-dot--blue" />
              <span className="global-nav__logo-dot global-nav__logo-dot--green" />
              <span className="global-nav__logo-dot global-nav__logo-dot--orange" />
              <span className="global-nav__logo-dot global-nav__logo-dot--purple" />
            </div>
            <span className="global-nav__logo-title">SenseCore</span>
          </Link>
          <span className="global-nav__region">中国上海一区</span>
        </div>

        <div className="global-nav__right">
          <span className="global-nav__link">官网</span>
          <span className="global-nav__link">费用</span>
          <div
            className="global-nav__doc-menu"
            onMouseEnter={() => setDocDropdownOpen(true)}
            onMouseLeave={() => setDocDropdownOpen(false)}
          >
            <span className="global-nav__link global-nav__link--doc">
              文档 <span className="global-nav__arrow">▾</span>
            </span>
            {docDropdownOpen && (
              <div className="global-nav__dropdown">
                <a
                  className="global-nav__dropdown-item"
                  href="https://console.sensecore.cn/cn-sh-01/help"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  文档中心
                </a>
                <span
                  className="global-nav__dropdown-item global-nav__dropdown-item--active"
                  onClick={() => { history.push('/api-explorer'); setDocDropdownOpen(false); }}
                >
                  API Explorer
                </span>
                <span className="global-nav__dropdown-item global-nav__dropdown-item--disabled">
                  统一命令行
                </span>
              </div>
            )}
          </div>

          <div className="global-nav__divider" />

          {isLoggedIn ? (
            <div className="global-nav__user">
              <span className="global-nav__avatar-circle">U</span>
              <span className="global-nav__logout" onClick={logout}>退出</span>
            </div>
          ) : (
            <button
              className="global-nav__login-btn"
              onClick={() => history.push('/login')}
            >
              登录
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
