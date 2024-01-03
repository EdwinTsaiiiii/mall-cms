<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";

// content的逻辑处理
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

// modal的逻辑处理
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal();
</script>

<template>
<<<<<<< HEAD
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
        {{ scope.row.enable === 1 ? "已上架" : "已下架" }}
      </el-tag>
    </template>
    <template #image="scope">
      <el-image
        style="width: 100px; height: 100px"
        :src="scope.row.imgUrl"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="[scope.row.imgUrl]"
        fit="cover"
        lazy
      />
    </template>
  </pageContent>
  <!-- 3.新建和编辑 -->
  <page-modal ref="modalRef" :modal-config-ref="modalConfig" />
=======
  <div class="goods">
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
          {{ scope.row.enable === 1 ? "已上架" : "已下架" }}
        </el-tag>
      </template>
      <template #image="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          lazy
        />
      </template>
    </pageContent>
    <!-- 3.新建和编辑 -->
    <page-modal ref="modalRef" :modal-config-ref="modalConfig" />
  </div>
>>>>>>> update2
</template>

<style scoped lang="less"></style>
