import { defineStore } from "pinia";
import type { ISystemState } from "@/types/main/system/system";
import {
  deletePageData,
  deleteUserData,
  editPageData,
  editUserData,
  getPageListData,
  getUserListData,
  newPageData,
  newUserData
} from "@/service/main/system/system";

const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    totalCount: 0,
    list: []
  }),
  actions: {
    // 获取用户列表
    async getUserListDataAction(queryInfo: any) {
      const result = await getUserListData(queryInfo);
      if (result.code !== 1) ElMessage.error(result.msg);
      const { totalCount, list } = result.data;
      this.totalCount = totalCount;
      this.list = list;
    },

    // 创建用户
    async newUserDataAction(userInfo: any) {
      const result = await newUserData(userInfo);
      if (result.code === 1) {
        ElMessage.success("创建成功");
      } else {
        ElMessage.error(result.msg);
      }
      // 请求新的数据
      this.getUserListDataAction({ offset: 0, size: 10 });
    },

    // 删除用户
    async deleteUserDataAction(id: number) {
      const result = await deleteUserData(id);
      if (result.code === 1) {
        ElMessage.success("删除成功");
      } else {
        ElMessage.error(result.msg);
      }
      this.getUserListDataAction({ offset: 0, size: 10 });
    },

    // 编辑用户
    async editUserDataAction(id: number, userInfo: any) {
      const result = await editUserData(id, userInfo);
      if (result.code === 1) {
        ElMessage.success("修改成功");
      } else {
        ElMessage.error(result.msg);
      }
      this.getUserListDataAction({ offset: 0, size: 10 });
    },

    // 通用操作
    async getDataListAction(pageName: string, queryInfo: any) {
      const result = await getPageListData(pageName, queryInfo);
      if (result.code !== 1) ElMessage.error(result.msg);
      const { totalCount, list } = result.data;
      this.totalCount = totalCount;
      this.list = list;
    },

    // 创建用户
    async newPageDataAction(pageName: string, userInfo: any) {
      const result = await newPageData(pageName, userInfo);
      if (result.code === 1) {
        ElMessage.success("创建成功");
      } else {
        ElMessage.error(result.msg);
      }
      // 请求新的数据
      this.getUserListDataAction({ offset: 0, size: 10 });
    },

    // 删除用户
    async deletePageDataAction(pageName: string, id: number) {
      const result = await deletePageData(pageName, id);
      if (result.code === 1) {
        ElMessage.success("删除成功");
      } else {
        ElMessage.error(result.msg);
      }
      this.getUserListDataAction({ offset: 0, size: 10 });
    },

    // 编辑用户
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      const result = await editPageData(pageName, id, userInfo);
      if (result.code === 1) {
        ElMessage.success("修改成功");
      } else {
        ElMessage.error(result.msg);
      }
      this.getUserListDataAction({ offset: 0, size: 10 });
    }
  }
});
export default useSystemStore;
