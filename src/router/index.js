import Vue from 'vue';
import VueRouter from 'vue-router';
import Classify from '@/views/Classify.vue';
import Search from '@/views/Search.vue';
import Home from '@/views/Home.vue';
import Shopping from '@/views/shopping.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/home/classify',
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'classify',
        name: 'classify',
        component: Classify,
      },
      {
        path: 'shopping',
        name: 'shopping',
        component: Shopping,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
