<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";

import type { ElTree } from "element-plus";
import { computed, ref, nextTick, onMounted } from "vue";
import { storeToRefs } from "pinia";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";
import useMapOptions from "@/hooks/useMapOptions";
import useMainStore from "@/store/main/main";
import { mapMenuToIds } from "@/utils/map-menu";

// 计算属性，将初始化option传入配置
const mapOptions = useMapOptions(modalConfig);
const modalConfigRef = computed(() => {
  return mapOptions.handleModalConfig();
});

// content的逻辑处理
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

// modal的逻辑处理
const { modalRef, handleNewDataClick, handleEditDataClick } =
  usePageModal(editCallback);

// 菜单的展示
const mainStore = useMainStore();
const { entireMenus } = storeToRefs(mainStore);
const otherInfo = ref({});
// 点击选项的事件
const handleMenuCheckChange = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
  otherInfo.value = { menuList };
};
// 树的ref
const treeRef = ref<InstanceType<typeof ElTree>>();
// 处理pageModal的Hook,接收Hook传出来的参数
function editCallback(data: any) {
  // 注意在进入回调函数的时候，ELTree还未来得及绑定
  // 所以需要采用nextTick,在ElTree DOM进行更新后，再执行该回调
  nextTick(() => {
    const menuList = mapMenuToIds(data.menuList);
    treeRef.value?.setCheckedKeys(menuList);
  });
}
</script>

<template>
  <div class="role">
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
    <page-modal
      ref="modalRef"
      :modal-config-ref="modalConfigRef"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <span class="title">权限</span>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ label: 'name', children: 'children' }"
          @check="handleMenuCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<style scoped lang="less">
.menu-tree {
  margin-left: 80px;
  margin-top: 20px;
  display: flex;
  .title {
    margin: 0 6px 0 60px;
  }
}
</style>
