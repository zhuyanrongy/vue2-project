import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $api from '@/api/index.js'
Vue.prototype.$api = $api
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  },
  render: h => h(App)
}).$mount('#app')
