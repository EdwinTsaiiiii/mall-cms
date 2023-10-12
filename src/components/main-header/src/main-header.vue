<script setup lang="ts">
import { ref } from "vue";
import HeaderInfo from "./c-cps/header-info.vue";
import HeaderCrumb from "./c-cps/header-crumb.vue";

// 内部自定义事件
const emit = defineEmits(["foldChange"]);

// 处理折叠状态
const isFold = ref(false);
const handleIconMenusClick = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
};
</script>

<template>
  <div class="main-header">
    <div class="menu-icon">
      <el-icon size="24px" @click="handleIconMenusClick">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <HeaderCrumb />
      </div>
      <HeaderInfo />
    </div>
  </div>
</template>

<style scoped lang="less">
:global(.el-header) {
  background-color: var(--day-bg-color1);
  transition:
    border-color var(--el-transition-duration),
    background-color var(--el-transition-duration),
    color var(--el-transition-duration);
}

.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  color: var(--day-font-color);

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: var(--day-main-color);
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
