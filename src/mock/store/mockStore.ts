import { defineStore } from "pinia";
import type { IMockDataList } from "@/mock/types/types";
import { reqMockDataList } from "@/mock/service/mockRequest";

export const useMockStore = defineStore("mock", {
  state: (): IMockDataList => ({
    IMockDataList: []
  }),
  actions: {
    async reqMockDataList() {
      const result = await reqMockDataList();
      this.IMockDataList = result.data.data;
    }
  }
});
