import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogView from '../views/BlogView.vue';
import ShopView from '../views/ShopView.vue';
//import { name } from '@vue/eslint-config-prettier/skip-formatting';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView,
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopView,
    children: [
      {
        path: 'checkout', // Pridaná "podstránka" pre CheckoutForm
        name: 'checkout',
        component: () => import('../components/CheckoutForm.vue'), // Dynamický import CheckoutForm
      },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
