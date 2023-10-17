import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $api from '@/api/index.js'
import JsonExcel from 'vue-json-excel'
import Breadcrumb from "@/components/Breadcrumb.vue";
import i18n from '@/lang/index.js'
Vue.component('downloadExcel', JsonExcel)
Vue.component('Breadcrumb', Breadcrumb)
Vue.prototype.$api = $api
Vue.config.productionTip = false
Vue.use(ElementUI)
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
new Vue({
  router,
  store,
  i18n,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  },
  render: h => h(App)
}).$mount('#app')
