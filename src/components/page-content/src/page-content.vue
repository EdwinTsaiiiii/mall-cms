<script setup lang="ts">
import { computed, reactive } from "vue";
import useSystemStore from "@/store/main/system/system";
import { storeToRefs } from "pinia";
import SelfTable, { ITable } from "@/base-ui/table";
import { utcFormat } from "@/utils/format";
import useMainStore from "@/store/main/main";

const emit = defineEmits(["newDataClick", "editDataClick"]);

const props = defineProps<{
  contentConfig: ITable;
}>();

// 分页的数据
const pageInfo = reactive({ currentPage: 1, pageSize: 10 });

// 语言
const mainStore = useMainStore();
const lan = computed(() => {
  return mainStore.language ? 1 : 0;
});

// 展示数据
const systemStore = useSystemStore();
const { list, totalCount } = storeToRefs(systemStore);

// 请求数据
const fetchUserListData = (queryInfo: any = {}) => {
  // 获取offset和size
  const size = pageInfo.pageSize;
  const offset = (pageInfo.currentPage - 1) * size;
  // 发送网络请求
  systemStore.getDataListAction(props.contentConfig.pageName, {
    size,
    offset,
    ...queryInfo
  });
};
fetchUserListData();

// 获取其他的动态插槽名称
const otherPropSlots: Array<any> = props.contentConfig.tableItems.filter(
  (item: any) => {
    if (item.slotName === "createAt") return false;
    if (item.slotName === "updateAt") return false;
    if (item.slotName === "handler") return false;
    if (item.slotName === "parentId") return false;
    return true;
  }
);

// 重置按钮
const handleResetClick = () => {
  pageInfo.currentPage = 1;
  pageInfo.pageSize = 10;
  fetchUserListData();
};

// 新建用户
const handleNewData = (data: any) => {
  emit("newDataClick", data);
};

// 删除用户
const handleDeleteUser = (id: number) => {
  systemStore.deletePageDataAction(props.contentConfig.pageName, id);
};
const cancelEvent = () => {
  ElMessage("已取消");
};

// 编辑用户
const handleEditClick = (data: any) => {
  emit("editDataClick", data);
};

// 将父部门的id映射到对应的名称上
const mapDepartmentId = (parentId: number) => {
  for (const item of mainStore.entireDepartments) {
    if (parentId == item.id) {
      return item.name;
    }
  }
  return "";
};

// 暴露函数
defineExpose({
  fetchUserListData,
  handleResetClick
});
</script>

<template>
  <div class="content">
    <SelfTable
      v-bind="contentConfig"
      :listData="list"
      :listCount="totalCount"
      v-model:page="pageInfo"
      @fetch-user-list-data="fetchUserListData"
    >
      <!--Header中的插槽-->
      <template #headerHandler>
        <el-button size="default" @click="handleNewData">
          {{ contentConfig.header.button[lan] }}
        </el-button>
      </template>
      <!-- 列中插槽 -->
      <template #parentId="scope">
        <span>{{ mapDepartmentId(scope.row.parentId) }}</span>
      </template>
      <template #createAt="scope">
        <strong>{{ utcFormat(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <span>{{ utcFormat(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <el-link
          type="primary"
          icon="EditPen"
          :underline="false"
          @click="handleEditClick(scope.row)"
        >
          {{ contentConfig.handle.edit[lan] }}
        </el-link>
        <el-popconfirm
          width="220"
          :confirm-button-text="contentConfig.handle.yes[lan]"
          :cancel-button-text="contentConfig.handle.no[lan]"
          icon-color="#626AEF"
          :title="contentConfig.handle.title[lan]"
          @confirm="handleDeleteUser(scope.row.id)"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-link type="danger" icon="Delete" :underline="false">
              {{ contentConfig.handle.delete[lan] }}
            </el-link>
          </template>
        </el-popconfirm>
      </template>
      <!-- 其他各页面特有的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </SelfTable>
  </div>
</template>

<style scoped lang="less">
:global(.el-table__row),
:global(.el-table__cell) {
  transition: var(--day-night-transition) !important;
}
:global(.el-table__row):hover {
  background-color: var(--day-main-color-hover);
}
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: var(--day-bg-color1);
  border-radius: 5px;
  transition: var(--day-night-transition);
}
.el-link {
  padding: 0 20px;
}
</style>
