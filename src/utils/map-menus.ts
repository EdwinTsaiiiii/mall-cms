import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去默认加载所有routes
  const allRoutes: RouteRecordRaw[] = []
  const files: any = import.meta.glob('../router/main/**/*.ts', { eager: true })
  Object.keys(files).forEach((key) => {
    const route = files[key].default
    allRoutes.push(route)
  })

  // 2.根据菜单去添加需要获取routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 等于2时才有映射关系
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        // 没有的话才递归往下找
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  console.log(routes)
  return routes
}
