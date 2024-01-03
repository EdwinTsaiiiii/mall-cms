<script setup lang="ts">
import useMultipleTabStore from "@/store/main/modules/multipleTab";
import { toRaw, computed } from "vue";
import { useRouter } from "vue-router";

// 多标签页信息存储
const tabStore = useMultipleTabStore();
let editableTabs = computed(() => {
  return tabStore.getTabList;
});
const editableTabsValue = computed({
  get() {
    return tabStore.getActiveName;
  },
  set(newValue) {
    tabStore.editActiveName(newValue);
  }
});

const handleTabsRemove = (targetName) => {
  const tabs = toRaw(editableTabs.value);
  let activeName = toRaw(editableTabsValue.value);
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          tabStore.editActiveName(nextTab.name);
        }
      }
    });
  }
  tabStore.removeTab(targetName);
};

const router = useRouter();
const handleTabsClick = (tabsPane) => {
  tabStore.editActiveName(tabsPane.paneName);
};
</script>

<template>
  <div class="tab-box">
    <el-tabs
      type="card"
      class="demo-tabs"
      @tab-remove="handleTabsRemove"
      @tab-click="handleTabsClick"
      v-model="editableTabsValue"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.id"
        :label="item.name"
        :name="item.name"
        :closable="item.url != '/main/analysis/dashboard'"
        :url="item.url"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.demo-tabs > .el-tabs__content {
  padding: 30px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
:global(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border-bottom: none;
  padding: 0 20px 10px;
  line-height: 30px;
  height: 30px;
}
</style>
