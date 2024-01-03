<script setup lang="ts">
import { useMockStore } from "@/mock/store/mockStore";
import { storeToRefs } from "pinia";

// 取数据
const mockStore = useMockStore();
mockStore.reqMockDataList();
let { IMockDataList } = storeToRefs(mockStore);
</script>

<template>
  <div class="overview">
    <div>虚拟滚动</div>
    <MockItem :dataList="IMockDataList" />
  </div>
</template>

<style scoped lang="less">
.ul-list {
  list-style: none;
  height: 100%;
}
</style>
