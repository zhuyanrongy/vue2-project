import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Index.vue'
import Login from '@/views/login/Index.vue'
import Home from '@/views/layout/home/Index.vue'
const Product = () => import('@/views/layout/product/Index.vue')
const productClassify = () => import('@/views/layout/product/Classify.vue')
const productList = () => import('@/views/layout/product/List.vue')
const handelProduct = () => import('@/views/layout/product/handelProduct.vue')
const Order = () => import('@/views/layout/order/Index.vue')
const orderCollect = () => import('@/views/layout/order/Collect.vue')
const orderList = () => import('@/views/layout/order/List.vue')
const orderProcess = () => import('@/views/layout/order/Process.vue')
const Advert = () => import('@/views/layout/advert/Index.vue')
const System = () => import('@/views/layout/system/Index.vue')
const systemRole = () => import('@/views/layout/system/Role.vue')
const systemUser = () => import('@/views/layout/system/User.vue')

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home,
        name: 'home'
      },
      {
        path: 'product',
        component: Product,
        children: [
          {
            path: 'classify',
            component: productClassify,
            name: 'product-classify',
            meta: { deepth: 0.5 }
          },
          {
            path: 'list',
            component: productList,
            name: 'List',
            meta: { keepAlive: true, deepth: 1 }
          },
          {
            path: 'handel-product',
            component: handelProduct,
            name: 'handel-product',
            meta: { index: "List", deepth: 2 }
          }
        ]
      },
      {
        path: 'order',
        component: Order,
        children: [
          {
            path: 'collect',
            component: orderCollect,
            name: 'order-collect'
          },
          {
            path: 'list',
            component: orderList,
            name: 'order-list'
          },
          {
            path: 'process',
            component: orderProcess,
            name: 'order-process'
          }
        ]
      },
      {
        path: 'advert',
        component: Advert,
        name: 'advert'
      },
      {
        path: 'system',
        component: System,
        children: [
          {
            path: 'role',
            component: systemRole,
            name: 'system-role'
          },
          {
            path: 'user',
            component: systemUser,
            name: 'system-user'
          }
        ]
      },

    ]
  },
  {
    path: '/login',
    component: Login
  }

]

const router = new VueRouter({
  routes
})

export default router
