import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import '@/assets/css/normalize.css';
import '@/assets/css/global.css';
import 'element-ui/lib/theme-chalk/index.css';

import '@/components'
import bindProps from '@/plugin'
Vue.use(bindProps)

import directives from '@/directives'
Vue.use(directives)

import filters from '@/filters'
Vue.use(filters)

Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 处理未捕获的异步异常【不建议真实开发使用】
// window.onunhandledrejection = function(e){
//   e.preventDefault();
//   return false;
// }
