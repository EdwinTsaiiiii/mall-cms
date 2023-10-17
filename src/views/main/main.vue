<script setup lang="ts">
import { ref } from "vue";
import MainMenu from "@/components/main-menu";
import MainHeader from "@/components/main-header";

// 处理折叠效果
const isFold = ref(false);
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag;
};

// 响应式布局：待开发
</script>

<template>
  <div class="main">
    <el-container class="common-layout">
      <el-aside :width="isFold ? '60px' : '210px'">
        <div class="bg">
          <MainMenu :is-fold="isFold" />
        </div>
      </el-aside>
      <el-container>
        <el-header height="48px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.main {
  height: 100%;
  color: var(--day-font-color);
}

.common-layout {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    transition: width 0.6s ease-in-out;
    border-right: 1px var(--day-bg-color3) solid;

    .bg {
      width: 100%;
      height: 100%;
      background-color: var(--day-bg-color1);
      transition: var(--day-night-transition);
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: var(--day-bg-color2);
    transition: var(--day-night-transition);
  }
}
</style>
