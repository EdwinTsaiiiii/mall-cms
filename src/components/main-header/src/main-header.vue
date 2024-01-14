<script setup lang="ts">
import { ref } from "vue";
import HeaderInfo from "./c-cps/header-info.vue";
import HeaderCrumb from "./c-cps/header-crumb.vue";

// 内部自定义事件
const emit = defineEmits(["foldChange"]);
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
});

// 处理折叠状态
const handleIconMenusClick = () => {
  emit("foldChange");
};
</script>

<template>
  <div class="main-header">
    <div class="content">
      <div class="left">
        <!--点击折叠-->
        <div class="menu-icon">
          <el-icon size="24px" @click="handleIconMenusClick">
            <component :is="isFold ? 'Expand' : 'Fold'" />
          </el-icon>
        </div>
        <!--面包屑-->
        <div class="breadcrumb">
          <HeaderCrumb />
        </div>
      </div>
      <div class="right">
        <!--其他信息-->
        <div class="headerInfo">
          <HeaderInfo />
        </div>
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
    .left {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .breadcrumb {
        margin-left: 15px;
      }
      @media (max-width: 800px) {
        .breadcrumb {
          display: none;
        }
      }
    }
  }
}
</style>
