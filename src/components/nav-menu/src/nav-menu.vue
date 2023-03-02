<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="../../../assets/img/logo.svg" alt="" class="img" />
      <span class="title" v-if="!collapse">Vue3+TS+Vite</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      :unique-opened="true"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <!-- 一级菜单标题 -->
            <template #title>
              <!-- 注：后端返回的icon名为旧版本 -->
              <el-icon><component :is="iconMap[item.id]" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单标题 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 二级菜单，后端返回的第一层item都是1级的，好像也可以不写 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    const router = useRouter()
    // 这个目前想不到更优的方法，直接any
    const iconMap = reactive<any>({
      38: 'Monitor',
      1: 'Setting',
      9: 'Goods',
      41: 'ChatLineRound'
    })
    const handleMenuItemClick = (item: any) => {
      router.push({ path: item.url ?? '/not-found' })
    }
    return {
      userMenus,
      iconMap,
      handleMenuItemClick
    }
  }
})
</script>
<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}

</style>
