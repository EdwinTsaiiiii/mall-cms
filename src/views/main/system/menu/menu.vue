<script setup lang="ts">
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";

import usePageModal from "@/hooks/usePageModal";
import type { BuildPropType } from "element-plus/es/utils";

// modal的逻辑处理
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal();

// 匹配tag颜色
const mapTagColor = (
  typeValue: number
): BuildPropType<
  StringConstructor,
  "" | "success" | "warning" | "info" | "danger",
  unknown
> => {
  switch (typeValue) {
    case 1:
      return "success";
    case 2:
      return "warning";
    case 3:
      return "info";
  }
};

// 匹配tag文案
const mapTagText = (typeValue: number): string => {
  switch (typeValue) {
    case 1:
      return "菜单目录";
    case 2:
      return "菜单项";
    case 3:
      return "菜单权限";
  }
};
</script>

<template>
  <div class="menu">
    <pageContent
      :content-config="contentConfig"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    >
      <template #icon="scope">
        <el-icon>
          <component :is="(scope.row.icon + '').split('-icon-')[1]" />
        </el-icon>
      </template>
      <template #type="scope">
        <el-tag class="ml-2" :type="mapTagColor(scope.row.type)">
          {{ mapTagText(scope.row.type) }}
        </el-tag>
      </template>
    </pageContent>

    <page-modal ref="modalRef" :modal-config-ref="modalConfig" />
  </div>
</template>

<style scoped></style>
