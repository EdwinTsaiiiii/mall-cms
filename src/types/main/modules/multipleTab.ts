// 多标签页状态

export interface MultipleTabState {
  cacheTabList: Set<string>; // 缓存标签页路由名称
  // 标签页路由列表   RouteLocationNormalized  标准化的路由地址
  tabList: any[];
  activeName: string;
}
