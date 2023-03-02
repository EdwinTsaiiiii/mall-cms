<template>
  <div class="user">
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      ></page-search>
    </div>
    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
        <template #status="scope">
          <el-tag
            class="ml-2"
            :type="scope.row.enable === 1 ? 'success' : 'danger'"
          >
            {{ scope.row.enable === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </page-content>
      <div class="page-model">
        <page-modal
          ref="pageModalRef"
          pageName="users"
          :modalConfig="modalConfigComputed"
          :defaultInfo="defaultInfo"
        ></page-modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
  name: 'users',
  components: {
    pageSearch,
    pageContent,
    pageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const store = useStore()

    // pageModal相关的hook逻辑
    // 处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 动态添加部门和角色列表
    // 注意这里需要考虑异步的问题，请求还未完成响应，下面的代码已经执行了
    // 采用computed的方式解决，配置一发生改变，则立即执行computed中的回调函数
    const modalConfigComputed = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })
    // 调用hook获取公共的变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)
    return {
      modalConfig,
      searchFormConfig,
      pageContentRef,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modalConfigComputed
    }
  }
})
</script>

<style scoped>
.content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
