// RBAC 角色权限分配

import useLoginStore from "@/store/login/login";

export function usePermission(
  pageName: string,
  handleName: string,
  permissionName: string
): any {
  const store = useLoginStore();
  // @ts-ignore
  const permissions = store.$state.permissions;
  const verifyPermission = `${permissionName}:${pageName}:${handleName}`;
  return !!permissions.find((item) => item === verifyPermission);
}
