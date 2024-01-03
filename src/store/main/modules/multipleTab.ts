import { defineStore } from "pinia";
import type { MultipleTabState } from "@/types/main/modules/multipleTab";
import router from "@/router";
import { localCache } from "@/utils/cache";
import { TABS_ACTIVES, TABS_LIST } from "@/global/constant";

interface simpleRoute {
  id: number;
  name: string;
  url: string;
}

// 多标签的仓库
const useMultipleTabStore = defineStore("multipleTab", {
  state: (): MultipleTabState => ({
    cacheTabList: new Set(),
    tabList: localCache.getCache(TABS_LIST) ?? [
      { id: 62, name: "分析表", url: "/main/analysis/dashboard" }
    ],
    activeName: localCache.getCache(TABS_ACTIVES) ?? "分析表"
  }),
  actions: {
    addTab(route: simpleRoute) {
      this.activeName = route.name;
      // 去重
      const hasTabList = this.getTabList.some((item) => item.id === route.id);
      if (hasTabList) return;
      this.tabList.push(route);
      localCache.setCache(TABS_LIST, this.tabList);
    },
    removeTab(targetName: string) {
      this.tabList = this.tabList.filter((tab) => tab.name !== targetName);
      localCache.setCache(TABS_LIST, this.tabList);
    },
    editActiveName(newActiveName: string) {
      // 改变选择的tabName
      this.activeName = newActiveName;
      // 路由跳转
      const url = this.tabList.filter((tab) => tab.name === newActiveName)[0]
        .url;
      router.push(url);
      localCache.setCache(TABS_ACTIVES, this.activeName);
    }
  },
  getters: {
    // 获取标签页路由列表
    getTabList(): any[] {
      return this.tabList;
    },
    // 获取缓存标签页路由名称列表
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList);
    },
    // 获取当前标签名
    getActiveName(): string {
      return this.activeName;
    }
  }
});

export default useMultipleTabStore;
