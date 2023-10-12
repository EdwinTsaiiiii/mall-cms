<script setup lang="ts">
import { ref, watch } from "vue";
import { localCache } from "@/utils/cache";
import {
  LOGIN_NAME,
  LOGIN_PASSWORD,
  LOGIN_TOKEN,
  PWD_REM,
  USER_INFO,
  USER_MENUS
} from "@/global/constant";
import { useRouter } from "vue-router";
import useLoginStore from "@/store/login/login";
import { Sunny, Moon } from "@element-plus/icons-vue";

const loginStore = useLoginStore();
const userInfo = loginStore.userInfo;

// 切换日间夜间主题
const isDay = ref(true);
watch(isDay, () => {
  if (isDay.value === false) {
    // 夜间模式添加类名
    document.body.classList.add("dark");
  } else {
    // 日间模式删除类名
    document.body.classList.remove("dark");
  }
});

// 中英互换：待开发

// 退出登录操作
const router = useRouter();
const handleLogoutClick = () => {
  // 删除token等信息
  localCache.removeCache(LOGIN_TOKEN);
  localCache.removeCache(USER_MENUS);
  localCache.removeCache(USER_INFO);
  if (!localCache.getCache(PWD_REM)) {
    localCache.removeCache(LOGIN_NAME);
    localCache.removeCache(LOGIN_PASSWORD);
  }
  // 跳回登录页面
  router.push("/login");
};
</script>

<template>
  <div class="header-info">
    <div class="operation">
      <span class="switch-day-night">
        <el-switch
          v-model="isDay"
          class="mt-2"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
        />
      </span>
      <span>
        <svg
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          width="1.25em"
          height="1.25em"
          data-v-12008bb2=""
        >
          <path
            fill="currentColor"
            d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z"
          ></path>
        </svg>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><bell /></el-icon>
      </span>
      <span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30" class="avatar" icon="UserFilled" />
          <span class="name">{{ userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogoutClick">
              <el-icon><CircleCloseFilled /></el-icon>
              退出系统
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  .switch-day-night {
    margin-right: 10px;
  }

  .mt-2:hover {
    filter: var(--color-filter);
  }
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      color: var(--day-main-color);
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: var(--dot-color);
      border-radius: 100%;
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;

  .name {
    margin-left: 8px;
    color: var(--day-font-color);
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
  :global(.el-switch__core) {
    background-color: var(--switch-bg-color);
  }
}
</style>
