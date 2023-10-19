<script setup lang="ts">
import useAnalysisStore from "@/store/main/analysis/analysis";
import { PlotCard, NumberCard } from "@/base-ui/card";
import CountTo from "@/components/count-to";
import { computed } from "vue";

const store = useAnalysisStore();

// 获取数据
store.getDashboardData();

const categoryGoodsCount = computed(() => {
  return store.categoryGoodsCount.map((item: any) => {
    return { name: item.name, value: item.goodsCount };
  });
});

const categoryGoodsSale = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];
  const categoryGoodsSale = store.categoryGoodsSale;
  for (const item of categoryGoodsSale) {
    xLabels.push(item.name);
    values.push(item.goodsSale);
  }
  return { xLabels, values };
});

const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];
  const categoryGoodsFavor = store.categoryGoodsFavor;
  for (const item of categoryGoodsFavor) {
    xLabels.push(item.name);
    values.push(item.goodsFavor);
  }
  return { xLabels, values };
});

const addressGoodsSale = computed(() => {
  return store.addressGoodsSale.map((item: any) => {
    return { name: item.address, value: item.count };
  });
});

const goodsAmountList = computed(() => store.goodsAmountList);
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in goodsAmountList" :key="item.title">
        <el-col :span="6">
          <number-card
            :title="item.title"
            :subtitle="item.subtitle"
            :tip="item.tip"
          >
            <template #default>
              <count-to :startVal="1" :endVal="item.number1"></count-to>
            </template>
          </number-card>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="7">
        <plot-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </plot-card>
      </el-col>
      <el-col :span="10">
        <plot-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </plot-card>
      </el-col>
      <el-col :span="7">
        <plot-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </plot-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <plot-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </plot-card>
      </el-col>
      <el-col :span="12">
        <plot-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </plot-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
