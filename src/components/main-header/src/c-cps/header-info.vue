<script setup lang="ts">
import { computed, ref } from "vue";
import { localCache } from "@/utils/cache";
import {
  IS_DAY,
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
import useMainStore from "@/store/main/main";

const loginStore = useLoginStore();
const userInfo = loginStore.userInfo;

// 切换日间夜间主题
const isDay = ref(localCache.getCache(IS_DAY) ?? true);
if (isDay.value) document.body.classList.remove("dark");
const handleChangeTheme = () => {
  if (isDay.value) {
    // 日间模式删除类名
    localCache.setCache(IS_DAY, isDay.value);
    document.body.classList.remove("dark");
  } else {
    // 夜间模式添加类名
    localCache.setCache(IS_DAY, isDay.value);
    document.body.classList.add("dark");
  }
};

// 中英切换
const mainStore = useMainStore();
const lan = computed(() => {
  return mainStore.language ? 1 : 0;
});
const handleChangeLanguage = () => {
  mainStore.switchLanguage();
};

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
      <!--主题切换-->
      <span class="switch-day-night">
        <el-switch
          v-model="isDay"
          @change="handleChangeTheme"
          class="mt-2"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
        />
      </span>
      <span>
        <span class="dot"></span>
        <svg
          focusable="false"
          class=""
          data-icon="bell"
          width="1.1em"
          height="1.1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"
          ></path>
        </svg>
      </span>
      <span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <!--中英切换-->
      <span @click="handleChangeLanguage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="1.1em"
          height="1.1em"
          viewBox="0 0 512 512"
          class="iconify iconify--ion"
          :color="lan ? 'var(--el-color-primary)' : ''"
        >
          <path
            fill="currentColor"
            d="m478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4ZM334.83 362L368 281.65L401.17 362Zm-66.99-19.08a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9Z"
          ></path>
        </svg>
      </span>
    </div>
    <!--下拉列表-->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="28" class="avatar" icon="UserFilled" />
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
    <div class="setting">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1.1em"
        height="1.1em"
        viewBox="0 0 512 512"
        class="iconify iconify--ion"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4ZM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}
.setting {
  display: inline-flex;
  margin-left: 15px;
}
.operation {
  display: inline-flex;
  margin-right: 10px;

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
  @media (max-width: 500px) {
    .name {
      display: none;
    }
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
