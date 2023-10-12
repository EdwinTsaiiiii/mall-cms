<script setup lang="ts">
import { useRoute } from "vue-router";
import useLoginStore from "@/store/login/login";
import { mapPathToBreadCrumbs } from "@/utils/map-menu";
import { computed } from "vue";

const breadcrumb = computed(() => {
  const route = useRoute();
  const loginStore = useLoginStore();
  console.log(mapPathToBreadCrumbs(loginStore.userMenus, route.path));
  return mapPathToBreadCrumbs(loginStore.userMenus, route.path);
});
</script>

<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumb" :key="item.name">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped lang="less"></style>
