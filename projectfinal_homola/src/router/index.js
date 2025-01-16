import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ArticlesView from '../views/ArticlesView.vue';
import ShopView from '../views/ShopView.vue';
import SettingsView from '@/views/SettingsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticlesView,
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopView,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
