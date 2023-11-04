import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isLogin } from '@/utils'
import store from '@/store'
import { loadMenuData } from '@/api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home',
    name: 'home2',
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
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

/**
 * 请求路由并生成路由
 */
async function loadMenu(to, next) {
  let res = await loadMenuData()
  console.log('路由数据：', res)

  store.commit('setMenu', res.data)
  // ...to新的访问，replace: true替换老的访问
  next({ ...to, replace: true })
}

// let isLogin = false
const whiteList = ['/login', '/register']
// to.path是基础路径，to.fullPath是包含查询字符串参数的
router.beforeEach((to, from, next) => {
  console.log('路由进入...', to.path)
  // 1.排除访问白名单，放行
  if (whiteList.includes(to.path)) return next()

  // 2.验证是否未登录，去登录
  // 2.1验证本地存储是否存在token
  // 2.2如果存在，是否过期
  let token = window.sessionStorage.getItem('token')
  // isLogin()
  if (!isLogin(token)) return next('/login?redirect=' + to.fullPath)

  // console.log(isLogin)
  // if (!isLogin) {
  //   isLogin = true
  //   return next('/login?redirect=' + to.fullPath)
  // }

  // 3.登录过，有路由，就放行

  // 4.没有路由，请求路由，生成菜单
  if (store.getters.getMenu && store.getters.getMenu.length > 0) {
    return next()
  }

  // 生成路由 next, to 产生一次基于新路由的访问
  loadMenu(to, next)
})

export default router
