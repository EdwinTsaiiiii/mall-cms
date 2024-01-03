<script setup lang="ts">
import { onMounted, ref } from "vue";
import MainMenu from "@/components/main-menu";
import MainHeader from "@/components/main-header";
import Tabs from "@/components/tabs";

// 处理折叠效果
const isFold = ref<boolean>(false);
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag;
};

// loading
const loading = ref<boolean>(true);
onMounted(() => {
  loading.value = false;
});

// 响应式布局：待开发
</script>

<template>
  <div class="main">
    <el-container class="common-layout">
      <!--侧边栏-->
      <el-aside :width="isFold ? '60px' : '210px'">
        <div class="bg">
          <MainMenu :is-fold="isFold" />
        </div>
      </el-aside>
      <el-container>
        <!-- 头部-->
        <el-header class="header">
          <main-header @fold-change="handleFoldChange" />
          <tabs> </tabs>
        </el-header>
        <!--主要部分-->
        <el-main v-loading="loading">
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <component :is="Component" />
            </transition>
          </router-view>
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

  .header {
    height: 80px;
    padding: 0;
  }
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
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
