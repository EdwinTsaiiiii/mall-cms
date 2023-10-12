import MyRequest from "../";
import type { IAccount } from "@/types/login";

/**
 * 用户账号密码登录
 * @param account 账号密码
 */
export function accountLoginRequest(account: IAccount) {
  return MyRequest.post({
    url: "/login",
    data: account
  });
}

/**
 * 根据Id用户信息
 * @param id 用户ID
 */
export function getUserInfoById(id: number) {
  return MyRequest.get({
    url: `/users/${id}`
  });
}

/**
 * 根据roleID获取菜单列表
 * @param id roleID
 */
export function getUserMenusByRoleId(id: number) {
  return MyRequest.get({
    url: `/role/${id}/menu`
  });
}
