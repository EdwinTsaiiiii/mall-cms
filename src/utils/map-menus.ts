import { IBreadCrumb } from '../base-ui/breadcrumb'
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
  return routes
}

export function pathMapToBreadCrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadCrumb[] = []
  mapMenusToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// /main/system/role  -> type === 2 对应menu
export function mapMenusToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadCrumb[]
) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapMenusToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: menu.url })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return breadcrumbs
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermission(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPerimission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPerimission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPerimission(userMenus)
  return permissions
}

export function mapMenuLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  // 递归寻找叶子节点
  const _recurseGetLeaf = (menuList:any[]) => {
   for(const menu of menuList){
    if(menu.children){
      _recurseGetLeaf(menu.children)
    }else{
      leftKeys.push(menu.id)
    }
   }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}
