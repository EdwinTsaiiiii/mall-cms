<template>
  <div class="role">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>
    <div class="content">
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="role"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></page-content>
    </div>
    <div class="page-model">
      <page-modal
        ref="pageModalRef"
        pageName="role"
        :modalConfig="modalConfig"
        :defaultInfo="defaultInfo"
        :otherInfo="otherInfo"
      >
        <div class="menu-tree">
          <el-tree
            ref="elTreeRef"
            :data="menus"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheckchange"
          />
        </div>
      </page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
import { mapMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleCheckchange = (data1: any, data2: any) => {
      const checkKeys = data2.checkedKeys
      const handleCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkKeys, ...handleCheckedKeys]
      otherInfo.value = { menuList }
    }
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 处理pageModal的Hook,接收Hook传出来的参数
    const editCallback = (item: any) => {
      const leafKeys = mapMenuLeafKeys(item.menuList)
      // 注意在进入回调函数的时候，ELTree还未来得及绑定
      // 所以需要采用nextTick,在ElTree DOM进行更新后，再执行该回调
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckchange,
      elTreeRef
    }
  }
})
</script>

<style scoped>
.content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
.menu-tree {
  margin-left: 20px;
}
</style>
