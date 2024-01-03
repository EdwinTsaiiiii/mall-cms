<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";
import useMapOptions from "@/hooks/useMapOptions";
import { computed } from "vue";

// 计算属性，将初始化option传入配置
const mapOptions = useMapOptions(modalConfig);
const modalConfigRef = computed(() => {
  return mapOptions.handleModalConfig();
});

// content的逻辑处理
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

// modal的逻辑处理
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal();
</script>

<template>
  <div class="department">
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
    </pageContent>
    <!-- 3.新建和编辑 -->
    <page-modal ref="modalRef" :modal-config-ref="modalConfigRef" />
  </div>
</template>

<style scoped lang="less"></style>
