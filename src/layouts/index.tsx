import { Outlet, useModel } from '@umijs/max';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useEffect, useState } from 'react';
import GlobalNav from '@/components/GlobalNav';
import OnboardingGuide from '@/components/OnboardingGuide';
import '@/styles/global.scss';
import './index.scss';

export default function Layout() {
  const { setGuideOpen } = useModel('global');
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('sensecore-guide-seen')) {
      setShowPulse(true);
    }
  }, []);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{ token: { colorPrimary: '#4361ee', borderRadius: 8 } }}
    >
      <div className="app-layout">
        <GlobalNav />
        <main className="app-main">
          <Outlet />
        </main>
        <OnboardingGuide />
        <button
          className={`guide-fab${showPulse ? ' guide-fab--pulse' : ''}`}
          onClick={() => setGuideOpen(true)}
          title="新手指引"
        >
          ?
        </button>
      </div>
    </ConfigProvider>
  );
}
