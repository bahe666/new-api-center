import { defineConfig } from '@umijs/max';

export default defineConfig({
  title: 'SenseCore API 中心',
  favicons: ['/favicon.ico'],
  routes: [
    { path: '/', redirect: '/apis/ecs' },
    { path: '/apis/:product', component: '@/pages/apis/product' },
    { path: '/apis/:product/:endpoint', component: '@/pages/apis/endpoint' },
  ],
  antd: { configProvider: {} },
  layout: false,
  model: {},
  initialState: {},
  hash: true,
  history: { type: 'browser' },
});
