<template>
  <div class="nav-header">
    <div class="icon">
      <el-icon class="fold-menu">
        <component :is="isFold ? 'Fold' : 'Expand'" @click="handleFoldClick" />
      </el-icon>
    </div>
    <div class="content">
      <bread-crumb :breadCrumb="breadCrumb"></bread-crumb>
      <user-info></user-info>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import breadCrumb from '@/base-ui/breadcrumb'
import { pathMapToBreadCrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    userInfo,
    breadCrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const store = useStore()
    // 注意面包屑需要根据useMenus和currentPath去匹配计算
    const breadCrumb = computed(() => {
      const useMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapToBreadCrumbs(useMenus, currentPath)
    })
    return {
      isFold,
      handleFoldClick,
      breadCrumb
    }
  }
})
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .icon {
    display: flex;
    align-items: center;
  }
  .fold-menu {
    font-size: 20px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
