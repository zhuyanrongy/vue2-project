import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Index.vue'
import Login from '@/views/login/Index.vue'
import Home from '@/views/layout/home/Index.vue'
//点击跳转同一个路径 NavigationDuplicated: Avoided redundant navigation to current location: "/order/list".
// 在VueRouter上配置路由跳转，在router中的index.js中加上以下代码，注意加在use之前
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => { })
};
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    component: Login
  }
]
export let baseRoutes = [{
  path: '/',
  component: Layout,
  meta: {
    name: '首页',
    isLogin: true
  },
  children: [
    {
      path: '/',
      component: Home,
      name: 'home',
      meta: {
        name: '首页'
      },
    },
  ]
}]

/* const router = new VueRouter({
  routes
}) */
const createRouter = () => new VueRouter({
  mode: 'history',
  routes
})
const router = createRouter()
function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

import store from '@/store/index'
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0 || to.matched.some(item => item.meta.isLogin)) {
    if (store.state.login.userInfo.token) {
      if (store.state.menu.menuInfoList.length != 0) {
        next();
      } else {
        store.dispatch('menu/getMenuInfoList', store.state.login.userInfo.token).then((val) => {
          resetRouter()
          val.forEach(item => {
            router.addRoute(item)
          })
        })
        next()
      }
    } else {
      next({ path: '/login', })
    }
  } else {
    next()
  }
})
export default router