<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";

import { computed } from "vue";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";
import useMapOptions from "@/hooks/useMapOptions";
import useSystemStore from "@/store/main/system/system";

// 计算属性，将初始化option传入配置
// 注意这里需要考虑异步的问题，请求还未完成响应，下面的代码已经执行了
// 采用computed的方式解决，配置一发生改变，则立即执行computed中的回调函数
const mapOptions = useMapOptions(modalConfig);
const modalConfigRef = computed(() => {
  return mapOptions.handleModalConfig();
});

// 修改状态的逻辑
const systemStore = useSystemStore();
const pageName = contentConfig.pageName;
const handleChangeStatus = (row) => {
  // 注意element-plus会自动触发(别的页面数据混进来), 这里采用判断是否存在密码进行状态修改
  // 方法比较糙，不知道有没有更好的操作
  if (row.password && row.id) {
    systemStore.editPageDataAction(pageName, row.id, { enable: row.enable });
  }
};

// content的逻辑处理
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

// modal的逻辑处理
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal();
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
      <el-switch
        v-model="scope.row.enable"
        :width="55"
        size="large"
        inline-prompt
        active-text="启用"
        inactive-text="禁用"
        :active-value="1"
        :inactive-value="0"
        @change="handleChangeStatus(scope.row)"
      />
    </template>
  </pageContent>
  <!-- 3.新建和编辑 -->
  <page-modal ref="modalRef" :modal-config-ref="modalConfigRef" />
</template>

<style scoped lang="less">
:global(.el-switch__core) {
  background-color: var(--el-border-color);
}
</style>
