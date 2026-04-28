import './index.scss';

interface ConsoleGuideProps {
  onClose: () => void;
}

export default function ConsoleGuide({ onClose }: ConsoleGuideProps) {
  return (
    <div className="console-guide">
      <div className="console-guide__overlay" />
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
