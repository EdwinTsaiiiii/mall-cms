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
    <!--点击折叠-->
    <div class="menu-icon">
      <el-icon size="24px" @click="handleIconMenusClick">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <!--面包屑-->
      <div class="breadcrumb">
        <HeaderCrumb />
      </div>
      <!--其他信息-->
      <div class="headerInfo">
        <HeaderInfo />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
:global(.el-header) {
  background-color: var(--day-bg-color1);
  transition: var(--day-night-transition);
}

.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  color: var(--day-font-color);
  height: 48px;
  border-bottom: var(--jjext-color-gray-2) 1px solid;
  padding: 0 15px;

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
