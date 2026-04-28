import { Outlet } from '@umijs/max';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import GlobalNav from '@/components/GlobalNav';
import '@/styles/global.scss';
import './index.scss';

export default function Layout() {
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
      </div>
    </ConfigProvider>
  );
}
