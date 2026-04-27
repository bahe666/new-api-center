import { Link, useLocation, useModel } from '@umijs/max';
import './index.scss';

export default function GlobalNav() {
  const location = useLocation();
  const { setGuideOpen } = useModel('global');

  return (
    <header className="global-nav">
      <div className="global-nav__inner">
        <div className="global-nav__left">
          <Link to="/apis/ecs" className="global-nav__brand">
            <div className="global-nav__logo">SC</div>
            <span className="global-nav__title">SenseCore API</span>
          </Link>
          <nav className="global-nav__links">
            <Link
              to="/apis/ecs"
              className={`global-nav__link${location.pathname.startsWith('/apis') ? ' global-nav__link--active' : ''}`}
            >
              API 目录
            </Link>
          </nav>
        </div>

        <div className="global-nav__right">
          <button
            className={`global-nav__guide-btn${!localStorage.getItem('sensecore-guide-seen') ? ' global-nav__guide-btn--highlight' : ''}`}
            onClick={() => setGuideOpen(true)}
            title="新手指引"
          >
            <span className="global-nav__guide-btn-icon">?</span>
            <span className="global-nav__guide-btn-text">新手指引</span>
          </button>

          <a
            className="global-nav__console-btn"
            href="https://console.sensecore.cn"
            target="_blank"
            rel="noopener noreferrer"
          >
            控制台
          </a>
        </div>
      </div>
    </header>
  );
}
