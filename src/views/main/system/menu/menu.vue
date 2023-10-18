<script setup lang="ts">
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";

import usePageModal from "@/hooks/usePageModal";

// modal的逻辑处理
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal();
</script>

<template>
  <div class="menu">
    <pageContent
      :content-config="contentConfig"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    />
    <page-modal ref="modalRef" :modal-config-ref="modalConfig" />
  </div>
</template>

<style scoped></style>
