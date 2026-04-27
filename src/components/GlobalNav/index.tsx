import './index.scss';

export default function GlobalNav() {
  return (
    <header className="global-nav">
      <div className="global-nav__top-bar" />
      <div className="global-nav__inner">
        {/* Left section */}
        <div className="global-nav__left">
          <button className="global-nav__hamburger" aria-label="菜单">
            <span className="global-nav__hamburger-icon">&#9776;</span>
          </button>

          <div className="global-nav__brand">
            <div className="global-nav__logo-icon">
              <span className="global-nav__logo-dot global-nav__logo-dot--blue" />
              <span className="global-nav__logo-dot global-nav__logo-dot--green" />
              <span className="global-nav__logo-dot global-nav__logo-dot--orange" />
              <span className="global-nav__logo-dot global-nav__logo-dot--purple" />
            </div>
            <div className="global-nav__logo-text">
              <span className="global-nav__logo-title">大装置</span>
              <span className="global-nav__logo-sub">sensecore</span>
            </div>
          </div>

          <div className="global-nav__divider" />

          <button className="global-nav__region">
            中国上海一区 <span className="global-nav__region-arrow">&#9662;</span>
          </button>
        </div>

        {/* Middle section */}
        <div className="global-nav__center">
          <div className="global-nav__announcement">
            <span className="global-nav__announcement-icon">&#128226;</span>
            <span className="global-nav__announcement-text">
              体验 ModelStudio，助力大模型落地
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="global-nav__right">
          <nav className="global-nav__links">
            <span className="global-nav__link">官网</span>
            <span className="global-nav__link">费用</span>
            <span className="global-nav__link">资源</span>
            <span className="global-nav__link">用户</span>
            <span className="global-nav__link">文档</span>
          </nav>

          <div className="global-nav__divider" />

          <div className="global-nav__icons">
            <span className="global-nav__icon-btn" title="搜索">&#128269;</span>
            <span className="global-nav__icon-btn" title="帮助">&#10067;</span>
            <span className="global-nav__icon-btn" title="通知">&#128276;</span>
            <span className="global-nav__icon-btn" title="语言">&#127760;</span>
          </div>

          <div className="global-nav__divider" />

          <div className="global-nav__avatar">
            <span className="global-nav__avatar-circle">&#128100;</span>
          </div>
        </div>
      </div>
    </header>
  );
}
