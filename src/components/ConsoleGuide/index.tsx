import { useEffect, useState } from 'react';
import './index.scss';

interface ConsoleGuideProps {
  onClose: () => void;
}

export default function ConsoleGuide({ onClose }: ConsoleGuideProps) {
  const [spotlightRect, setSpotlightRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const docMenu = document.querySelector('.global-nav__doc-menu') || document.querySelector('.global-nav__link--doc');
      if (docMenu) {
        const rect = docMenu.getBoundingClientRect();
        setSpotlightRect({
          top: rect.top - 4,
          left: rect.left - 6,
          width: rect.width + 12,
          height: rect.height + 8,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="console-guide">
      {spotlightRect && (
        <div
          className="console-guide__spotlight"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
          }}
        />
      )}
      {!spotlightRect && <div className="console-guide__overlay" />}
      <div className="console-guide__tooltip">
        <div className="console-guide__arrow" />
        <div className="console-guide__title">🎉 API 中心全新升级</div>
        <div className="console-guide__text">
          API Explorer 已迁移至导航栏「<strong>文档</strong>」菜单下。
          <br />
          点击「文档 &gt; API Explorer」即可在线调试所有云服务 API。
        </div>
        <div className="console-guide__actions">
          <button className="console-guide__btn" onClick={onClose}>
            知道了
          </button>
        </div>
      </div>
    </div>
  );
}
