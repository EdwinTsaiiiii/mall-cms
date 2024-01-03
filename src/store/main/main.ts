import { defineStore } from "pinia";
import {
  getEntireDepartment,
  getEntireRoles,
  getMenuData
} from "@/service/main/main";
import type { IMainState } from "@/types/main/main";

// 主仓库
const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [], // 所有权限
    entireDepartments: [], // 所有部门
    entireMenus: [], // 所有菜单
    language: false // 语言
  }),
  actions: {
    async fetchEntireData() {
      const entireRoleResult = await getEntireRoles();
      const entireDepartmentResult = await getEntireDepartment();
      const entireMenuResult = await getMenuData();
      this.entireRoles = entireRoleResult.data.list;
      this.entireDepartments = entireDepartmentResult.data.list;
      this.entireMenus = entireMenuResult.data.list;
    },
    switchLanguage() {
      this.language = !this.language;
    }
  }
});

export default useMainStore;
