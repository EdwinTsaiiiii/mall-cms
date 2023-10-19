import { defineStore } from "pinia";
import type { IAnalysis } from "@/types/main/analysis/analysis";
import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getGoodsAmountList
} from "@/service/main/analysis/dashboard";

const useAnalysisStore = defineStore("analysis", {
  state: (): IAnalysis => ({
    categoryGoodsCount: [],
    categoryGoodsSale: [],
    categoryGoodsFavor: [],
    addressGoodsSale: [],
    goodsAmountList: []
  }),
  actions: {
    // 获取仪表盘所有数据
    async getDashboardData() {
      const categoryCountResult = await getCategoryGoodsCount();
      this.categoryGoodsCount = categoryCountResult.data;
      const categorySaleResult = await getCategoryGoodsSale();
      this.categoryGoodsSale = categorySaleResult.data;
      const categoryFavorResult = await getCategoryGoodsFavor();
      this.categoryGoodsFavor = categoryFavorResult.data;
      const addressSaleResult = await getAddressGoodsSale();
      this.addressGoodsSale = addressSaleResult.data;
      const goodsAmountListResult = await getGoodsAmountList();
      this.goodsAmountList = goodsAmountListResult.data;
    }
  }
});

export default useAnalysisStore;
