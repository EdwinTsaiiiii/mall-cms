import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LocalCache from '../utils/cache'
// 1.不同的角色注册不同的路由:
// 登录->userinfo->role.name->动态加载数组->main.routes

// 2.菜单动态生成路由映射
// 菜单-路由映射
// 菜单->url->路由->path->component
// (1)菜单中有就加载组件的名称
// (2)√ 菜单url: 前端代码中： path1->component1 ...

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/main.vue'),
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token')
    if (!token) return '/login'
  }
  // 匹配到的name是not-found:
  // app.use() -> install(){} -> 获取当前path -> router.routes -> not-found -> 注册动态路由routes -> 路由守卫（回调函数）
})

export default router
