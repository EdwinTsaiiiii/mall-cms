<script setup lang="ts">
import type { ITableItems } from "@/base-ui/table";
import useMainStore from "@/store/main/main";
import { computed, onMounted, ref } from "vue";

// 接收参数
const props = defineProps<{
  header: any;
  tableItems: ITableItems;
  checkedList: Array<any>;
  handle: any;
  pageName: string;
  permissionName: string;
  listData: any;
  listCount: number;
  page: any;
  childrenProps?: any;
  expandKeys: Array<any>;
}>();

// 加载
const loading = ref<boolean>(true);
onMounted(() => {
  loading.value = false;
});

// 语言
const mainStore = useMainStore();
const lan = computed(() => {
  return mainStore.language ? 1 : 0;
});

const normalColumn = ["selection", "index", "normal"];

const emit = defineEmits(["fetchListData"]);

// 分页的事件
const handleCurrentChange = () => {
  emit("fetchListData");
};
const handleSizeChange = () => {
  emit("fetchListData");
};

// 动态参数
let dynamic = ref(props.pageName === "menu" ? "field" : "type");
</script>

<template>
  <!-- 头部 -->
  <div class="header">
    <slot name="header">
      <div class="title">{{ header.title[lan] }}</div>
      <div class="handler">
        <slot name="headerHandler"></slot>
      </div>
    </slot>
  </div>
  <!-- 表格 -->
  <div class="table">
    <el-table
      :data="listData"
      :border="true"
      style="width: 100%"
      v-bind="childrenProps"
      row-key="id"
      :expand-row-keys="expandKeys"
      v-loading="loading"
    >
      <template v-for="item in tableItems || []" :key="item.prop">
        <template v-if="normalColumn.includes(item.field)">
          <el-table-column
            align="center"
            :[dynamic]="item.field"
            :prop="item.prop"
            v-if="checkedList.includes(item.label[0])"
            :label="item.label[lan]"
            :width="item.prop === 'index' ? 60 : ''"
            :min-width="item.minWidth"
          />
        </template>
        <template v-else>
          <el-table-column
            :type="item.field"
            :prop="item.prop"
            :label="item.label[lan]"
            v-if="checkedList.includes(item.label[0])"
            align="center"
            :min-width="item.minWidth"
          >
            <template #default="scope">
              <!-- scope.row某一行的数据 -->
              <slot :name="item.slotName" :row="scope.row"> </slot>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
  <!--底部-->
  <div class="footer">
    <el-pagination
      background
      v-model:currentPage="page.currentPage"
      v-model:page-size="page.pageSize"
      :page-sizes="[10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listCount"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 8px 0;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
