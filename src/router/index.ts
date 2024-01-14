import { createRouter, createWebHashHistory } from "vue-router";
import { LOGIN_TOKEN } from "@/global/constant";
import { localCache } from "@/utils/cache";
import { firstRoute, mapMenuToRoute } from "@/utils/map-menu";
// @ts-ignore
import NProgress from "nprogress";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/main.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/not-found/NotFound.vue")
    }
  ]
});

// 添加所有路由到菜单中
export function addRoutesWithMenu(menus: any) {
  // 匹配所有路由信息
  const routes = mapMenuToRoute(menus);
  // 动态添加到router中
  for (const route of routes) {
    router.addRoute("main", route);
  }
}

// 前置导航守卫
router.beforeEach((to) => {
  NProgress.start();
  const token = localCache.getCache(LOGIN_TOKEN);

  if (to.path.startsWith("/main") && !token) {
    return "/login";
  }

  if (to.path === "/main" && firstRoute) {
    return firstRoute.path;
  }
});

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
});

export default router;
