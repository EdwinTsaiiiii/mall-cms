import { defineStore } from "pinia";
import {
  getEntireDepartment,
  getEntireRoles,
  getMenuData
} from "@/service/main/main";
import type { IMainState } from "@/types/main/main";

const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],
    language: false
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
