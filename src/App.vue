<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.js";
import { computed } from "vue";
import useMainStore from "@/store/main/main";
const mainStore = useMainStore();
const lan = computed(() => {
  return mainStore.language ? 1 : 0;
});
</script>

<template>
  <div class="app">
    <el-config-provider :locale="lan ? en : zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
}
</style>
