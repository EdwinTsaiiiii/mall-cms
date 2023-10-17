<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";

import { computed, ref, toRaw } from "vue";
import useMainStore from "@/store/main/main";
import { storeToRefs } from "pinia";

// 计算属性，将初始化option传入配置
const modalConfigRef = computed(() => {
  const mainStore = useMainStore();
  let { entireRoles, entireDepartments } = storeToRefs(mainStore);
  entireRoles = toRaw(entireRoles.value) as any;
  entireDepartments = toRaw(entireDepartments.value) as any;
  modalConfig.formItems.forEach((item) => {
    if (item.prop === "roleId" && entireRoles.length) {
      item.options = [...entireRoles];
    }
    if (item.prop === "departmentId" && entireDepartments.length) {
      item.options = [...entireDepartments];
    }
  });
  return modalConfig;
});

// search中的查询查询和重置，需要调用到content中的方法
const contentRef = ref<InstanceType<typeof PageContent>>();
const handleQueryClick = (searchInfo: any) => {
  contentRef.value?.fetchUserListData(searchInfo);
};
const handleResetClick = () => {
  contentRef.value?.handleResetClick();
};

// modal框是用来新建还是编辑
const modalRef = ref<InstanceType<typeof PageModal>>();
const handleNewDataClick = () => {
  modalRef.value?.setDialogVisible();
};
const handleEditDataClick = (data: any) => {
  modalRef.value?.setDialogVisible(false, data);
};
</script>

<template>
  <!-- 1.搜索区域 -->
  <pageSearch
    :search-config="searchConfig"
    @query-click="handleQueryClick"
    @reset-click="handleResetClick"
  />

  <!-- 2.展示区域 -->
  <pageContent
    :content-config="contentConfig"
    @new-data-click="handleNewDataClick"
    @edit-data-click="handleEditDataClick"
    ref="contentRef"
  >
    <template #status="scope">
      <el-tag
        class="ml-2"
        :type="scope.row.enable === 1 ? 'success' : 'danger'"
      >
        {{ scope.row.enable === 1 ? "启用/on" : "禁用/off" }}
      </el-tag>
    </template>
  </pageContent>

  <!-- 3.新建和编辑 -->
  <page-modal ref="modalRef" :modal-config-ref="modalConfigRef" />
</template>

<style scoped lang="less"></style>
