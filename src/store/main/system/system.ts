import { defineStore } from "pinia";
import type { ISystemState } from "@/types/main/system/system";
import {
  deletePageData,
  editPageData,
  getPageListData,
  newPageData
} from "@/service/main/system/system";

const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    totalCount: 0,
    list: []
  }),
  actions: {
    // 通用操作 获取列表
    async getDataListAction(pageName: string, queryInfo: any) {
      const result = await getPageListData(pageName, queryInfo);
      if (result.code !== 1) ElMessage.error(result.msg);
      const { totalCount, list } = result.data;
      this.totalCount = totalCount;
      this.list = list;
    },

    // 创建
    async newPageDataAction(pageName: string, userInfo: any) {
      const result = await newPageData(pageName, userInfo);
      if (result.code === 1) {
        ElMessage.success("创建成功");
      } else {
        ElMessage.error(result.msg);
      }
      // 请求新的数据
      this.getDataListAction(pageName, { offset: 0, size: 10 });
    },

    // 删除
    async deletePageDataAction(pageName: string, id: number) {
      const result = await deletePageData(pageName, id);
      if (result.code === 1) {
        ElMessage.success("删除成功");
      } else {
        ElMessage.error(result.msg);
      }
      this.getDataListAction(pageName, { offset: 0, size: 10 });
    },

    // 编辑
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      const result = await editPageData(pageName, id, userInfo);
      if (result.code === 1) {
        ElMessage.success("修改成功");
      } else {
        ElMessage.error(result.msg);
      }
      this.getDataListAction(pageName, { offset: 0, size: 10 });
    },

    // 清空数据
    resetData() {
      this.list = [];
      this.totalCount = 0;
    }
  }
});
export default useSystemStore;
