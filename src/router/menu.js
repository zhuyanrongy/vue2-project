const Product = () => import('@/views/layout/product/Index.vue')
const productClassify = () => import('@/views/layout/product/Classify.vue')
const productList = () => import('@/views/layout/product/List.vue')
const handelProduct = () => import('@/views/layout/product/handelProduct.vue')
const Order = () => import('@/views/layout/order/Index.vue')
const orderCollect = () => import('@/views/layout/order/Collect.vue')
const orderList = () => import('@/views/layout/order/List.vue')
const orderProcess = () => import('@/views/layout/order/Process.vue')
const Advert = () => import('@/views/layout/advert/index.vue')
const AdvertList = () => import('@/views/layout/advert/list.vue')
const System = () => import('@/views/layout/system/Index.vue')
const systemRole = () => import('@/views/layout/system/Role.vue')
const systemUser = () => import('@/views/layout/system/User.vue')
export let frontMenu = [
    {
        path: '/product',
        component: Product,
        name: 'product',
        redirect: '/product/list',
        meta: {
            name: '产品管理'
        },
        children: [
            {
                path: 'list',
                component: productList,
                name: 'product-list',
                meta: { keepAlive: true, deepth: 1, name: '产品列表' }
            },
            {
                path: 'classify',
                component: productClassify,
                name: 'product-classify',
                meta: { deepth: 0.5, name: '产品分类' }
            },

            {
                path: 'handel-product',
                component: handelProduct,
                name: 'handel-product',
                meta: { index: "product-list", deepth: 2, name: '添加商品', isHidden: true }
            }
        ]
    },
    {
        path: '/order',
        component: Order,
        name: 'order',
        redirect: '/order/list',
        meta: {
            name: '订单管理'
        },
        children: [
            {
                path: 'list',
                component: orderList,
                name: 'order-list',
                meta: {
                    name: '订单列表'
                },

            },
            {
                path: 'collect',
                component: orderCollect,
                name: 'order-collect',
                meta: {
                    name: '汇总清单'
                },
            },

            {
                path: 'process',
                component: orderProcess,
                name: 'order-process',
                meta: {
                    name: '订单审核'
                },
            }
        ]
    },
    {
        path: '/advert',
        component: Advert,
        name: 'advert',
        redirect: '/advert/list',
        meta: {
            name: '广告分类'
        },
        children: [
            {
                path: 'list',
                component: AdvertList,
                name: 'advert-list',
                meta: {
                    name: '广告列表'
                },
            },
        ]
    },
    {
        path: '/system',
        component: System,
        name: 'system',
        redirect: '/system/list',
        meta: {
            name: '系统管理'
        },
        children: [
            {
                path: 'role',
                component: systemRole,
                name: 'system-role',
                meta: {
                    name: '角色管理'
                }
            },
            {
                path: 'user',
                component: systemUser,
                name: 'system-user',
                meta: {
                    name: '部门管理'
                }
            }
        ]
    }
]
