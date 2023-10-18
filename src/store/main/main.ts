import { defineStore } from "pinia";
import { getEntireDepartment, getEntireRoles } from "@/service/main/main";
import type { IMainState } from "@/types/main/main";

const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    language: false
  }),
  actions: {
    async fetchEntireData() {
      const entireRoleResult = await getEntireRoles();
      const entireDepartmentResult = await getEntireDepartment();
      this.entireRoles = entireRoleResult.data.list;
      this.entireDepartments = entireDepartmentResult.data.list;
    },
    switchLanguage() {
      this.language = !this.language;
    }
  }
});

export default useMainStore;
