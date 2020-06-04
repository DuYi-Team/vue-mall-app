import Vue from 'vue';
import { Toast, Dialog } from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import animate from './tools/animate';
import 'lib-flexible';
import './plugins/vant';

Vue.prototype.$api = api;
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$Toast = Toast;
Vue.prototype.$animate = animate;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
