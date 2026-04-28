import { useState } from 'react';
import ConsoleGuide from '@/components/ConsoleGuide';
import './index.scss';

export default function ConsoleHome() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="console-home">
      <div className="console-home__placeholder">
        <div className="console-home__icon">🖥️</div>
        <div className="console-home__title">SenseCore 控制台</div>
        <div className="console-home__subtitle">请通过导航栏「文档 &gt; API Explorer」进入 API 调试台</div>
      </div>
      {showGuide && <ConsoleGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
}
