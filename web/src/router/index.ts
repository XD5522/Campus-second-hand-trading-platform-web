import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
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
    component: () => import('../views/AdminMain.vue')
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
    component:()=> import('@/views/User_Zone/User_Zone.vue')
  },
  {
    path: '/search',
    name: 'search',
    component:()=> import('@/views/search/Index.vue'),
    meta: {
      hideNavbar: true
    }
  },
  {
    path: '/product',
    name: 'product',
    component:()=> import('@/views/product/Index.vue'),
    meta: {
      hideNavbar: true
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
    component:()=>import('@/views/Comment/Comment.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
