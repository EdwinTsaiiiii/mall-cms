import type { RouteRecordRaw } from "vue-router";
import type { IBreadCrumbs } from "@/types/main/main";
import menu from "@/router/main/system/menu/menu";

export let firstRoute: RouteRecordRaw | undefined = undefined;

/**
 * 加载所有模板
 */
function loadLocalRoute(): RouteRecordRaw[] {
  // 加载所有模板
  const modules: Record<string, any> = import.meta.glob(
    "../router/main/**/*.ts",
    { eager: true }
  );
  // 将所有路由转化为对象
  const routes: RouteRecordRaw[] = [];
  for (const key in modules) {
    const route = modules[key].default;
    routes.push(route);
  }
  return routes;
}

/**
 *  映射菜单到路由
 * @param menus 路由
 */
export function mapMenuToRoute(menus: any[]) {
  // 加载所有路由对象
  const localRoutes: RouteRecordRaw[] = loadLocalRoute();
  const finalRoutes: RouteRecordRaw[] = [];
  // 匹配所有层级路由（递归）
  if (menus) {
    function _recurseGetRoute(menus: any[]) {
      for (const menu of menus) {
        if (menu.type === 2) {
          const route = localRoutes.find((item) => item.path === menu.url);
          if (route) finalRoutes.push(route);
          if (!firstRoute && route) firstRoute = route;
        } else {
          if (menu.type === 1 && menu.children.length) {
            finalRoutes.push({
              path: menu.url,
              redirect: menu.children[0].url
            });
          }
          _recurseGetRoute(menu.children ?? []);
        }
      }
    }
    _recurseGetRoute(menus);
  }
  return finalRoutes;
}

/**
 * 映射路由到对应子菜单
 * @param menus 菜单
 * @param path 路径
 */
export function mapPathToMenus(menus: any[], path: string) {
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) return submenu;
    }
  }
}

/**
 * 映射路径到面包屑
 * @param menus 菜单
 * @param path 路径
 */
export function mapPathToBreadCrumbs(
  menus: any[],
  path: string
): IBreadCrumbs[] {
  const breadcrumbs: IBreadCrumbs[] = [];
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url });
        breadcrumbs.push({ name: submenu.name, path: submenu.url });
      }
    }
  }
  return breadcrumbs;
}

/**
 * 映射菜单到id
 * @param menus 菜单
 */
export function mapMenuToIds(menus: any[]) {
  const ids: number[] = [];
  // 递归对树结构进行平坦化
  function _recurseGetId(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetId(menu.children);
      }
      ids.push(menu.id);
    }
  }
  _recurseGetId(menus);
  return ids;
}

/**
 * 映射类型到id
 * @param menus
 */
export function mapTypeToId(menus: any[]) {
  const expendKeys: string[] = [];
  function _recurseGetId(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.children && menu.type == 1) {
        _recurseGetId(menu.children);
      }
      expendKeys.push(menu.id + "");
    }
  }
  _recurseGetId(menus);
  return expendKeys;
}

/**
 * 映射菜单中的权限
 * @param userMenu
 */
export function mapMenusToPermission(userMenu: any[]) {
  const permission: string[] = [];
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permission.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenu);
  return permission;
}
