<script setup lang="ts">
import { defineProps, computed } from "vue";
import BaseEchart from "@/base-ui/echart";
import { IDataType } from "../types";

const props = defineProps<{
  pieData: IDataType[];
}>();

// 采用computed保证上面的视图会随着传入数据的变化而重新渲染
const options: any = computed(() => {
  return {
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "horizontal",
      left: "left"
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
});
</script>

<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<style scoped lang="less"></style>
