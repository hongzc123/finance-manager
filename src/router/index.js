import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isLogin } from '@/utils'
import store from '@/store'
import { loadMenuData } from '@/api'
import Layout from '@/views/Layout/index.vue';
import NotFound from '@/views/404'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
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
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

function asyncRoutesHandler(routes) {
  return routes.map(route => {
    // 处理父级路由
    if (route.component === 'Layout') {
      route.component = Layout;
    } else {
      // 子路由Layout
      // 按步骤告知webpack文件的解析路径，让其将.vue文件转化成js文件的函数
      const filePath = route.component; // (变量的声明会触发webpack文件编译，否则会忽略，最终获得undefined)
      // 懒加载配置
      route.component = () => import(`../views/${filePath}.vue`)
    }
    // 处理子路由
    if (route.children) {
      route.children = asyncRoutesHandler(route.children)
    }

    return route;
  });
}

/**
 * 请求路由并生成路由
 */
async function loadMenu(to, next) {
  let res = await loadMenuData()
  // console.log('路由数据：', res)

  // 存储store
  store.commit('setMenu', res.data)

  // 生成路由，并加入
  const asyncRoutes = asyncRoutesHandler(res.data)
  // console.log(asyncRoutes)

  // 生成路由，并加入
  asyncRoutes.forEach(e => {
    router.addRoute(e)
  })

  // 组件找不到
  router.addRoute({
    path: '*',
    component: NotFound
  })

  // ...to新的访问，replace: true替换老的访问
  next({ ...to, replace: true })
}

// let isLogin = false
const whiteList = ['/login', '/register']
// to.path是基础路径，to.fullPath是包含查询字符串参数的
router.beforeEach((to, from, next) => {
  // console.log('路由进入...', to.path)
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


router.afterEach((to, from) => {
  // 当前匹配的路由
  // console.log('router after to:', to)
  // 改变document.title
  // document.title = to.meta.title || ''

  // 改变documnent.title
  let str = '反诈'
  for (let i = 0; i < to.matched.length; i++) {
    let route = to.matched[i];
    let prev = to.matched[i-1];
    // 如果上个合这个一样则跳过
    if (prev && prev?.meta?.title === route?.meta?.title)continue;

    if (route?.meta?.title) {
      str += '-' + route?.meta?.title
    }
  }
  document.title = str;
})


/**
 * 重置路由
 */
export const resetRoute = () => {
  // router.matcher = createRouter().matcher

  const newRouter = new VueRouter({ routes })
  router.matcher = newRouter.matcher
  console.log('router.matcher', newRouter, router.matcher)
}

export default router
