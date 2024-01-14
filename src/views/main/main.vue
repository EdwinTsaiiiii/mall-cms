<script setup lang="ts">
import { onMounted, ref, computed, watch, onUnmounted } from "vue";
import MainMenu from "@/components/main-menu";
import MainHeader from "@/components/main-header";
import Tabs from "@/components/tabs";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.js";

// 语言
import useMainStore from "@/store/main/main";
const mainStore = useMainStore();
const lan = computed(() => {
  return mainStore.language ? 1 : 0;
});

// 处理折叠效果
const isFold = ref<boolean>(false);
const handleFoldChange = () => {
  isFold.value = !isFold.value;
  // 不添加遮罩层的情况
  if (viewportWidth.value >= 900) {
    if (isFold.value) menuWidth.value = 60;
    else menuWidth.value = 210;
  }
  // 在视口宽度<900px情况下点击展开添加遮罩层
  if (viewportWidth.value < 900) {
    if (isFold.value) {
      menuWidth.value = 0;
    } else {
      showShadow.value = true;
      menuWidth.value = 210;
    }
  }
};

// loading
const loading = ref<boolean>(true);
onMounted(() => {
  loading.value = false;
});

// 响应式布局
const viewportWidth = ref<number>(window.visualViewport.width);
const menuWidth = ref<number>(210);

// 侧边栏动态宽度
const menuWidthHandler = () => {
  if (viewportWidth.value >= 1200) {
    menuWidth.value = 210;
    isFold.value = false;
  } else if (viewportWidth.value < 1200 && viewportWidth.value >= 900) {
    menuWidth.value = 60;
    isFold.value = true;
  } else menuWidth.value = 0;
};

// 判断视口
const sizeHandler = () => {
  viewportWidth.value = window.visualViewport.width;
  menuWidthHandler();
};
sizeHandler();
window.addEventListener("resize", sizeHandler);

onUnmounted(() => {
  window.removeEventListener("resize", sizeHandler);
});

// 遮罩层控制
const showShadow = ref<boolean>(false);
const shadowClick = () => {
  showShadow.value = false;
  isFold.value = false;
  menuWidth.value = 0;
};
</script>
<template>
  <div class="main">
    <el-container class="common-layout">
      <!--侧边栏-->
      <el-aside
        :width="menuWidth + 'px'"
        :class="['el-aside', showShadow ? 'shrink' : '']"
      >
        <div class="bg">
          <MainMenu :is-fold="menuWidth === 60 || isFold" />
        </div>
      </el-aside>
      <el-container>
        <!-- 头部-->
        <el-header class="header">
          <main-header @fold-change="handleFoldChange" :is-fold="isFold" />
          <tabs> </tabs>
        </el-header>
        <!--主要部分-->
        <el-main v-loading="loading">
          <el-config-provider :locale="lan ? en : zhCn">
            <router-view v-slot="{ Component }">
              <transition name="slide-fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-config-provider>
        </el-main>
        <!--遮罩层-->
        <div
          :class="showShadow ? 'layout-shadows' : ''"
          @click="shadowClick"
        ></div>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.main {
  height: 100%;
  color: var(--day-font-color);
}
.layout-shadows {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #00000080;
  z-index: 9999990;
}
.shrink {
  z-index: 9999999;
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
