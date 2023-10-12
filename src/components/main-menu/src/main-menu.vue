<script setup lang="ts">
import useLoginStore from "@/store/login/login";
import { useRoute, useRouter } from "vue-router";
import { mapPathToMenus } from "@/utils/map-menu";
import { computed } from "vue";

// 定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
});

// 获取动态菜单
const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;

// 默认显示页面（刷新不改变页面）以及点击面包屑menu的active自动变化
const route = useRoute();
const defaultValue = computed(() => {
  const currentMenu = mapPathToMenus(userMenus, route.path);
  return currentMenu.id + "";
});

// 监听item变化
const router = useRouter();
function handleItemClick(item: any) {
  router.push(item.url);
}
</script>

<template>
  <div class="logo">
    <img class="img" src="@/assets/logo.svg" alt="" />
    <h2 class="title" v-show="!isFold">后台管理系统</h2>
  </div>
  <div class="menu">
    <el-menu
      :collapse="isFold"
      :default-active="defaultValue"
      text-color="var(--day-font-color)"
      active-text-color="var(--day-main-color)"
      background-color="var(--day-bg-color1)"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subItem in item.children" :id="subItem.id">
            <el-menu-item
              :index="subItem.id + ''"
              @click="handleItemClick(subItem)"
            >
              {{ subItem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: var(--day-bg-color1);
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: var(--day-font-color);
    white-space: nowrap;
    font-family: "Microsoft YaHei", serif;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: var(--day-bg-color1);
  }

  .el-menu-item:hover {
    color: var(--day-main-color);
  }

  .el-menu-item.is-active {
    color: var(--day-main-color);
    background-color: var(--day-main-color-hover);
  }
}
</style>
