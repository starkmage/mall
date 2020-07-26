import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

import { AddressEdit, AddressList } from 'vant';

Vue.use(AddressEdit);
Vue.use(AddressList)

// import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//使用图片懒加载
/* Vue.use(VueLazyLoad, {
  
}) */

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
