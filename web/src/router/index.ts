import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import {getAdminToken, getToken} from "@/api/cookie";

const routes: Array<RouteRecordRaw> = [
  {//首页
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {//管理员登陆界面
    path: '/AdminLogin',
    name: 'AdminLogin',
    component: () => import('../views/AdminLogin.vue'),
    meta: {
      hideNavbar: true //隐藏导航栏
    }
  },
  {//管理员主界面
    path: '/AdminMain',
    name : 'AdminMain',
    component: () => import('../views/Admin_Main/AdminMain.vue'),
    meta: {
      hideNavbar: true
    },
    children: [
      {
        path: 'main',
        name: 'main',
        component:()=> import('../views/Admin_Main/components/Main.vue')
      },
      {
        path: 'userAudit',
        name: 'userAudit',
        component:()=> import('../views/Admin_Main/components/User_Audit.vue')
      },
      {
        path: 'merchantAudit',
        name: 'MerchantAudit',
        component:()=> import('../views/Admin_Main/components/Merchant_Audit.vue')
      },
      {
        path: 'goodsAudit',
        name: 'GoodsAudit',
        component:()=> import('../views/Admin_Main/components/Goods_Audit.vue')
      },
      {
        path: 'user',
        name: 'user',
        component:()=> import('../views/Admin_Main/components/User.vue')
      },
      {
        path: 'goods',
        name: 'goods',
        component:()=> import('../views/Admin_Main/components/Product.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        component:()=> import('../views/Admin_Main/components/Setting.vue')
      }
    ]
  },
  {//功能测试页面
    path: '/test',
    name: 'test',
    component: () => import('../views/ModalTest/test.vue'),
    meta: {
      hideNavbar: true //隐藏导航栏
    }
  },
  {//用户登陆界面
    path: '/userlogin',
    name: 'userlogin',
    component:()=> import('../views/UserLogin.vue'),
    meta: {
      hideNavbar: true
    }
  },
  {//用户注册界面
    path: '/userregister',
    name: 'userregister',
    component:()=> import('../views/User_Register/User_Register.vue'),
    meta: {
      hideNavbar: true
    }
  },
  {//用户个人中心
    path: '/userzone',
    name: 'userzone',
    component:()=> import('@/views/Zone/User_Zone.vue')
  },
  {
    path: '/search',
    name: 'search',
    component:()=> import('@/views/search/Index.vue'),
    meta: {
      hideNavbar: false
    }
  },
  {
    path: '/product',
    name: 'product',
    component:()=> import('@/views/product/Index.vue'),
    meta: {
      hideNavbar: false
    }
  },
  {
    path: '/car',
    name: 'car',
    component:()=> import('@/views/car/Index.vue'),
    meta: {
      hideNavbar: false
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component:()=> import('@/views/pay/Index.vue'),
    meta: {
      hideNavbar: false
    }
  },
  {
    path: '/wallet',
    name: 'wallet',
    component:()=> import('@/views/wallet/Index.vue'),
    meta: {
      hideNavbar: false
    }
  },

  {//历史订单页面
    path: '/history',
    name: 'history',
    component:()=> import('@/views/Order_History/History.vue')
  },
  {//评论中心页面
    path: '/comment',
    name: 'comment',
    component:()=>import('@/views/Comment/index.vue')
  },
  {//交易中心页面
    path: '/trading',
    name: 'trading',
    component:()=>import('@/views/Trading/Trading.vue')
  },
  {
    path: '/changeUserMsg',
    name: 'changeUserMsg',
    component:()=>import('@/views/ChangeUserMsg/ChangeUserMsg.vue')
  },
  {
    path:'/order',
    name:'order',
    component:()=>import('@/views/Order/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(from)
//   if(to.path == '/' || to.path == '/userlogin' || to.path == '/AdminLogin' || to.path == '/userregister') {
//     next()
//   }
//   else if(to.path == '/AdminMain/main' || to.path == '/AdminMain') {
//     const token: string | boolean = getAdminToken()
//     if(!token) {
//       next('/AdminLogin')
//     }
//     else {
//       next()
//     }
//   }
//   else {
//     const token: string | boolean = getToken()
//     if(!token) {
//       next('/userlogin')
//     }
//     else {
//       next()
//     }
//   }
// })

export default router
