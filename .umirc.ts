import { defineConfig } from '@umijs/max';

export default defineConfig({
  title: 'SenseCore API Explorer',
  favicons: ['/favicon.ico'],
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login' },
    { path: '/api-explorer', redirect: '/api-explorer/ecs' },
    { path: '/api-explorer/:product', component: '@/pages/api-explorer/product' },
    { path: '/api-explorer/:product/:endpoint', component: '@/pages/api-explorer/explorer' },
  ],
  antd: { configProvider: {} },
  layout: false,
  model: {},
  initialState: {},
  hash: true,
  history: { type: 'browser' },
});
